import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
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
import { IsCollection } from "../../types/collection";

export const useCollectionStore = () => {
  const [documents, setDocuments] = useState<IsCollection[]>();
  const collectionRef = collection(store, "collection");

  const getRecentCollectionList = async () => {
    const q = query(
      collection(store, "collection"),
      where("isVisible", "==", true),
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

  const getRealTimeCollectionByBrandId = (brandId: string) => {
    const q = query(
      collection(store, "collection"),
      where("brandId", "==", brandId),
      orderBy("createdTime", "desc"),
      limit(10)
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

  const getRealTimeCollectionById = async (id: string) => {
    const q = query(
      collection(store, "collection"),
      where(documentId(), "==", id),
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

  const getCollectionByBrandName = async (brandName: string) => {
    const q = query(
      collection(store, "collection"),
      where("isVisible", "==", true),
      where("brandName", "==", brandName),
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

  const getCollectionByBrandNameAdmin = async (brandName: string) => {
    const q = query(
      collection(store, "collection"),
      where("brandName", "==", brandName),
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

  const getCollectionByUpcomming = async () => {
    const q = query(
      collection(store, "collection"),
      where("isVisible", "==", true),
      orderBy("releaseDate", "desc"),
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

  const getCollectionByRecent = async () => {
    const q = query(
      collection(store, "collection"),
      where("isVisible", "==", true),
      orderBy("createdTime", "desc"),
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

  const getCollectionById = async (id: string) => {
    const q = query(
      collection(store, "collection"),
      where(documentId(), "==", id)
    );

    console.log("FireStore Access");
    const data = await getDocs(q);

    let result: any[] = [];
    data.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });
    return result;
  };

  const addCollection = async (collection: IsCollection) => {
    const createdTime = timestamp.fromDate(new Date());

    await addDoc(collectionRef, {
      ...collection,
      createdTime,
      isVisible: false,
    });
    return;
  };

  const updateCollection = async (id: string, collection: IsCollection) => {
    await setDoc(
      doc(collectionRef, id),
      {
        ...collection,
      },
      { merge: true }
    );
  };

  const deleteDocument = async (id: string) => {
    console.log("Del: " + id);
    await deleteDoc(doc(collectionRef, id));
  };

  const handleSoldout = async (id: string, nextIsSoldout: boolean) => {
    await setDoc(
      doc(collectionRef, id),
      {
        isSoldout: nextIsSoldout,
      },
      { merge: true }
    );
  };

  return {
    documents,
    getRecentCollectionList,
    getRealTimeCollectionByBrandId,
    getRealTimeCollectionById,
    getCollectionByBrandName,
    getCollectionByBrandNameAdmin,
    getCollectionByUpcomming,
    getCollectionByRecent,
    getCollectionById,
    addCollection,
    updateCollection,
    deleteDocument,
  };
};
