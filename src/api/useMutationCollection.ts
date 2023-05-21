import { useMutation } from "react-query";
import { store, timestamp } from "../firebase";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { IsCollection } from "../types/collection";
import { useImage } from "../hooks/storage/useImage";

const useMutationCollection = () => {
  const CollectionRef = collection(store, "collection");
  const { deleteImage } = useImage("collection");

  const addCollection = useMutation(
    (collection: IsCollection) => addDocs(collection),
    {
      onMutate() {},
      onSuccess() {},
      onError() {},
    }
  );

  const updateCollection = useMutation(
    ({ id, collection }: { id: string; collection: IsCollection }) =>
      updateDocs(id, collection),
    {
      onMutate() {},
    }
  );

  const deleteCollection = useMutation(
    ({ id, imageUrl }: { id: string; imageUrl: string }) => {
      deleteImage(imageUrl);
      return deleteDocs(id);
    },
    {
      onMutate() {},
    }
  );

  const addDocs = async (collection: IsCollection) => {
    const createdTime = timestamp.fromDate(new Date());

    await addDoc(CollectionRef, {
      ...collection,
      createdTime,
    });
    return;
  };

  const updateDocs = async (id: string, collection: IsCollection) => {
    await setDoc(
      doc(CollectionRef, id),
      {
        ...collection,
      },
      { merge: true }
    );
  };

  const deleteDocs = async (id: string) => {
    console.log("Del: " + id);
    await deleteDoc(doc(CollectionRef, id));
  };

  return { addCollection, updateCollection, deleteCollection };
};

export default useMutationCollection;
