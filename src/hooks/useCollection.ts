import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { collectionSelector } from "../store/collection";
import { useCollectionStore } from "./firestore/useCollectionStore";

export const useCollection = () => {
  const [collectionList, setCollectionList] =
    useRecoilState(collectionSelector);

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
    setCollectionList(documents);
  }, [documents]);

  const handleRecentCollectionList = async () => {
    setCollectionList(await getRecentCollectionList());
  };

  const handleRealTimeCollectionById = async (id: string) => {
    getRealTimeCollectionById(id);
  };

  //
  const getCollectionListByBrandName = async (brandName: string) => {
    setCollectionList(await getCollectionByBrandName(brandName));
  };

  const getCollectionListByBrandNameAdmin = async (brandName: string) => {
    setCollectionList(await getCollectionByBrandNameAdmin(brandName));
  };

  const getCollectionListByUpcomming = async () => {
    setCollectionList(await getCollectionByUpcomming());
  };

  const getCollectionListByRecent = async () => {
    setCollectionList(await getCollectionByRecent());
  };

  const handleCollectionById = async (id: string) => {
    return await getCollectionById(id);
  };
  //

  return {
    collectionList,
    handleRecentCollectionList,
    handleRealTimeCollectionById,
    getCollectionListByBrandName,
    getCollectionListByBrandNameAdmin,
    getCollectionListByUpcomming,
    getCollectionListByRecent,
    handleCollectionById,
  };
};
