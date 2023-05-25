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
import {
  lastVisibleSelector,
  recentCollectionSelector,
} from "@/store/collection";
import { useState } from "react";

export const getRecentCollectionInit = async () => {
  const q = query(
    collection(store, "collection"),
    where("isVisible", "==", true),
    orderBy("createdTime", "desc"),
    limit(2)
  );

  console.log("FireStore Access");
  const querySnapshot = await getDocs(q);

  // let result: any[] = [];
  // querySnapshot.forEach((doc) => {
  //   result.push({ ...doc.data(), id: doc.id });
  // });

  return querySnapshot;
};

const getRecentCollection = async (pageParam: any) => {
  const q = query(
    collection(store, "collection"),
    where("isVisible", "==", true),
    orderBy("createdTime", "desc"),
    startAfter(pageParam),
    limit(2)
  );

  console.log("FireStore Access");
  const querySnapshot = await getDocs(q);

  // let result: any[] = [];
  // querySnapshot.forEach((doc) => {
  //   result.push({ ...doc.data(), id: doc.id });
  // });

  return querySnapshot;
};

const useRecentCollection = () => {
  const [recentCollection, setRecentCollection] = useRecoilState(
    recentCollectionSelector
  );
  const [lastVisible, setLastVisible] = useRecoilState(lastVisibleSelector);
  const [result, setResult] = useState<any[]>();

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["recentCollection"],
    async ({ pageParam }) =>
      pageParam ? getRecentCollection(pageParam) : getRecentCollectionInit(),
    {
      getNextPageParam: (querySnapshot) => {
        const lastPageParam = querySnapshot.docs[querySnapshot.docs.length - 1];

        let result: any[] = [];
        querySnapshot.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });

        // setRecentCollection((prev) => [...prev, ...result]);

        // if (querySnapshot.size < 6) {
        //   return undefined;
        // }
        return lastPageParam;
      },
      onSuccess(data) {
        console.log(data);
        let result: any[] = [];
        data.pages.slice(-1).forEach((doc) => {
          doc.forEach((e) => {
            result.push({ ...e.data(), id: e.id });
          });
        });
        setRecentCollection((prev) => prev.concat(result));
      },
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
  // console.log(data?.pages.map((e) => e.data()));
  return {
    recentCollection,
    result,
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
  };
};

export default useRecentCollection;
