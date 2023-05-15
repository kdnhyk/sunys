import { useEffect } from "react";
import { useBrandListStore } from "./firestore/useBrandListStore";
import { useRecoilState } from "recoil";
import { brandListSelector } from "../store/brandList";
import { IsBrandName } from "../types/brand";
export const useBrandList = () => {
  const [brandList, setBrandList] =
    useRecoilState<IsBrandName[]>(brandListSelector);
  const { documents, getBrandListRealtime } = useBrandListStore();

  useEffect(() => {
    if (documents) {
      setBrandList(documents);
    }
  }, [documents]);

  const getBrandList = async () => {
    getBrandListRealtime();
  };

  return {
    brandList,
    getBrandList,
  };
};
