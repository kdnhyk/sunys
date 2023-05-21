import { useMutation } from "react-query";
import { store, timestamp } from "../firebase";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { IsBrand } from "../types/brand";

const useMutationBrand = () => {
  const brandRef = collection(store, "brand");

  const addBrand = useMutation((brand: IsBrand) => addDocs(brand), {
    onMutate() {},
    onSuccess() {},
    onError() {},
  });

  const updateBrand = useMutation(
    ({ id, brand }: { id: string; brand: IsBrand }) => updateDocs(id, brand),
    {
      onMutate() {},
    }
  );

  const deleteBrand = useMutation((id: string) => deleteDocs(id), {
    onMutate() {},
  });

  const addDocs = async (brand: IsBrand) => {
    const createdTime = timestamp.fromDate(new Date());

    await addDoc(brandRef, {
      ...brand,
      createdTime,
    });
    return;
  };

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

  return { addBrand, updateBrand, deleteBrand };
};

export default useMutationBrand;
