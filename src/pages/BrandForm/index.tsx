import styled from "styled-components";
import MainArea from "./MainArea";
import { useParams } from "react-router-dom";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { IsBrand, initBrand } from "../../types/brand";
import { toStringByFormatting } from "../../util";
import StoreArea1 from "./StoreArea1";
import UnderLineBox from "../../common/components/TitleBox";
import { useBrand } from "../../hooks/useBrand";
import CollectionArea from "./CollectionArea";

export default function BrandForm() {
  const { id } = useParams();
  const { currentBrandList, handleBrandByBrandNameRealtime } = useBrand();
  const [input, setInput] = useState<IsBrand>(initBrand);

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

  const onChangeInputTag = (newTag: string) => {
    setInput((prev) =>
      prev.tag.includes(newTag)
        ? { ...prev, tag: prev.tag.filter((e) => e !== newTag) }
        : { ...prev, tag: prev.tag.concat(newTag) }
    );
  };

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

  useEffect(() => {
    if (id) {
      handleBrandByBrandNameRealtime(id);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const currentBrand = currentBrandList[0];
      if (!currentBrand) return;
      setInput(() => ({
        id,
        logo: currentBrand.logo,
        officialUrl: currentBrand.officialUrl,
        brandName: currentBrand.brandName,
        brandNameKo: currentBrand.brandNameKo,
        description: currentBrand.description,
        tag: currentBrand.tag,
        saleName: currentBrand.saleName,
        saleStartDate: currentBrand.saleStartDate,
        saleEndDate: currentBrand.saleEndDate,
        officialStoreList: currentBrand.officialStoreList,
        storeList: currentBrand.storeList,
      }));

      setIsEnterButton(() => true);
    }
  }, [currentBrandList, id]);

  return (
    <BrandFormWrap>
      <MainArea
        id={id || ""}
        input={input}
        isEnterButton={isEnterButton}
        onChangeInput={onChangeInput}
        onChangeInputTag={onChangeInputTag}
        setImageUrl={setImageUrl}
        onChangeInputSaleDate={onChangeInputSaleDate}
        onResetInputSaleDate={onResetInputSaleDate}
        handleIsEnterButtonToTrue={handleIsEnterButtonToTrue}
        handleIsEnterButtonToFalse={handleIsEnterButtonToFalse}
      />
      {id && (
        <>
          <UnderLineBox>STORE</UnderLineBox>
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
