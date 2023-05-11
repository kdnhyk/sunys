import { useEffect } from "react";
import { useBrandListStore } from "./firestore/useBrandListStore";
import { useRecoilState } from "recoil";
import { brandListSelector } from "../store/brandList";
export const useBrandList = () => {
  const [brandList, setBrandList] = useRecoilState<string[]>(brandListSelector);
  const { documents, getBrandListRealtime } = useBrandListStore();

  useEffect(() => {
    if (documents) {
      setBrandList(documents);
    }
  }, [documents]);
  // const getBrandList = async () => {
  //   setBrandList(await getAllDocuments());
  // };

  // const getRealTimeArticles = async () => {
  //   getArticleByIdRealTime();
  // };

  const getBrandList = async () => {
    getBrandListRealtime();
  };

  return {
    brandList,
    getBrandList,
  };
};
