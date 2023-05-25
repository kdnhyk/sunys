import { useMutation, useQueryClient } from "@tanstack/react-query";
import { store, timestamp } from "@/firebase";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { IsBrand } from "@/types/brand";

const useMutationBrand = (brandName: string) => {
  const queryClient = useQueryClient();
  const brandRef = collection(store, "brand");

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

  const updateDocs = async (id: string, brand: IsBrand) => {
    await setDoc(
      doc(brandRef, id),
      {
        ...brand,
      },
      { merge: true }
    );
  };

  const deleteDocs = async (id: string) => {
    console.log("Del: " + id);
    await deleteDoc(doc(brandRef, id));
  };

  return { updateBrand, deleteBrand };
};

export default useMutationBrand;
