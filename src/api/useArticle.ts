import { useQuery } from "@tanstack/react-query";
import { store } from "@/firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

const getArticleByCid = async (cid: string) => {
  const q = query(
    collection(store, "article"),
    where("collectionId", "==", cid),
    limit(20) // 20개 이상 불가능..
  );

  console.log("FireStore Access");
  const querySnapshot = await getDocs(q);

  let result: any[] = [];
  querySnapshot.forEach((doc) => {
    result.push({ ...doc.data(), id: doc.id });
  });

  return result;
};

const useArticle = (cid: string) => {
  const { data } = useQuery(
    ["collectionArticle", cid],
    async () => await getArticleByCid(cid),
    {
      enabled: !!cid,
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  return { data };
};

export default useArticle;
