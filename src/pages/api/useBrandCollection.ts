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
import { currentColletionSelector } from "@/store/collection";

const useBrandCollection = (brandName: string) => {
  const [currentCollection, setCurrentCollection] = useRecoilState(
    currentColletionSelector
  );

  const getBrandCollectionInit = async () => {
    const q = query(
      collection(store, "collection"),
      where("brandName", "==", brandName),
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

    setCurrentCollection((prev) => result);

    return querySnapshot;
  };

  const getBrandCollection = async (pageParam: any) => {
    const q = query(
      collection(store, "collection"),
      where("brandName", "==", brandName),
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

    setCurrentCollection((prev) => [...prev, ...result]);

    return querySnapshot;
  };

  const { fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["brandCollection"],
    async ({ pageParam }) =>
      pageParam ? getBrandCollection(pageParam) : getBrandCollectionInit(),
    {
      getNextPageParam: (querySnapshot) => {
        const lastPageParam = querySnapshot.docs[querySnapshot.docs.length - 1];
        // if (querySnapshot.size < 6) {
        //   return undefined;
        // }
        return lastPageParam;
      },
      staleTime: 0,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  return { currentCollection, fetchNextPage, hasNextPage };
};

export default useBrandCollection;
