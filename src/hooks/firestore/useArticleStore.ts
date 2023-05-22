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
import { store, timestamp } from "../../firebase";
import { useState } from "react";
import { IsArticle } from "../../types/article";

export const useArticleStore = () => {
  const [documents, setDocuments] = useState<IsArticle[]>();
  const collectionRef = collection(store, "article");

  const getArticleByCid = async (cid: string) => {
    const q = query(
      collection(store, "article"),
      where("collectionId", "==", cid),
      limit(20)
    );
    console.log("FireStore Access");

    const data = await getDocs(q);
    let result: any[] = [];
    data.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });

    return result;
  };

  const getArticleByCidRealtime = async (cid: string) => {
    const q = query(
      collection(store, "article"),
      where("collectionId", "==", cid)
    );

    console.log("FireStore Access");
    const data = await getDocs(q);

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

  const addArticle = async (collection: IsArticle) => {
    const createdTime = timestamp.fromDate(new Date());

    const doc = await addDoc(collectionRef, {
      ...collection,
      createdTime,
    });
    return doc.id;
  };

  const updateArticle = async (id: string, collection: IsArticle) => {
    await setDoc(
      doc(collectionRef, id),
      {
        ...collection,
      },
      { merge: true }
    );
  };

  const deleteArticle = async (id: string) => {
    console.log("Del: " + id);
    await deleteDoc(doc(collectionRef, id));
  };

  return {
    documents,
    getArticleByCid,
    getArticleByCidRealtime,
    addArticle,
    updateArticle,
    deleteArticle,
  };
};
