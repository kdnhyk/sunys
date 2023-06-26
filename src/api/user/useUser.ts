import { useQuery, useQueryClient } from "@tanstack/react-query";
import { auth, store } from "@/firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { IsUser } from "@/types/user";

const collectionRef = collection(store, "user");

const getCloudUser = async (uid: string): Promise<IsUser> => {
  if (!uid) {
    console.log("No uid");
  }

  const q = query(collectionRef, where("uid", "==", uid), limit(1));

  console.log("FireStore Access");
  const querySnapshot = await getDocs(q);

  let result: any[] = [];
  querySnapshot.forEach((doc) => {
    result.push({ ...doc.data(), id: doc.id });
  });

  return result[0];
};

const useUser = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // 초기화
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsInitialized(true);
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<IsUser>(
    ["user"],
    async () => await getCloudUser(currentUser?.uid || ""),
    {
      enabled: !!currentUser?.uid,
    }
  );

  return { user, isLoading, isError, error, refetch };
};

export default useUser;
