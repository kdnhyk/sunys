import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useCloudUser } from "./firestore/useCloudUser";
import { userSelector } from "../store/user";
import { IsArticle } from "../types/article";

export const useUser = () => {
  const [user, setUser] = useRecoilState(userSelector);

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

  const handleUserCart = (newArticle: IsArticle) => {
    console.log(user.cart);
    const result = user.cart.find((e) => e.id === newArticle.id)
      ? user.cart.filter((e) => e.id !== newArticle.id)
      : user.cart.concat(newArticle);
    console.log(result);

    setUser((prev) => ({ ...prev, cart: result }));
  };

  return {
    user,
    setUser,
    handleUserCart,
  };
};
