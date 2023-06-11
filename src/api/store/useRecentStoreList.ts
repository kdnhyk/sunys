import { useQuery } from "@tanstack/react-query";
import { store } from "@/firebase";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { IsStore } from "@/types/store";

export const getRecentStoreList = async () => {
  const q = query(collection(store, "store"), limit(10));

  console.log("FireStore Access");
  const querySnapshot = await getDocs(q);

  let result: any[] = [];
  querySnapshot.forEach((doc) => {
    result.push({ ...doc.data(), id: doc.id });
  });

  return result;
};

const useRecentStoreList = () => {
  const { data } = useQuery<IsStore[]>(
    ["recentStoreList"],
    async () => await getRecentStoreList(),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  return { data };
};

export default useRecentStoreList;
