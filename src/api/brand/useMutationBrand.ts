import { useMutation, useQueryClient } from "@tanstack/react-query";
import { store, timestamp } from "@/firebase";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { IsBrand } from "@/types/brand";

const brandRef = collection(store, "brand");

const addDoces = async (id: string, brand: IsBrand) => {
  const createdTime = timestamp.fromDate(new Date());

  await setDoc(
    doc(brandRef, id),
    {
      ...brand,
      createdTime,
    },
    { merge: true }
  );
};

const updateDocs = async (id: string, brand: IsBrand) => {
  if (!brand.createdTime) return;

  const createdTime = new timestamp(
    brand.createdTime.seconds,
    brand.createdTime?.nanoseconds
  );
  await setDoc(
    doc(brandRef, id),
    {
      ...brand,
      createdTime,
    },
    { merge: true }
  );
};

const updateDocsScrapNum = async (id: string, scrapNum: number) => {
  await setDoc(
    doc(brandRef, id),
    {
      scrapNum,
    },
    { merge: true }
  );
};

const deleteDocs = async (id: string) => {
  console.log("Del: " + id);
  await deleteDoc(doc(brandRef, id));
};

const useMutationBrand = (brandName: string) => {
  const queryClient = useQueryClient();

  const addBrand = useMutation(
    ({ id, brand }: { id: string; brand: IsBrand }) => addDoces(id, brand),
    {
      onMutate() {},
      onSuccess() {
        queryClient.invalidateQueries(["brand", brandName]);
      },
    }
  );

  const updateBrand = useMutation(
    ({ id, brand }: { id: string; brand: IsBrand }) => updateDocs(id, brand),
    {
      onMutate() {},
      onSuccess() {
        queryClient.invalidateQueries(["brand", brandName]);
      },
    }
  );

  const updateBrandScrapNum = useMutation(
    ({ id, newScrapNum }: { id: string; newScrapNum: number }) =>
      updateDocsScrapNum(id, newScrapNum),
    {
      onMutate() {},
      onSuccess() {
        queryClient.invalidateQueries(["brand", brandName]);
      },
    }
  );

  const deleteBrand = useMutation((id: string) => deleteDocs(id), {
    onMutate() {},
    onSuccess() {
      queryClient.invalidateQueries(["brand", brandName]);
    },
  });

  return { addBrand, updateBrand, deleteBrand, updateBrandScrapNum };
};

export default useMutationBrand;
