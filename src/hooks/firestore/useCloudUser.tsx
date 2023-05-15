import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { store, timestamp } from "../../firebase";
import { IsArticle } from "../../types/article";
import { IsBrandName } from "../../types/brand";

export const useCloudUser = () => {
  const collectionRef = collection(store, "user");

  // const getCloudUser = async (uid: string) => {
  //   const q = query(collectionRef, where("uid", "==", uid), limit(1));

  //   console.log("FireStore Access");

  //   const unsubscribe = onSnapshot(
  //     q,
  //     (querySnapshot) => {
  //       let result: any[] = [];
  //       querySnapshot.forEach((doc) => {
  //         result.push({ ...doc.data() });
  //         console.log(result);
  //         return result[0];
  //       });
  //     },
  //     (error) => {
  //       console.log(error.message);
  //     }
  //   );
  //   return null;
  // };

  const getCloudUser = async (uid: string) => {
    const q = query(collectionRef, where("uid", "==", uid), limit(1));

    let result: any[] = [];
    const user = await getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        result.push({ ...doc.data() });
      });
    });

    return result[0];
  };

  const setCloudUser = async (uid: string, username: string) => {
    const createdTime = timestamp.fromDate(new Date());
    setDoc(doc(collectionRef, uid), {
      uid,
      username,
      scrapBrandList: [],
      cart: [],
      createdTime,
    });
  };

  const delUser = async (uid: string) => {
    await deleteDoc(doc(collectionRef, uid));
  };

  const updateScrapBrand = (
    uid: string,
    oldScrapBrandList: IsBrandName[],
    brandName: IsBrandName
  ) => {
    const result = oldScrapBrandList.find(
      (e) => e.default === brandName.default
    )
      ? oldScrapBrandList.filter((e) => e.default !== brandName.default)
      : oldScrapBrandList.concat(brandName);

    setDoc(
      doc(collectionRef, uid),
      {
        scrapBrandList: result,
      },
      {
        merge: true,
      }
    );
    return result;
  };

  const updateCart = (
    uid: string,
    oldCart: IsArticle[],
    newArticle: IsArticle
  ) => {
    const result = oldCart.find((e) => e.id === newArticle.id)
      ? oldCart.filter((e) => e.id !== newArticle.id)
      : oldCart.concat(newArticle);

    setDoc(
      doc(collectionRef, uid),
      {
        cart: result,
      },
      {
        merge: true,
      }
    );
    return result;
  };

  return {
    getCloudUser,
    setCloudUser,
    delUser,
    updateScrapBrand,
    updateCart,
  };
};
