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

export const initStore: IsStore = {
  images: [],
  storeName: "",
  storeUrl: "",
  storeLocation: "",
  brandList: [],
  description: "",
};
export interface IsStore {
  images: string[];
  storeName: string;
  storeUrl: string;
  storeLocation: string;
  brandList: IsBrandName[];
  description: string;
  createdTime?: { seconds: number; nanoseconds: number };
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

  createdTime?: { seconds: number; nanoseconds: number };
}
