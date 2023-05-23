import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
} from "firebase/firestore";
import { store, timestamp } from "../../firebase";
import { useState } from "react";
import { IsBrand } from "../../types/brand";

export const useBrandStore = () => {
  const [documents, setDocuments] = useState<IsBrand[]>();
  const collectionRef = collection(store, "brand");

  const getNewBrandList = async () => {
    const q = query(
      collection(store, "brand"),
      orderBy("createdTime", "desc"),
      limit(10)
    );
    console.log("FireStore Access");

    const data = await getDocs(q);
    let result: any[] = [];
    data.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });

    // 나중에 페이지네이션 구현
    // const last = data.docs[data.docs.length - 1];
    // setLastVisible(last);

    // const next = query(
    //   collectionRef,
    //   startAfter(lastVisible),
    //   where("isVisible", "==", true),
    //   orderBy("createdTime", "desc"),
    //   limit(10)
    // );

    // const nextData = await getDocs(next);
    // const newData = data.docs.map((doc) => ({ ...doc.data() }));

    return result;
  };

  //
  const getSaleBrandList = async () => {
    const q = query(
      collection(store, "brand"),
      where("saleEndDate", "!=", ""),
      // orderBy("createdTime", "desc"),
      limit(10)
    );

    console.log("FireStore Access");
    const data = await getDocs(q);

    let result: any[] = [];
    data.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });
    return result;
  };

  const getBrandByBrandNameRealTime = (brandName: string) => {
    const q = query(
      collection(store, "brand"),
      where("brandName", "==", brandName),
      limit(1)
    );
    console.log("FireStore Access");
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        let result: any[] = [];
        querySnapshot.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(result);
      },
      (error) => {
        console.log(error.message);
      }
    );
  };

  const getBrandByBrandName = async (brandName: string) => {
    const q = query(
      collection(store, "brand"),
      where("brandName", "==", brandName),
      limit(1)
    );

    console.log("FireStore Access");
    const data = await getDocs(q);

    let result: any[] = [];
    await data.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });
    return result[0];
  };

  const addBrand = async (id: string, brand: IsBrand) => {
    const createdTime = timestamp.fromDate(new Date());

    await setDoc(
      doc(collectionRef, id),
      {
        ...brand,
        createdTime,
      },
      { merge: true }
    );
  };

  const updateBrand = async (id: string, brand: IsBrand) => {
    await setDoc(
      doc(collectionRef, id),
      {
        ...brand,
      },
      { merge: true }
    );
  };

  const deleteDocument = async (id: string) => {
    console.log("Del: " + id);
    await deleteDoc(doc(collectionRef, id));
  };

  return {
    documents,
    getNewBrandList,
    getBrandByBrandNameRealTime,
    getBrandByBrandName,
    getSaleBrandList,
    addBrand,
    updateBrand,
    deleteDocument,
  };
};
