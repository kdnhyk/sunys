import styled from "styled-components";
import MainArea from "./MainArea";
import { useParams } from "react-router-dom";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { IsBrand } from "../../types/brand";
import { toStringByFormatting } from "../../util";
import StoreArea0 from "./StoreArea0";
import StoreArea1 from "./StoreArea1";
import UnderLineBox from "../../common/components/UnderLineBox";
import { useBrand } from "../../hooks/useBrand";
import CollectionArea from "./CollectionArea";

export default function BrandForm() {
  const { id } = useParams();
  const { currentBrandList, handleBrandByBrandNameRealtime } = useBrand();
  const [input, setInput] = useState<IsBrand>({
    id: "",
    logo: "",
    brandName: "",
    saleStartDate: "",
    saleEndDate: "",
    description: "",
    officialOnlineStore: {
      image: "",
      storeName: "",
      storeUrl: "",
    },
    officialOfflineStore: [],
    storeList: [],
  });
  const [lastImageUrl, setLastImageUrl] = useState({
    logo: "",
    officialOnlineStoreImage: "",
  });
  const [isEnterButton, setIsEnterButton] = useState(false);

  const onChangeInput = useCallback(
    async (
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      await setInput((prev) => {
        return { ...prev, [name]: value };
      });
    },
    []
  );

  const setImageUrl = useCallback(async (url: string) => {
    await setInput((prev) => {
      return { ...prev, logo: url };
    });
  }, []);

  const onChangeInputSaleDate = useCallback(
    async (name: string, date: Date | [Date | null, Date | null] | null) => {
      const newDate = toStringByFormatting(date);

      await setInput((prev) => {
        return { ...prev, [name]: newDate };
      });
    },
    []
  );

  const onResetInputSaleDate = () => {
    setInput((prev) => {
      return { ...prev, saleStartDate: "", saleEndDate: "" };
    });
  };

  const handleIsEnterButtonToTrue = () => {
    setIsEnterButton(true);
  };

  const handleIsEnterButtonToFalse = () => {
    setIsEnterButton(false);
  };

  // Store Area 0
  const onChangeInputOfficialOnlineStore = useCallback(
    async (
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      await setInput((prev) => {
        return {
          ...prev,
          officialOnlineStore: { ...prev.officialOnlineStore, [name]: value },
        };
      });
    },
    []
  );

  const onChangeInputOfficialOnlineStoreImage = (url: string) => {
    setInput((prev) => ({
      ...prev,
      officialOnlineStore: {
        ...prev.officialOnlineStore,
        image: url,
      },
    }));
  };

  useEffect(() => {
    if (id) {
      handleBrandByBrandNameRealtime(id);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const currentBrand = currentBrandList[0];
      if (!currentBrand) return;
      setInput((prev) => ({
        ...prev,
        id,
        logo: currentBrand.logo,
        brandName: currentBrand.brandName,
        description: currentBrand.description,
        saleStartDate: currentBrand.saleStartDate,
        saleEndDate: currentBrand.saleEndDate,
        officialOnlineStore: {
          image: currentBrand.officialOnlineStore.image,
          storeName: currentBrand.officialOnlineStore.storeName,
          storeUrl: currentBrand.officialOnlineStore.storeUrl,
        },
        officialOfflineStore: currentBrand.officialOfflineStore,
        storeList: currentBrand.storeList,
      }));

      setLastImageUrl({
        logo: currentBrand.logo,
        officialOnlineStoreImage: currentBrand.officialOnlineStore.image,
      });

      setIsEnterButton(() => true);
    }
  }, [currentBrandList, id]);

  return (
    <BrandFormWrap>
      <MainArea
        id={id || ""}
        input={input}
        isEnterButton={isEnterButton}
        lastImageUrl={lastImageUrl.logo}
        onChangeInput={onChangeInput}
        setImageUrl={setImageUrl}
        onChangeInputSaleDate={onChangeInputSaleDate}
        onResetInputSaleDate={onResetInputSaleDate}
        handleIsEnterButtonToTrue={handleIsEnterButtonToTrue}
        handleIsEnterButtonToFalse={handleIsEnterButtonToFalse}
      />
      {id && (
        <>
          <UnderLineBox>STORE</UnderLineBox>
          <StoreArea0
            input={input}
            lastImageUrl={lastImageUrl.officialOnlineStoreImage}
            onChangeInputOfficialOnlineStore={onChangeInputOfficialOnlineStore}
            onChangeInputOfficialOnlineStoreImage={
              onChangeInputOfficialOnlineStoreImage
            }
          />
          <StoreArea1 input={input} />
          <CollectionArea id={id} />
        </>
      )}
    </BrandFormWrap>
  );
}

const BrandFormWrap = styled.div`
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
