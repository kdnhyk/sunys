import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { store, timestamp } from "@/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
} from "firebase/firestore";
import { IsBrandName } from "@/types/brand";

export const getBrandList = async () => {
  const q = query(collection(store, "brandList"), limit(1));

  console.log("FireStore Access");
  const querySnapshot = await getDocs(q);

  let result: any[] = [];
  querySnapshot.forEach((doc) => {
    result.push({ ...doc.data(), id: doc.id });
  });

  return result[0].brandList;
};

const useBrandList = () => {
  const queryClient = useQueryClient();
  const brandRef = collection(store, "brand");

  const { data, isLoading } = useQuery(
    ["brandlist"],
    async () => await getBrandList(),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  const addBrandList = useMutation(
    ({
      oldBrandList,
      newBrand,
    }: {
      oldBrandList: IsBrandName[];
      newBrand: IsBrandName;
    }) => addDocs(oldBrandList, newBrand),
    {
      onMutate() {},
      onSuccess() {
        queryClient.invalidateQueries(["brandlist"]);
      },
    }
  );

  const addDocs = async (
    oldBrandList: IsBrandName[],
    newBrand: IsBrandName
  ) => {
    if (oldBrandList.includes(newBrand)) return;

    const newBrandList = [...oldBrandList, newBrand];

    await setDoc(
      doc(brandRef, "brandList"),
      {
        brandList: newBrandList,
      },
      { merge: true }
    );
  };

  return { data, isLoading, addBrandList };
};

export default useBrandList;
