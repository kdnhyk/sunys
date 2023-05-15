import {
  GoogleAuthProvider,
  deleteUser,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, provider } from "../firebase";
import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useCloudUser } from "./firestore/useCloudUser";
import { userSelector } from "../store/user";

export const useAuth = () => {
  const currentUser = auth.currentUser;
  const [user, setUser] = useRecoilState(userSelector);
  const resetUser = useResetRecoilState(userSelector);
  const [isPending, setIsPending] = useState(false);
  const [successs, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { getCloudUser, setCloudUser, delUser } = useCloudUser();

  // console.log(currentUser);

  useEffect(() => {
    if (!currentUser || user.uid) return;
    setIsPending(true);
    getCloudUser(currentUser.uid).then(async (cloudUser) => {
      if (!cloudUser) {
        await setCloudUser(currentUser.uid, currentUser.displayName || "");
        return;
      }
      await setUser(cloudUser);

      // localStorage.setItem("user", JSON.stringify(cloudUser));
      return;
    });
    setIsPending(false);
  }, [currentUser, user.uid, successs]);

  const handleCloudUserRealTime = () => {};

  const updateUser = (username: string) => {
    if (!auth.currentUser) return;
    updateProfile(auth.currentUser, {
      displayName: username,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  const removeUser = () => {
    const user = auth.currentUser;
    console.log(user);
    if (!user) return;
    deleteUser(user)
      .then(() => {
        // User deleted.
        delUser(user.uid);
        resetUser();
      })
      .catch((error) => {
        console.log(error.message);
        // An error ocurred
        // ...
      });
  };

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log(user);
        setSuccess(true);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

    // signInWithRedirect(auth, provider);

    // getRedirectResult(auth)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access Google APIs.
    //     const credential = GoogleAuthProvider.credentialFromResult(result!);
    //     const token = credential?.accessToken;

    //     // The signed-in user info.
    //     const user = result?.user;
    //     console.log(user);
    //     // if (user && user.displayName) {
    //     //   setCloudUser(user.uid, user.displayName);
    //     //   setSuccess(true);
    //     // }

    //     // IdP data available using getAdditionalUserInfo(result)
    //     // ...
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     console.log(errorCode);
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //   });
  };

  const signout = () => {
    signOut(auth)
      .then(() => {
        // setUser({
        //   uid: "",
        //   username: "",
        //   email: "",
        //   emailVerified: false,
        //   level: 0,
        //   scrapAlbum: [""],
        //   scrapUser: [""],
        //   requestLevelUp: false,
        //   createdTime: null,
        // });
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
    isPending,
    error,
  };
};
