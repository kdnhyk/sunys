import { IsArticle } from "./article";
import { IsBrandName } from "./brand";

export interface IsUser {
  uid: string | null;
  username: string;

  scrapBrandList: IsBrandName[];
  cart: IsArticle[];
  createdTime: any;

  admin?: boolean;
}
