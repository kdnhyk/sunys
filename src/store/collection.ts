import { DefaultValue, atom, selector } from "recoil";
import { IsCollection } from "../types/collection";

export const collectionState = atom<{
  brandCollection: IsCollection[];
  userCollection: IsCollection[];
  recentCollection: IsCollection[];
}>({
  key: "collectionState",
  default: {
    brandCollection: [] as IsCollection[],
    userCollection: [] as IsCollection[],
    recentCollection: [] as IsCollection[],
  },
});

// brand
export const brandColletionSelector = selector<IsCollection[]>({
  key: "brandColletionSelector",
  get: ({ get }) => {
    const originalState = get(collectionState);
    return originalState.brandCollection;
  },
  set: ({ set, get }, newValue) => {
    const oldDocs = get(collectionState);

    set(
      collectionState,
      newValue instanceof DefaultValue
        ? oldDocs
        : { ...oldDocs, brandCollection: newValue }
    );
  },
});

// --
export const userColletionSelector = selector<IsCollection[]>({
  key: "userColletionSelector",
  get: ({ get }) => {
    const originalState = get(collectionState);
    return originalState.userCollection;
  },
  set: ({ set, get }, newValue) => {
    const oldDocs = get(collectionState);

    set(
      collectionState,
      newValue instanceof DefaultValue
        ? oldDocs
        : { ...oldDocs, userCollection: newValue }
    );
  },
});

// news
export const recentCollectionSelector = selector<IsCollection[]>({
  key: "recentCollectionSelector",
  get: ({ get }) => {
    const originalState = get(collectionState);
    return originalState.recentCollection;
  },
  set: ({ set, get }, newValue) => {
    const oldDocs = get(collectionState);

    set(
      collectionState,
      newValue instanceof DefaultValue
        ? oldDocs
        : { ...oldDocs, recentCollection: newValue }
    );
  },
});
