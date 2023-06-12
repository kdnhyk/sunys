import { useRouter } from "next/router";
import { useAuth } from "./useAuth";
import { useEffect } from "react";

//
export default function useCheckAdmin() {
  const { user } = useAuth();
  const router = useRouter();

  console.log("Check admin");

  useEffect(() => {
    if (!user.admin) {
      router.push("/");
    }
  }, [router, user.admin]);

  return router;
}
