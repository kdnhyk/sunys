import { DefaultValue, atom, selector } from "recoil";
import { IsCollection } from "../types/collection";

export const collectionState = atom<{
  currentCollection: IsCollection[];
  upcommingList: IsCollection[];
  recentList: IsCollection[];
}>({
  key: "collectionState",
  default: {
    currentCollection: [] as IsCollection[],
    upcommingList: [] as IsCollection[],
    recentList: [] as IsCollection[],
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

export const upcommingCollectionListSelector = selector<IsCollection[]>({
  key: "upcommingCollectionListSelector",
  get: ({ get }) => {
    const originalState = get(collectionState);
    return originalState.upcommingList;
  },
  set: ({ set, get }, newValue) => {
    const oldDocs = get(collectionState);

    set(
      collectionState,
      newValue instanceof DefaultValue
        ? oldDocs
        : { ...oldDocs, upcommingList: newValue }
    );
  },
});

export const recentCollectionListSelector = selector<IsCollection[]>({
  key: "recentCollectionListSelector",
  get: ({ get }) => {
    const originalState = get(collectionState);
    return originalState.recentList;
  },
  set: ({ set, get }, newValue) => {
    const oldDocs = get(collectionState);

    set(
      collectionState,
      newValue instanceof DefaultValue
        ? oldDocs
        : { ...oldDocs, recentList: newValue }
    );
  },
});