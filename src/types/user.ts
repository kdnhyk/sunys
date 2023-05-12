import { IsArticle } from "./article";

export interface IsUserFirebase {
  uid: string;
  email: string;
  username: string;
  emailVerified: boolean;
}

export interface IsUserCloud {
  uid: string;
  username: string;
  level: number;
  requestLevelUp: boolean;
  scrapAlbum: string[];
  scrapUser: string[];
  createdTime: any;
}

export interface IsUser {
  uid: string;
  username: string;

  scrapBrandList: string[];
  cart: IsArticle[];
  createdTime: any;

  admin?: boolean;
}
