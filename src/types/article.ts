export const initState: IsArticle = {
  images: [],
  articleName: "",
  description: "",
  price: "",
  collectionId: "",
  collectionName: "",

  brandName: "",
  releaseDate: "",
};

export interface IsArticle {
  id?: string;
  images: string[];
  articleName: string;
  description: string;
  price: string;
  size?: [];

  brandName: string;
  collectionId: string;
  collectionName: string;
  releaseDate: string;
}
