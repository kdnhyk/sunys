export interface IsCollection {
  id?: string;
  collectionName: string;
  releaseDate: string;
  articleList: string[];
  images: string[];

  brandName: string;

  isVisible?: boolean;
}
