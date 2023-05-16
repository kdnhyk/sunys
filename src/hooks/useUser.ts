import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useCloudUser } from "./firestore/useCloudUser";
import { userSelector } from "../store/user";
import { IsArticle } from "../types/article";
import { IsBrand, IsBrandName } from "../types/brand";

export const useUser = () => {
  const [user, setUser] = useRecoilState(userSelector);

  const { getCloudUser } = useCloudUser();

  useEffect(() => {
    // 새로고침
    if (!user.uid) {
      // refreshUser();
    }
  }, []);

  // useEffect(() => {
  //   // 회원가입 | 로그인
  //   // user에 firebase auth 할당
  //   if (!success) return;
  //   if (currentUser && !user.uid) {
  //     getCloudUser(currentUser.uid).then(async (cloudUser) => {
  //       // console.log(cloudUser);
  //       if (!cloudUser) {
  //         setCloudUser(currentUser.uid, currentUser.displayName || "");
  //         return;
  //       }
  //       await setUser(() => cloudUser);
  //       localStorage.setItem("user", JSON.stringify(cloudUser));
  //     });
  //   }
  // }, [success]);

  const handleUseScrapList = (newBrandName: IsBrandName) => {
    const result = user.scrapBrandList.find(
      (e) => e.default === newBrandName.default
    )
      ? user.scrapBrandList.filter((e) => e.default !== newBrandName.default)
      : user.scrapBrandList.concat(newBrandName);
    console.log(result);

    setUser((prev) => ({ ...prev, scrapBrandList: result }));
  };

  const handleUserCart = (newArticle: IsArticle) => {
    const result = user.cart.find((e) => e.id === newArticle.id)
      ? user.cart.filter((e) => e.id !== newArticle.id)
      : user.cart.concat(newArticle);
    // console.log(result);

    setUser((prev) => ({ ...prev, cart: result }));
  };

  return {
    user,
    setUser,
    handleUseScrapList,
    handleUserCart,
  };
};
