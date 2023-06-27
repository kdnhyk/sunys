import { useMutation, useQueryClient } from "@tanstack/react-query";
import { store, timestamp } from "@/firebase";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { IsBrandName } from "@/types/brand";
import { IsArticle } from "@/types/article";

const collectionRef = collection(store, "user");

const addCloudUser = async (uid: string, username: string) => {
  const createdTime = timestamp.fromDate(new Date());
  const initUser = {
    uid,
    username,
    scrapBrandList: [],
    cart: [],
    createdTime,
  };
  await setDoc(doc(collectionRef, uid), initUser);
  return initUser;
};

const updateCloudUserScrapBrandList = async (
  uid: string,
  brandList: IsBrandName[]
) => {
  await setDoc(
    doc(collectionRef, uid),
    {
      scrapBrandList: brandList,
    },
    {
      merge: true,
    }
  );
};

const updateCloudUserCart = async (uid: string, newCart: IsArticle[]) => {
  await setDoc(
    doc(collectionRef, uid),
    {
      cart: newCart,
    },
    {
      merge: true,
    }
  );
};

const deleteCloudUser = async (uid: string) => {
  await deleteDoc(doc(collectionRef, uid));
};

const useMutationUser = () => {
  const queryClient = useQueryClient();

  const onAddCloudUser = useMutation(
    ({ uid, userName }: { uid: string; userName: string }) =>
      addCloudUser(uid, userName)
  );

  const onUpdateCloudUserScrapBrandList = useMutation(
    ({ uid, brandList }: { uid: string; brandList: IsBrandName[] }) =>
      updateCloudUserScrapBrandList(uid, brandList),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const onUpdateCloudUserCart = useMutation(
    ({ uid, newCart }: { uid: string; newCart: IsArticle[] }) =>
      updateCloudUserCart(uid, newCart),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const onDeleteCloudUser = useMutation(({ uid }: { uid: string }) =>
    deleteCloudUser(uid)
  );

  return {
    onAddCloudUser,
    onUpdateCloudUserScrapBrandList,
    onUpdateCloudUserCart,
    onDeleteCloudUser,
  };
};

export default useMutationUser;
