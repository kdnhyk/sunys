import { useRecoilState } from "recoil";
import { userSelector } from "@/store/user";
import { IsArticle } from "@/types/article";
import { IsBrandName } from "@/types/brand";

//
export const useUser = () => {
  const [user, setUser] = useRecoilState(userSelector);

  const handleUseScrapList = (newBrandName: IsBrandName) => {
    const result = user.scrapBrandList.find(
      (e) => e.default === newBrandName.default
    )
      ? user.scrapBrandList.filter((e) => e.default !== newBrandName.default)
      : user.scrapBrandList.concat(newBrandName);
    console.log(result);

    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, scrapBrandList: result })
    );
    setUser((prev) => ({ ...prev, scrapBrandList: result }));
  };

  const handleUserCart = (newArticle: IsArticle) => {
    const result = user.cart.find((e) => e.id === newArticle.id)
      ? user.cart.filter((e) => e.id !== newArticle.id)
      : user.cart.concat(newArticle);
    // console.log(result);

    setUser((prev) => ({ ...prev, cart: result }));
  };

  return {
    user,
    setUser,
    handleUseScrapList,
    handleUserCart,
  };
};
