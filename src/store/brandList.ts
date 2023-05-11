import { atom, selector } from "recoil";

export const brandListState = atom<string[]>({
  key: "brandList",
  default: [] as string[],
});

export const brandListSelector = selector<string[]>({
  key: "brandListSelector",
  get: ({ get }) => {
    const originalState = get(brandListState);
    return originalState;
  },
  set: ({ set }, newValue) => {
    set(brandListState, newValue);
  },
});
