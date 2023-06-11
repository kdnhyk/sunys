import { useMutation, useQueryClient } from "@tanstack/react-query";
import { store, timestamp } from "@/firebase";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { useImage } from "@/hooks/storage/useImage";
import { IsStore } from "@/types/store";

const useMutationStore = (storeName: string) => {
  const queryClient = useQueryClient();
  const collectionRef = collection(store, "store");
  const { deleteImage } = useImage("store");

  const updateStore = useMutation(
    ({ storeName, store }: { storeName: string; store: IsStore }) =>
      updateDocs(storeName, store),
    {
      onMutate() {},
      onSuccess() {
        queryClient.invalidateQueries(["store", storeName]);
      },
    }
  );

  const deleteStore = useMutation(
    ({ storeName, imageUrl }: { storeName: string; imageUrl: string }) => {
      deleteImage(imageUrl);
      return deleteDocs(storeName);
    },
    {
      onMutate() {},
      onSuccess() {
        queryClient.invalidateQueries(["store", storeName]);
      },
    }
  );

  const updateDocs = async (storeName: string, store: IsStore) => {
    if (!store.createdTime) return;
    const createdTime = new timestamp(
      store.createdTime.seconds,
      store.createdTime?.nanoseconds
    );

    await setDoc(
      doc(collectionRef, storeName),
      {
        ...store,
        createdTime,
      },
      { merge: true }
    );
  };

  const deleteDocs = async (storeName: string) => {
    console.log("Del: " + storeName);
    await deleteDoc(doc(collectionRef, storeName));
  };

  return { updateStore, deleteStore };
};

export default useMutationStore;
