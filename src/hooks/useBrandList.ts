import { useEffect } from "react";
import { useBrandListStore } from "./firestore/useBrandListStore";
import { useRecoilState } from "recoil";
import { brandListSelector } from "../store/brandList";
import { IsBrandName } from "../types/brand";

//
export const useBrandList = () => {
  const [brandList, setBrandList] =
    useRecoilState<IsBrandName[]>(brandListSelector);

  const { documents, getBrandListRealtime } = useBrandListStore();

  const sortUserBrandList = (brandList: IsBrandName[]) => {
    const result = [...brandList];

    return result.sort((a, b) => {
      if (a.default.toUpperCase() < b.default.toUpperCase()) {
        return -1;
      }
      if (a.default.toUpperCase() > b.default.toUpperCase()) {
        return 1;
      }

      return 0;
    });
  };

  const sortRestBrandList = (scrapBrandList: IsBrandName[]) => {
    const result = [...brandList];
    const scrap = [...scrapBrandList].map((e) => e.default);

    return result
      .filter((e) => !scrap.includes(e.default))
      .sort((a, b) => {
        if (a.default.toUpperCase() < b.default.toUpperCase()) {
          return -1;
        }
        if (a.default.toUpperCase() > b.default.toUpperCase()) {
          return 1;
        }

        return 0;
      });
  };

  useEffect(() => {
    if (documents) {
      setBrandList(documents);
    }
  }, [documents, setBrandList]);

  const getBrandList = async () => {
    getBrandListRealtime();
  };

  return {
    brandList,
    sortUserBrandList,
    sortRestBrandList,
    getBrandList,
  };
};
