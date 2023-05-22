import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, provider } from "../firebase";
import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useCloudUser } from "./firestore/useCloudUser";
import { userSelector } from "../store/user";

//
export const useAuth = () => {
  const currentUser = auth.currentUser;
  const [user, setUser] = useRecoilState(userSelector);
  const resetUser = useResetRecoilState(userSelector);
  const [successs, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { getCloudUser, setCloudUser, delUser } = useCloudUser();

  useEffect(() => {
    if (!currentUser || user.uid) return;
    getCloudUser(currentUser.uid).then(async (cloudUser) => {
      if (!cloudUser) {
        await setCloudUser(currentUser.uid, currentUser.displayName || "");
        return;
      }
      await setUser(cloudUser);

      // localStorage.setItem("user", JSON.stringify(cloudUser));
      return;
    });
  }, [currentUser, user.uid, successs]);

  const updateUser = (username: string) => {
    if (!auth.currentUser) return;
    updateProfile(auth.currentUser, {
      displayName: username,
    })
      .then(() => {})
      .catch((error) => {});
  };

  const removeUser = () => {
    const user = auth.currentUser;
    console.log(user);
    if (!user) return;
    deleteUser(user)
      .then(() => {
        delUser(user.uid);
        // firestore user del
        resetUser();
      })
      .catch((error) => {
        console.log(error.message);
      });
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
    console.log({ email, password });

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

              updateProfile(user, { displayName: displayName }).catch((err) =>
                console.log(err)
              );

              setSuccess(true);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
            });
        }
        //
      });
  };

  const signout = () => {
    signOut(auth)
      .then(() => {
        //
        resetUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    user,
    setUser,
    signout,
    updateUser,
    removeUser,
    loginWithGoogle,
    loginWithEmailAndPassword,
    error,
  };
};
