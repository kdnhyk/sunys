import {
  collection,
  doc,
  limit,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { store } from "../../firebase";
import { useState } from "react";
import { IsBrandName } from "../../types/brand";

export const useBrandListStore = () => {
  const [documents, setDocuments] = useState<IsBrandName[]>();
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

  const addBrandToList = async (
    oldBrandList: IsBrandName[],
    newBrand: IsBrandName
  ) => {
    const newBrandList = [...oldBrandList, newBrand];

    await setDoc(
      doc(collectionRef, "brandList"),
      {
        brandList: newBrandList,
      },
      { merge: true }
    );
  };

  return {
    documents,
    getBrandListRealtime,
    addBrandToList,
  };
};
