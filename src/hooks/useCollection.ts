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
  const [myList, setMyList] = useRecoilState(upcommingCollectionListSelector);
  const [upcommingList, setUpcommingList] = useRecoilState(
    upcommingCollectionListSelector
  );
  const [recentList, setRecentList] = useRecoilState(
    recentCollectionListSelector
  );

  const {
    documents,
    getRealTimeCollectionById,
    getCollectionByBrandNameList,
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

  // Brand
  const getCurrentCollectionByBrandName = async (brandName: string) => {
    setCurrentCollection(await getCollectionByBrandName(brandName));
  };

  const getCollectionListByBrandNameAdmin = async (brandName: string) => {
    setCurrentCollection(await getCollectionByBrandNameAdmin(brandName));
  };

  const getMyCollectionList = async (brandList: string[]) => {
    setMyList(await getCollectionByBrandNameList(brandList));
  };

  const getUpcommingCollectionList = async () => {
    setUpcommingList(await getCollectionByUpcomming());
  };

  const getRecentCollectionList = async () => {
    setRecentList(await getCollectionByRecent());
  };

  const handleCollectionById = async (id: string) => {
    return await getCollectionById(id);
  };
  //

  return {
    currentCollection,
    myList,
    upcommingList,
    recentList,

    handleRealTimeCollectionById,
    getCurrentCollectionByBrandName,
    getCollectionListByBrandNameAdmin,

    getMyCollectionList,
    getUpcommingCollectionList,
    getRecentCollectionList,
    handleCollectionById,
  };
};
