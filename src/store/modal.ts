import { atom, selector } from "recoil";

export const modalState = atom<boolean>({
  key: "modalState",
  default: false,
});

export const modalSelector = selector<boolean>({
  key: "modalSelector",
  get: ({ get }) => {
    const originalState = get(modalState);
    return originalState;
  },
  set: ({ set }, newValue) => {
    set(modalState, newValue);
  },
});
