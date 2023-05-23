import { useQuery } from "@tanstack/react-query";
import { store } from "@/firebase";
import {
  collection,
  documentId,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";

const useCollection = (cid: string) => {
  const getCollectionByCid = async (cid: string) => {
    const q = query(
      collection(store, "collection"),
      where(documentId(), "==", cid),
      limit(1)
    );

    console.log("FireStore Access");
    const querySnapshot = await getDocs(q);

    let result: any[] = [];
    querySnapshot.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });

    return result[0];
  };

  const { data, isLoading } = useQuery(
    ["collection", cid],
    async () => await getCollectionByCid(cid),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  return { data, isLoading };
};

export default useCollection;