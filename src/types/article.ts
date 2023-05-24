export const initState: IsArticle = {
  articleName: "",
  price: "",
  collectionId: "",
  collectionName: "",
  images: [],

  brandName: "",
  releaseDate: "",
};

export interface IsArticle {
  id?: string;
  images: string[];
  articleName: string;
  price: string;
  size?: [];

  brandName: string;
  collectionId: string;
  collectionName: string;
  releaseDate: string;
}
