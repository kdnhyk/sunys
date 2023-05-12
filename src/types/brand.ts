export interface IsOfflineStore {
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
  brandName: string;
  saleStartDate: string;
  saleEndDate: string;

  description: string;
  officialOnlineStore: IsStore;
  officialOfflineStore: IsOfflineStore[];
  storeList: IsStore[];

  isVisible?: boolean;
}
