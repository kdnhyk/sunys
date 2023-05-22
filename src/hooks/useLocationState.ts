import { useNavigate } from "react-router-dom";
import { IsBrand } from "../types/brand";
import { IsCollection } from "../types/collection";

//
export default function useLocationState() {
  const nav = useNavigate();

  const onClickBarnd = (brand: IsBrand) => {
    nav(`/brand/${brand.brandName}`, {
      state: { brand: brand },
    });
  };

  const onClickBarndByBrandName = (brandName: string) => {
    nav(`/brand/${brandName}`, {
      state: { brand: { brandName: brandName } },
    });
  };

  const onClickBrandSetting = (brand?: IsBrand) => {
    nav(`/brandform/${brand ? brand.brandName : ""}`, {
      state: { brand: brand ? brand : { brandName: "" } },
    });
  };

  const onClickCollection = (collection: IsCollection) => {
    nav(`/collection/${collection.id}`, {
      state: { collection: collection },
    });
  };

  const onClickCollectionByCid = (cid: string) => {
    nav(`/collection/${cid}`, {
      state: { collection: { id: cid } },
    });
  };

  const onClickCollectionSetting = (
    brandName: string,
    collection?: IsCollection
  ) => {
    nav(
      `/brandform/${brandName}/collectionform/${
        collection ? collection.id : ""
      }`,
      {
        state: { collection: collection || null },
      }
    );
  };

  return {
    onClickBarnd,
    onClickBarndByBrandName,
    onClickBrandSetting,
    onClickCollection,
    onClickCollectionByCid,
    onClickCollectionSetting,
  };
}
