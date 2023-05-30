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

export const getRecentCollectionInit = async () => {
  const q = query(
    collection(store, "collection"),
    where("isVisible", "==", true),
    orderBy("createdTime", "desc"),
    limit(6)
  );

  console.log("SSR");
  const querySnapshot = await getDocs(q);

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

  return querySnapshot;
};

const useRecentCollection = () => {
  const [recentCollection, setRecentCollection] = useRecoilState(
    recentCollectionSelector
  );

  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["recentCollection"],
      async ({ pageParam }) =>
        pageParam
          ? await getRecentCollection(pageParam)
          : await getRecentCollectionInit(),
      {
        getNextPageParam: (querySnapshot) => {
          console.log(querySnapshot);
          if (!querySnapshot.docs) {
            return null;
          }
          const lastPageParam =
            querySnapshot.docs[querySnapshot.docs.length - 1];

          let result: any[] = [];
          querySnapshot.forEach((doc) => {
            result.push({ ...doc.data(), id: doc.id });
          });

          return lastPageParam;
        },
        onSuccess(data) {
          let result: any[] = [];
          data.pages.slice(-1).forEach((doc) => {
            doc.forEach((e) => {
              result.push({ ...e.data(), id: e.id });
            });
          });
          console.log("result");
          setRecentCollection((prev) => prev.concat(result));
        },
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
      }
    );

  return {
    recentCollection,
    data,
    isLoading,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  };
};

export default useRecentCollection;
