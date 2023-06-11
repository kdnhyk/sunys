import { IsBrandName } from "./brand";

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
