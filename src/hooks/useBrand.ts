import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useBrandStore } from "./firestore/useBrandStore";
import {
  currentBrandSelector,
  newBrandSelector,
  saleBrandSelector,
} from "../store/brand";

export const useBrand = () => {
  const [currentBrandList, setCurrentBrandList] =
    useRecoilState(currentBrandSelector);
  const [newBrandList, setNewBrandList] = useRecoilState(newBrandSelector);
  const [saleBrandList, setSaleBrandList] = useRecoilState(saleBrandSelector);

  const {
    documents,
    getNewBrandList,
    getBrandByBrandNameRealTime,
    getSaleBrandList,
  } = useBrandStore();

  useEffect(() => {
    if (!documents) return;
    setCurrentBrandList(documents);
  }, [documents]);

  // Search - New Brand
  const handleNewBrandList = async () => {
    setNewBrandList(await getNewBrandList());
  };

  // Search - Sale
  const handleSaleBrandList = async () => {
    setSaleBrandList(await getSaleBrandList());
  };

  const handleBrandByBrandNameRealtime = async (brandName: string) => {
    getBrandByBrandNameRealTime(brandName);
  };

  return {
    currentBrandList,
    newBrandList,
    saleBrandList,
    handleNewBrandList,
    handleBrandByBrandNameRealtime,
    handleSaleBrandList,
  };
};
