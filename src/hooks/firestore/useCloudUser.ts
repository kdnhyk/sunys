import { useMutation, useQuery } from "@tanstack/react-query";
import { store, timestamp } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const useCloudUser = () => {
  const collectionRef = collection(store, "user");

  const getCloudUser = async (uid: string) => {
    const q = query(collectionRef, where("uid", "==", uid), limit(1));

    console.log("FireStore Access");
    const querySnapshot = await getDocs(q);

    let result: any[] = [];
    querySnapshot.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });

    return result[0];
  };

  const addCloudUser = async (uid: string, username: string) => {
    const createdTime = timestamp.fromDate(new Date());
    setDoc(doc(collectionRef, uid), {
      uid,
      username,
      scrapBrandList: [],
      cart: [],
      createdTime,
    });
  };

  const deleteCloudUser = async (uid: string) => {
    await deleteDoc(doc(collectionRef, uid));
  };

  // const { data, isLoading } = useQuery(
  //   ["user"],
  //   async () => await getCloudUser(uid),
  //   {
  //     enabled: !!uid,
  //     staleTime: Infinity,
  //     cacheTime: Infinity,
  //     refetchOnWindowFocus: false,
  //   }
  // );

  return { getCloudUser, addCloudUser, deleteCloudUser };
};

export default useCloudUser;
