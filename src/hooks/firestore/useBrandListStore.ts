import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
} from "firebase/firestore";
import { store } from "../../firebase";
import { useState } from "react";

export const useBrandListStore = () => {
  const [documents, setDocuments] = useState<string[]>();
  const collectionRef = collection(store, "brandList");

  const getBrandListRealtime = async () => {
    const q = query(collection(store, "brandList"), limit(1));
    console.log("FireStore Access");

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        let result: any[] = [];
        querySnapshot.forEach((doc) => {
          result.push({ ...doc.data() });
        });

        setDocuments(result[0].brandList);
      },
      (error) => {
        console.log(error.message);
      }
    );
  };

  const addBrandToList = async (oldBrandList: string[], newBrand: string) => {
    const newBrandList = [...oldBrandList, newBrand];

    await setDoc(
      doc(collectionRef, "brandList"),
      {
        brandList: newBrandList,
      },
      { merge: true }
    );
  };

  // const deleteBrandToList = async (id: string) => {
  //   console.log("Del: " + id);
  //   await deleteDoc(doc(collectionRef, id));
  // };

  return {
    documents,
    getBrandListRealtime,
    addBrandToList,
  };
};
