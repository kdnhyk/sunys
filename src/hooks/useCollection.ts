import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { useCollectionStore } from "./firestore/useCollectionStore";
import {
  currentColletionSelector,
  recentCollectionListSelector,
  upcommingCollectionListSelector,
} from "../store/collection";

export const useCollection = () => {
  const [currentCollection, setCurrentCollection] = useRecoilState(
    currentColletionSelector
  );
  const [upcommingList, setUpcommingList] = useRecoilState(
    upcommingCollectionListSelector
  );
  const [recentList, setRecentList] = useRecoilState(
    recentCollectionListSelector
  );
  console.log(recentList);
  const {
    documents,
    getRealTimeCollectionById,
    getCollectionByBrandName,
    getCollectionByBrandNameAdmin,
    getCollectionByUpcomming,
    getCollectionByRecent,
    getCollectionById,
    deleteCollection,
  } = useCollectionStore();

  useEffect(() => {
    if (!documents) return;
    setCurrentCollection(documents);
  }, [documents]);

  const handleRealTimeCollectionById = async (cid: string) => {
    getRealTimeCollectionById(cid);
  };

  //
  const getCollectionListByBrandName = async (brandName: string) => {
    setCurrentCollection(await getCollectionByBrandName(brandName));
  };

  const getCollectionListByBrandNameAdmin = async (brandName: string) => {
    setCurrentCollection(await getCollectionByBrandNameAdmin(brandName));
  };

  const getCollectionListByUpcomming = async () => {
    setUpcommingList(await getCollectionByUpcomming());
  };

  const getCollectionListByRecent = async () => {
    setRecentList(await getCollectionByRecent());
  };

  const handleCollectionById = async (id: string) => {
    return await getCollectionById(id);
  };
  //

  return {
    currentCollection,
    upcommingList,
    recentList,

    handleRealTimeCollectionById,
    getCollectionListByBrandName,
    getCollectionListByBrandNameAdmin,
    getCollectionListByUpcomming,
    getCollectionListByRecent,
    handleCollectionById,
  };
};
