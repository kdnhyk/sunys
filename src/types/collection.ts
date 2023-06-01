export const initCollection: IsCollection = {
  id: "",
  collectionName: "",
  releaseDate: "",
  text: "",
  images: [],

  brandName: "",

  isVisible: false,
};

export interface IsCollection {
  id?: string;
  collectionName: string;
  releaseDate: string;
  text: string;
  images: string[];

  brandName: string;

  isVisible: boolean;

  createdTime?: { seconds: number; nanoseconds: number };
}
