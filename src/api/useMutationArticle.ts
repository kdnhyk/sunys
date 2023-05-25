import { useMutation, useQueryClient } from "@tanstack/react-query";
import { store, timestamp } from "@/firebase";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { useImage } from "@/hooks/storage/useImage";
import { IsArticle } from "@/types/article";

const useMutationArticle = (cid: string) => {
  const queryClient = useQueryClient();
  const collectionRef = collection(store, "article");
  const { deleteImage } = useImage("article");

  const updateArticle = useMutation(
    ({ id, article }: { id: string; article: IsArticle }) =>
      updateDocs(id, article),
    {
      onMutate() {},
      onSuccess() {
        queryClient.invalidateQueries(["collectionArticle", cid]);
      },
    }
  );

  const deleteArticle = useMutation(
    ({ id, imageUrl }: { id: string; imageUrl: string }) => {
      deleteImage(imageUrl);
      return deleteDocs(id);
    },
    {
      onMutate() {},
      onSuccess() {
        queryClient.invalidateQueries(["collectionArticle", cid]);
      },
    }
  );

  const updateDocs = async (id: string, article: IsArticle) => {
    await setDoc(
      doc(collectionRef, id),
      {
        ...article,
      },
      { merge: true }
    );
  };

  const deleteDocs = async (id: string) => {
    console.log("Del: " + id);
    await deleteDoc(doc(collectionRef, id));
  };

  return { updateArticle, deleteArticle };
};

export default useMutationArticle;
