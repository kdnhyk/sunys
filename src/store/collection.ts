import { atom, selector } from "recoil";
import { IsCollection } from "../types/collection";

export const collectionState = atom<IsCollection[]>({
  key: "collectionState",
  default: [] as IsCollection[],
});

export const collectionSelector = selector<IsCollection[]>({
  key: "collectionSelector",
  get: ({ get }) => {
    const originalState = get(collectionState);
    return originalState;
  },
  set: ({ set }, newValue) => {
    set(collectionState, newValue);
  },
});
