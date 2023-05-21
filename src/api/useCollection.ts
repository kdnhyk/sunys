import { useQuery } from "react-query";
import { store } from "../firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { currentColletionSelector } from "../store/collection";

const useCollection = (cid: string) => {
  const [currentCollection, setCurrentCollection] = useRecoilState(
    currentColletionSelector
  );

  const getCollectionByCid = async (cid: string) => {
    const q = query(
      collection(store, "collection"),
      where("documentId()", "==", cid),
      limit(1)
    );

    console.log("FireStore Access");
    const querySnapshot = await getDocs(q);

    let result: any[] = [];
    querySnapshot.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });

    return result[0];
  };

  const { data } = useQuery(
    ["collection", cid],
    async () => getCollectionByCid(cid),
    {
      staleTime: 0,
      cacheTime: 0,
      refetchOnWindowFocus: false,
    }
  );

  return { currentCollection, data };
};

export default useCollection;
