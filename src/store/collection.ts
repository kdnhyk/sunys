import { DefaultValue, atom, selector } from "recoil";
import { IsCollection } from "../types/collection";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

export const collectionState = atom<{
  currentCollection: IsCollection[];
  recentCollection: IsCollection[];
  lastVisible: QuerySnapshot<DocumentData> | null;
}>({
  key: "collectionState",
  default: {
    currentCollection: [] as IsCollection[],
    recentCollection: [] as IsCollection[],
    lastVisible: null,
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

export const lastVisibleSelector = selector<QuerySnapshot<DocumentData> | null>(
  {
    key: "lastVisibleSelector",
    get: ({ get }) => {
      const originalState = get(collectionState);
      return originalState.lastVisible;
    },
    set: ({ set, get }, newValue) => {
      const oldDocs = get(collectionState);

      set(
        collectionState,
        newValue instanceof DefaultValue
          ? oldDocs
          : { ...oldDocs, lastVisible: newValue }
      );
    },
  }
);
