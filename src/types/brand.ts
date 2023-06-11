import { IsStore } from "./store";

export const initBrand: IsBrand = {
  logo: "",
  officialUrl: "",
  brandName: "",
  brandNameKo: "",
  description: "",
  tag: [],
  scrapNum: 0,
  officialStoreList: [],
  storeList: [],
};

export interface IsOfficialStore {
  id?: string;
  image: string;
  storeName: string;
  storeLocation: string; // 네이버 지도로 연결
}

export interface IsBrandName {
  default: string;
  korean: string;
}

export interface IsBrand {
  logo: string;
  officialUrl: string;

  brandName: string;
  brandNameKo: string;

  description: string;
  tag: string[];
  scrapNum: number;

  officialStoreList: IsOfficialStore[];
  storeList: IsStore[];

  isVisible?: boolean;

  crawlUrl?: string;
  crawlSelector?: string;

  createdTime?: { seconds: number; nanoseconds: number };
}
