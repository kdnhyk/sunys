import { atom, selector } from "recoil";
import { IsArticle } from "../types/article";

export const articleState = atom<IsArticle[]>({
  key: "articleState",
  default: [] as IsArticle[],
});

export const articleSelector = selector<IsArticle[]>({
  key: "articleSelector",
  get: ({ get }) => {
    const originalState = get(articleState);
    return originalState;
  },
  set: ({ set }, newValue) => {
    set(articleState, newValue);
  },
});
