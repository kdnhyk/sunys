export const initBrand = {
  logo: "",
  officialUrl: "",
  brandName: "",
  brandNameKo: "",
  description: "",
  tag: [],
  saleName: "",
  saleStartDate: "",
  saleEndDate: "",
  officialStoreList: [],
  storeList: [],
};

export interface IsOfficialStore {
  id?: string;
  image: string;
  storeName: string;
  storeLocation: string; // 네이버 지도로 연결
}

export interface IsStore {
  id?: string;
  image: string;
  storeName: string;
  storeUrl: string;
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

  saleName: string;
  saleStartDate: string;
  saleEndDate: string;

  officialStoreList: IsOfficialStore[];
  storeList: IsStore[];

  isVisible?: boolean;
}
