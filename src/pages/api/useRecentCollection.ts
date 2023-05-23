import { useInfiniteQuery } from "@tanstack/react-query";
import { store } from "@/firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useRecoilState } from "recoil";
import { recentCollectionSelector } from "@/store/collection";

const useRecentCollection = () => {
  const [recentCollection, setRecentCollection] = useRecoilState(
    recentCollectionSelector
  );

  const getRecentCollectionInit = async () => {
    const q = query(
      collection(store, "collection"),
      where("isVisible", "==", true),
      orderBy("createdTime", "desc"),
      limit(6)
    );

    console.log("FireStore Access");
    const querySnapshot = await getDocs(q);

    let result: any[] = [];
    querySnapshot.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });

    setRecentCollection((prev) => [...prev, ...result]);

    return querySnapshot;
  };

  const getRecentCollection = async (pageParam: any) => {
    const q = query(
      collection(store, "collection"),
      where("isVisible", "==", true),
      orderBy("createdTime", "desc"),
      startAfter(pageParam),
      limit(6)
    );

    console.log("FireStore Access");
    const querySnapshot = await getDocs(q);

    let result: any[] = [];
    querySnapshot.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });

    setRecentCollection((prev) => [...prev, ...result]);

    return querySnapshot;
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["recentCollection"],
    async ({ pageParam }) =>
      pageParam ? getRecentCollection(pageParam) : getRecentCollectionInit(),
    {
      getNextPageParam: (querySnapshot) => {
        const lastPageParam = querySnapshot.docs[querySnapshot.docs.length - 1];
        // if (querySnapshot.size < 6) {
        //   return undefined;
        // }
        return lastPageParam;
      },
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
  // console.log(data?.pages.map((e) => e.data()));
  return {
    recentCollection,
    fetchNextPage,
    hasNextPage,
  };
};

export default useRecentCollection;
