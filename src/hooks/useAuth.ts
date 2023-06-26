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
import { useState } from "react";
import useMutationUser from "@/api/user/useMutationUser";

//
export const useAuth = () => {
  const [successs, setSuccess] = useState(false);
  const { onAddCloudUser, onDeleteCloudUser } = useMutationUser();

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

        onAddCloudUser.mutate({
          uid: user.uid,
          userName: user.displayName || "",
        });

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

              onAddCloudUser.mutate({
                uid: user.uid,
                userName: user.displayName || "",
              });

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
        onDeleteCloudUser.mutate({ uid: user.uid });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return {
    logout,
    updateUser,
    removeUser,
    loginWithGoogle,
    loginWithEmailAndPassword,
    successs,
  };
};
