import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, provider } from "@/firebase";
import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { userSelector } from "../store/user";
import useCloudUser from "@/api/user/useCloudUser";

//
export const useAuth = () => {
  const currentUser = auth.currentUser;
  const [user, setUser] = useRecoilState(userSelector);
  const resetUser = useResetRecoilState(userSelector);

  const [successs, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { getCloudUser, addCloudUser, deleteCloudUser } = useCloudUser();

  // 새로고침
  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser && !user.uid) {
      const user = JSON.parse(localUser);
      console.log("get cloud");
      getCloudUser(user.uid).then(async (cloudUser) => {
        if (!cloudUser) return;

        await setUser(cloudUser);
        localStorage.setItem("user", JSON.stringify(cloudUser));
        return;
      });
    }

    setSuccess(() => false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 만료
  useEffect(() => {
    if (user.uid && !currentUser) {
      localStorage.removeItem("user");
      resetUser();
    }
  }, [currentUser, resetUser, user]);

  // 로그인
  useEffect(() => {
    if (currentUser && successs) {
      getCloudUser(currentUser.uid).then(async (cloudUser) => {
        if (!cloudUser) {
          const newUser = await addCloudUser(
            currentUser.uid,
            currentUser.displayName || ""
          );

          await setUser(newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
          return;
        }

        await setUser(cloudUser);
        localStorage.setItem("user", JSON.stringify(cloudUser));
        return;
      });
    }
    setSuccess(() => false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successs]);

  const updateUser = (username: string) => {
    if (!auth.currentUser) return;
    updateProfile(auth.currentUser, {
      displayName: username,
    })
      .then(() => {})
      .catch((error) => {});
  };

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        console.log(user);
        setSuccess(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  const loginWithEmailAndPassword = ({
    email,
    password,
    displayName,
  }: {
    email: string;
    password: string;
    displayName: string;
  }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const displayName = getAuth().currentUser?.displayName;

        console.log(user, displayName);
        setSuccess(true);
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          // 비번 해시해야 할지도?
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;

              updateProfile(user, { displayName }).catch((err) =>
                console.log(err)
              );

              console.log("New User");
              setSuccess(true);
            })
            .catch((error) => {
              //
            });
        }
        //
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        resetUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeUser = () => {
    const user = auth.currentUser;
    console.log(user);
    if (!user) return;
    deleteUser(user)
      .then(() => {
        // 스크랩한 브랜드 다 -1 해야함
        localStorage.removeItem("user");
        deleteCloudUser(user.uid);
        resetUser();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return {
    user,
    logout,
    updateUser,
    removeUser,
    loginWithGoogle,
    loginWithEmailAndPassword,
    error,
    successs,
  };
};
