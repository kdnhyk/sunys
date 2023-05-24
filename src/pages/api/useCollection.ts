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

export const getCollectionByCid = async (cid: string) => {
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

const useCollection = (cid: string) => {
  const { data, isLoading } = useQuery(
    ["collection", cid],
    async () => await getCollectionByCid(cid),
    {
      enabled: !!cid,
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  return { data, isLoading };
};

export default useCollection;
