import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useCloudUser } from "./firestore/useCloudUser";
import { userSelector } from "../store/user";

export const useUser = () => {
  const [user, setUser] = useRecoilState(userSelector);
  const resetUser = useResetRecoilState(userSelector);
  const { getCloudUser, setCloudUser, delUser } = useCloudUser();

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

  // const refreshUser = () => {
  //   if (currentUser) {
  //     getCloudUser(currentUser.uid).then(async (cloudUser) => {
  //       await setUser(cloudUser);
  //       localStorage.setItem("user", JSON.stringify(cloudUser));
  //     });
  //   }
  // };

  return {
    user,
    setUser,
  };
};
