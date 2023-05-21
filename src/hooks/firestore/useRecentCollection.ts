import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { store } from "../../firebase";
import { useRecoilState } from "recoil";
import { recentCollectionListSelector } from "../../store/collection";

export const useRecentCollection = () => {
  const [recentCollection, setRecentCollection] = useRecoilState(
    recentCollectionListSelector
  );
  const [lastVisible, setLastVisible] = useRecoilState(
    recentCollectionListSelector
  );

  const getRecentCollection = async () => {
    const result = [...recentCollection, ...(await getCollectionByRecent())];
    setRecentCollection(result);
  };

  const getRecentCollectionOnLoad = async () => {
    const result = [
      ...recentCollection,
      ...(await getCollectionByRecentOnLoad()),
    ];
    setRecentCollection(result);
  };

  const getCollectionByRecent = async () => {
    const q = query(
      collection(store, "collection"),
      where("isVisible", "==", true),
      orderBy("createdTime", "desc"),
      limit(1)
    );

    console.log("FireStore Access");
    const data = await getDocs(q);

    let result: any[] = [];
    data.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });

    const last = data.docs[data.docs.length - 1];
    // setLastVisible(last);

    return result;
  };

  const getCollectionByRecentOnLoad = async () => {
    console.log(lastVisible);
    if (!lastVisible) return [];

    const q = query(
      collection(store, "collection"),
      where("isVisible", "==", true),
      orderBy("createdTime", "desc"),
      startAfter(lastVisible),
      limit(1)
    );

    console.log("FireStore Access");
    const data = await getDocs(q);

    let result: any[] = [];
    data.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });

    if (data.empty) {
      // setLastVisible(null);
    } else {
      const last = data.docs[data.docs.length - 1];
      // setLastVisible(last);
    }

    return result;
  };

  return {
    recentCollection,
    lastVisible,
    getRecentCollection,
    getRecentCollectionOnLoad,
  };
};
