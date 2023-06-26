import { useRouter } from "next/router";
import { useEffect } from "react";
import useUser from "@/api/user/useUser";

//
export default function useCheckAdmin() {
  const { user } = useUser();
  const router = useRouter();

  console.log("Check admin");

  useEffect(() => {
    if (!user?.admin) {
      router.push("/");
    }
  }, [router, user?.admin]);
}
