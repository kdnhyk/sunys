export const initCollection: IsCollection = {
  id: "",
  collectionName: "",
  releaseDate: "",
  images: [],

  brandName: "",
};

export interface IsCollection {
  id?: string;
  collectionName: string;
  releaseDate: string;
  images: string[];

  brandName: string;

  isVisible?: boolean;
}
