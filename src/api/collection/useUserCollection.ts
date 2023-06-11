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
import { userColletionSelector } from "@/store/collection";

const useUserCollection = (brandList: string[]) => {
  const [userCollection, setuserCollection] = useRecoilState(
    userColletionSelector
  );

  const getuserCollectionInit = async () => {
    const q = query(
      collection(store, "collection"),
      where("isVisible", "==", true),
      where("brandName", "in", brandList),
      orderBy("createdTime", "desc"),
      limit(6)
    );

    console.log("FireStore Access");
    const querySnapshot = await getDocs(q);

    return querySnapshot;
  };

  const getuserCollection = async (pageParam: any) => {
    const q = query(
      collection(store, "collection"),
      where("isVisible", "==", true),
      where("brandName", "in", brandList),
      orderBy("createdTime", "desc"),
      startAfter(pageParam),
      limit(6)
    );

    console.log("FireStore Access");
    const querySnapshot = await getDocs(q);

    return querySnapshot;
  };

  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["userCollection"],
      async ({ pageParam }) =>
        pageParam
          ? await getuserCollection(pageParam)
          : await getuserCollectionInit(),
      {
        getNextPageParam: (querySnapshot) => {
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
          setuserCollection((prev) => prev.concat(result));
        },
        // enabled: brandList.length !== 0,
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
      }
    );

  return {
    userCollection,
    data,
    isLoading,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  };
};

export default useUserCollection;
