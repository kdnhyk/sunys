import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userSelector } from "@/store/user";

//
export default function useCheckAdmin() {
  const [user] = useRecoilState(userSelector);
  const router = useRouter();

  console.log("Check admin");

  useEffect(() => {
    if (!user.admin) {
      router.push("/");
    }
  }, [router, user.admin]);
}
