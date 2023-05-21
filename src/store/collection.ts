import { DefaultValue, atom, selector } from "recoil";
import { IsCollection } from "../types/collection";

export const collectionState = atom<{
  currentCollection: IsCollection[];
  myCollection: IsCollection[];
  recentCollection: IsCollection[];
}>({
  key: "collectionState",
  default: {
    currentCollection: [] as IsCollection[],
    myCollection: [] as IsCollection[],
    recentCollection: [] as IsCollection[],
  },
});

export const currentColletionSelector = selector<IsCollection[]>({
  key: "currentColletionSelector",
  get: ({ get }) => {
    const originalState = get(collectionState);
    return originalState.currentCollection;
  },
  set: ({ set, get }, newValue) => {
    const oldDocs = get(collectionState);

    set(
      collectionState,
      newValue instanceof DefaultValue
        ? oldDocs
        : { ...oldDocs, currentCollection: newValue }
    );
  },
});

export const myCollectionListSelector = selector<IsCollection[]>({
  key: "myCollectionListSelector",
  get: ({ get }) => {
    const originalState = get(collectionState);
    return originalState.myCollection;
  },
  set: ({ set, get }, newValue) => {
    const oldDocs = get(collectionState);

    set(
      collectionState,
      newValue instanceof DefaultValue
        ? oldDocs
        : { ...oldDocs, myCollection: newValue }
    );
  },
});

export const recentCollectionListSelector = selector<IsCollection[]>({
  key: "recentCollectionListSelector",
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
