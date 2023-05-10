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
import { store, timestamp } from "../../firebase";

export const useCloudUser = () => {
  const collectionRef = collection(store, "user");

  const getCloudUser = async (uid: string) => {
    const q = query(collectionRef, where("uid", "==", uid), limit(1));

    let result: any[] = [];
    const user = await getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        result.push({ ...doc.data() });
      });
    });

    return result[0];
  };

  const setCloudUser = async (uid: string, username: string) => {
    const createdTime = timestamp.fromDate(new Date());
    const cloudUser = await getCloudUser(uid);
    if (!cloudUser) {
      setDoc(doc(collectionRef, uid), {
        uid,
        username,
        scrapBrandList: [],
        cart: [],
        createdTime,
      });
    }
  };

  const delUser = async (uid: string) => {
    await deleteDoc(doc(collectionRef, uid));
  };

  const updateScrapBrand = (
    uid: string,
    oldScrapBrandList: string[],
    brandId: string
  ) => {
    const result = oldScrapBrandList.includes(brandId)
      ? oldScrapBrandList.filter((e) => e !== brandId)
      : oldScrapBrandList.concat(brandId);

    setDoc(
      doc(collectionRef, uid),
      {
        scrapBrandList: result,
      },
      {
        merge: true,
      }
    );
    return result;
  };

  return { getCloudUser, setCloudUser, delUser, updateScrapBrand };
};
