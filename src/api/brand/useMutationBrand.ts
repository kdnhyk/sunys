import { useMutation, useQueryClient } from "@tanstack/react-query";
import { store, timestamp } from "@/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { IsBrand } from "@/types/brand";

const useMutationBrand = (brandName: string) => {
  const queryClient = useQueryClient();
  const brandRef = collection(store, "brand");

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

  const deleteBrand = useMutation((id: string) => deleteDocs(id), {
    onMutate() {},
    onSuccess() {
      queryClient.invalidateQueries(["brand", brandName]);
    },
  });

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
    const createdTime = new Timestamp(
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

  const deleteDocs = async (id: string) => {
    console.log("Del: " + id);
    await deleteDoc(doc(brandRef, id));
  };

  return { addBrand, updateBrand, deleteBrand };
};

export default useMutationBrand;
