import { useRouter } from "next/router";

//
export default function useLocationState() {
  const router = useRouter();

  const onClickBarnd = (brandName: string) => {
    router.push(`/brand/${brandName}`);
  };

  const onClickBrandSetting = (brandName?: string) => {
    router.push(`/brandform/${brandName ? brandName : ""}`);
  };

  const onClickCollection = (brandName: string, cid: string) => {
    router.push(`/brand/${brandName}/collection/${cid}`);
  };

  const onClickCollectionSetting = (brandName: string, cid?: string) => {
    router.push(`/brandform/${brandName}/collectionform/${cid ? cid : ""}`);
  };

  return {
    onClickBarnd,
    onClickBrandSetting,
    onClickCollection,
    onClickCollectionSetting,
  };
}
