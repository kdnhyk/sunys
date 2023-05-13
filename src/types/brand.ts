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

export interface IsBrand {
  logo: string;
  officialUrl: string;

  brandName: string;
  description: string;
  tag: string[];

  saleName: string;
  saleStartDate: string;
  saleEndDate: string;

  officialStoreList: IsOfficialStore[];
  storeList: IsStore[];

  isVisible?: boolean;
}

export const initBrand = {
  logo: "",
  officialUrl: "",
  brandName: "",
  description: "",
  tag: [],
  saleName: "",
  saleStartDate: "",
  saleEndDate: "",
  officialStoreList: [],
  storeList: [],
};
