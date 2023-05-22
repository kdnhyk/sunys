import { useNavigate } from "react-router-dom";

//
export default function useLocationState() {
  const nav = useNavigate();

  const onClickBarnd = (brandName: string) => {
    nav(`/brand/${brandName}`);
  };

  const onClickBrandSetting = (brandName?: string) => {
    nav(`/brandform/${brandName ? brandName : ""}`);
  };

  const onClickCollection = (cid: string) => {
    nav(`/collection/${cid}`);
  };

  const onClickCollectionSetting = (brandName: string, cid?: string) => {
    nav(`/brandform/${brandName}/collectionform/${cid ? cid : ""}`);
  };

  return {
    onClickBarnd,
    onClickBrandSetting,
    onClickCollection,
    onClickCollectionSetting,
  };
}
