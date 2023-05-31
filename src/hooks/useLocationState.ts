import { useRouter } from "next/router";

//
export default function useLocationState() {
  const router = useRouter();

  const onClickBarnd = (brandName: string) => {
    router.push(`/brand/${brandName}`);
  };

  const onClickBrandSetting = (brandName?: string) => {
    router.push(`/brandform/${brandName || ""}`);
  };

  const onClickCollection = (brandName: string, cid: string) => {
    router.push(`/brand/${brandName}/${cid}`);
  };

  const onClickCollectionSetting = (brandName: string, cid?: string) => {
    router.push(`/brandform/${brandName}/collectionform/${cid || ""}`);
  };

  const onClickStore = () => {
    router.push("/store");
  };

  const onClickStoreSetting = (storeName?: string) => {
    router.push(`/storeform/${storeName || ""}`);
  };

  return {
    onClickBarnd,
    onClickBrandSetting,
    onClickCollection,
    onClickCollectionSetting,
    onClickStore,
    onClickStoreSetting,
  };
}
