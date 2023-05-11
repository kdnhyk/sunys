import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { useCollectionStore } from "./firestore/useCollectionStore";
import { upcommingCollectionListSelector } from "../store/collection";

export const useCollection = () => {
  const [upcommingList, setUpcommingList] = useRecoilState(
    upcommingCollectionListSelector
  );
  const [recentList, setRecentList] = useRecoilState(
    upcommingCollectionListSelector
  );

  const {
    documents,
    getRecentCollectionList,
    getRealTimeCollectionById,
    getCollectionByBrandName,
    getCollectionByBrandNameAdmin,
    getCollectionByUpcomming,
    getCollectionByRecent,
    getCollectionById,
    deleteDocument,
  } = useCollectionStore();

  useEffect(() => {
    if (!documents) return;
    setRecentList(documents);
  }, [documents]);

  const handleRecentCollectionList = async () => {
    setUpcommingList(await getRecentCollectionList());
  };

  const handleRealTimeCollectionById = async (id: string) => {
    getRealTimeCollectionById(id);
  };

  //
  const getCollectionListByBrandName = async (brandName: string) => {
    setRecentList(await getCollectionByBrandName(brandName));
  };

  const getCollectionListByBrandNameAdmin = async (brandName: string) => {
    setRecentList(await getCollectionByBrandNameAdmin(brandName));
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
    upcommingList,
    recentList,
    handleRecentCollectionList,
    handleRealTimeCollectionById,
    getCollectionListByBrandName,
    getCollectionListByBrandNameAdmin,
    getCollectionListByUpcomming,
    getCollectionListByRecent,
    handleCollectionById,
  };
};
