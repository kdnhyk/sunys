import { atom, selector } from "recoil";
import { IsBrandName } from "../types/brand";

export const brandListState = atom<IsBrandName[]>({
  key: "brandList",
  default: [] as IsBrandName[],
});

export const brandListSelector = selector<IsBrandName[]>({
  key: "brandListSelector",
  get: ({ get }) => {
    const originalState = get(brandListState);
    return originalState;
  },
  set: ({ set }, newValue) => {
    set(brandListState, newValue);
  },
});
