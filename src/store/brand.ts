import { DefaultValue, atom, selector } from "recoil";
import { IsBrand } from "../types/brand";

export const brandState = atom<{
  currentBrand: IsBrand[];
  newBrandList: IsBrand[];
  saleBrandList: IsBrand[];
}>({
  key: "brandState",
  default: {
    currentBrand: [] as IsBrand[],
    newBrandList: [] as IsBrand[],
    saleBrandList: [] as IsBrand[],
  },
});

export const currentBrandSelector = selector<IsBrand[]>({
  key: "currentBrandSelector",
  get: ({ get }) => {
    const originalState = get(brandState);
    return originalState.currentBrand;
  },
  set: ({ set, get }, newValue) => {
    const oldDocs = get(brandState);

    set(
      brandState,
      newValue instanceof DefaultValue
        ? oldDocs
        : { ...oldDocs, currentBrand: newValue }
    );
  },
});

export const newBrandSelector = selector<IsBrand[]>({
  key: "newBrandSelector",
  get: ({ get }) => {
    const originalState = get(brandState);
    return originalState.newBrandList;
  },
  set: ({ set, get }, newValue) => {
    const oldDocs = get(brandState);

    set(
      brandState,
      newValue instanceof DefaultValue
        ? oldDocs
        : { ...oldDocs, newBrandList: newValue }
    );
  },
});

export const saleBrandSelector = selector<IsBrand[]>({
  key: "saleBrandSelector",
  get: ({ get }) => {
    const originalState = get(brandState);
    return originalState.saleBrandList;
  },
  set: ({ set, get }, newValue) => {
    const oldDocs = get(brandState);

    set(
      brandState,
      newValue instanceof DefaultValue
        ? oldDocs
        : { ...oldDocs, saleBrandList: newValue }
    );
  },
});
