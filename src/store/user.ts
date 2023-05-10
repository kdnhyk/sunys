import { atom, selector } from "recoil";
import { IsUser } from "../types/user";

export const userState = atom<IsUser>({
  key: "userState",
  default: {
    uid: "",
    username: "",
    scrapBrandList: [""],
    cart: [""],
    createdTime: "",
  },
});

export const userSelector = selector<IsUser>({
  key: "userSelector",
  get: ({ get }) => {
    const originalState = get(userState);
    return originalState;
  },
  set: ({ set }, newValue) => {
    set(userState, newValue);
  },
});
