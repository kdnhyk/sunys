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
import { IsStore } from "@/types/store";

export const getCollectionBySid = async (sid: string) => {
  const q = query(
    collection(store, "store"),
    where(documentId(), "==", sid),
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

const useStoreBySid = (sid: string) => {
  const { data } = useQuery<IsStore>(
    ["store", sid],
    async () => await getCollectionBySid(sid),
    {
      enabled: !!sid,
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  return { data };
};

export default useStoreBySid;
