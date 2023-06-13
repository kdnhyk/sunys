import { useRecoilState } from "recoil";
import { userSelector } from "@/store/user";

//
export default function useUser() {
  const [user] = useRecoilState(userSelector);

  return { user };
}
