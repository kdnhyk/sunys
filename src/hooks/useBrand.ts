import { useRecoilState } from "recoil";
import { currentBrandSelector } from "../store/brand";

export const useBrand = () => {
  const [currentBrandList, setCurrentBrandList] =
    useRecoilState(currentBrandSelector);

  return {
    currentBrandList,
  };
};
