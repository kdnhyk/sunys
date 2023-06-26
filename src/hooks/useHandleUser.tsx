import { IsArticle } from "@/types/article";
import { IsBrandName } from "@/types/brand";
import useMutationUser from "../api/user/useMutationUser";
import useUser from "@/api/user/useUser";

export const useHandleUser = () => {
  const { user, refetch } = useUser();

  const { onUpdateCloudUserScrapBrandList, onUpdateCloudUserCart } =
    useMutationUser();

  const handleBrandScrap = async (brandName: IsBrandName) => {
    if (!user) return;

    await refetch();
    console.log(user);

    const result = user.scrapBrandList.find(
      (e) => e.default === brandName.default
    )
      ? user.scrapBrandList.filter((e) => e.default !== brandName.default)
      : user.scrapBrandList.concat(brandName);

    onUpdateCloudUserScrapBrandList.mutate({
      uid: user.uid,
      brandList: result,
    });
  };

  const handleCart = async (newArticle: IsArticle) => {
    if (!user) return;

    await refetch(); // 작동 x
    console.log(user);

    const result = user.cart.find((e) => e.id === newArticle.id)
      ? user.cart.filter((e) => e.id !== newArticle.id)
      : user.cart.concat(newArticle);

    onUpdateCloudUserCart.mutate({ uid: user.uid, newCart: result });
  };

  return {
    handleBrandScrap,
    handleCart,
  };
};
