import { atom, selector } from "recoil";
import { IsArticle } from "../types/article";

export const cartState = atom<IsArticle[]>({
  key: "cart",
  default: [] as IsArticle[],
});

export const cartSelector = selector<IsArticle[]>({
  key: "cartSelector",
  get: ({ get }) => {
    const originalState = get(cartState);
    return originalState;
  },
  set: ({ set }, newValue) => {
    set(cartState, newValue);
  },
});
