import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useBrandStore } from "./firestore/useBrandStore";
import {
  currentBrandSelector,
  newBrandSelector,
  saleBrandSelector,
} from "../store/brand";
import { IsBrand } from "../types/brand";

export const useBrand = () => {
  const [currentBrandList, setCurrentBrandList] =
    useRecoilState(currentBrandSelector);
  const [newBrandList, setNewBrandList] = useRecoilState(newBrandSelector);
  const [saleBrandList, setSaleBrandList] = useRecoilState(saleBrandSelector);

  const {
    documents,
    getNewBrandList,
    getBrandByBrandNameRealTime,
    getBrandByBrandName,
    getSaleBrandList,
    deleteDocument,
  } = useBrandStore();

  useEffect(() => {
    if (!documents) return;
    setCurrentBrandList(documents);
  }, [documents]);

  const handleNewBrandList = async () => {
    setNewBrandList(await getNewBrandList());
  };

  const handleBrandByBrandNameRealtime = async (brandName: string) => {
    getBrandByBrandNameRealTime(brandName);
  };

  const handleSaleBrandList = async () => {
    setSaleBrandList(await getSaleBrandList());
  };

  const searchFilter = (userVocalList: string[], value: string) => {
    const result = userVocalList.filter((e) => {
      return e
        .replace(" ", "")
        .toLocaleLowerCase()
        .includes(value.toLocaleLowerCase().replace(" ", ""));
    });
    return result;
  };

  return {
    currentBrandList,
    newBrandList,
    saleBrandList,
    handleNewBrandList,
    handleBrandByBrandNameRealtime,
    handleSaleBrandList,
    searchFilter,
  };
};
