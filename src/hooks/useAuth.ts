import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  getRedirectResult,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
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
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { getCloudUser, setCloudUser, delUser } = useCloudUser();

  // console.log(currentUser);

  useEffect(() => {
    // 새로고침
    if (currentUser && !user.uid) {
      getCloudUser(currentUser.uid).then(async (cloudUser) => {
        await setUser(cloudUser);
        localStorage.setItem("user", JSON.stringify(cloudUser));
      });
    }
  }, [currentUser, user.uid]);

  useEffect(() => {
    // 회원가입 | 로그인
    // user에 firebase auth 할당
    if (!success) return;
    if (currentUser && !user.uid) {
      getCloudUser(currentUser.uid).then(async (cloudUser) => {
        // console.log(cloudUser);
        if (!cloudUser) {
          setCloudUser(currentUser.uid, currentUser.displayName || "");
          return;
        }
        await setUser(() => cloudUser);
        localStorage.setItem("user", JSON.stringify(cloudUser));
      });
    }
  }, [success]);

  const signup = (username: string, email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await updateProfile(user, { displayName: username }).catch((err) =>
          console.log(err)
        );
        sendEmailVerification(user).then(() => {});
        await setCloudUser(user.uid, user.displayName || "");
        setSuccess(true);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/weak-password":
            setError("비밀번호는 6자리 이상이어야 합니다");
            break;
          case "auth/invalid-email":
            setError("잘못된 이메일 주소입니다");
            break;
          case "auth/email-already-in-use":
            setError("이미 가입되어 있는 계정입니다");
            break;
        }
      });
  };

  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        setSuccess(true);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setError("옳지않은 이메일 입니다");
            break;
          case "auth/user-not-found":
            setError("존재하지 않는 이메일이거나 잘못된 비밀번호 입니다");
            break;
          case "auth/wrong-password":
            setError("존재하지 않는 이메일이거나 잘못된 비밀번호 입니다");
            break;
        }
      });
  };

  const updatePassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

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
        localStorage.removeItem("user");
        setSuccess(true);
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
        localStorage.removeItem("user");
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    user,
    setUser,
    // updateCurrentUser,
    signup,
    login,
    signout,
    updateUser,
    updatePassword,
    removeUser,
    loginWithGoogle,
    error,
    success,
  };
};
