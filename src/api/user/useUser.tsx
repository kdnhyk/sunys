import { collection, doc, setDoc } from "firebase/firestore";
import { store } from "@/firebase";
import { IsArticle } from "@/types/article";
import { IsBrandName } from "@/types/brand";
import useCloudUser from "@/hooks/firestore/useCloudUser";
import { IsUser } from "@/types/user";
import { useRecoilState } from "recoil";
import { userSelector } from "@/store/user";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const collectionRef = collection(store, "user");
  const { getCloudUser } = useCloudUser();
  const [, setUser] = useRecoilState(userSelector);

  const handleBrandScrap = async (user: IsUser, brandName: IsBrandName) => {
    const cloudUser: IsUser = await getCloudUser(user.uid);

    const result = cloudUser.scrapBrandList.find(
      (e) => e.default === brandName.default
    )
      ? {
          brandList: cloudUser.scrapBrandList.filter(
            (e) => e.default !== brandName.default
          ),
          isAdd: false,
        }
      : {
          brandList: cloudUser.scrapBrandList.concat(brandName),
          isAdd: true,
        };

    setUser((prev) => ({ ...prev, scrapBrandList: result.brandList }));

    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, scrapBrandList: result.brandList })
    );

    setDoc(
      doc(collectionRef, user.uid),
      {
        scrapBrandList: result.brandList,
      },
      {
        merge: true,
      }
    );
    return result;
  };

  const handleCart = async (user: IsUser, newArticle: IsArticle) => {
    const result = user.cart.find((e) => e.id === newArticle.id)
      ? user.cart.filter((e) => e.id !== newArticle.id)
      : user.cart.concat(newArticle);

    setUser((prev) => ({ ...prev, cart: result }));

    localStorage.setItem("user", JSON.stringify({ ...user, cart: result }));

    setDoc(
      doc(collectionRef, user.uid),
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
    handleBrandScrap,
    handleCart,
  };
};
