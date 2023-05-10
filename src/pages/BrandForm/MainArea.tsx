import styled from "styled-components";
import UnderLineBox from "../../common/components/UnderLineBox";
import Input from "../../common/components/Input";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import ImgageUploader from "../../common/components/ImageUploader";
import Button from "../../common/components/Button";
import Textarea from "../../common/components/Textarea";
import { IsBrand } from "../../types/brand";
import { useImage } from "../../hooks/storage/useImage";
import { useBrandStore } from "../../hooks/firestore/useBrandStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Toggle from "./components/Toggle";

export type IsModalSort =
  | "officialOnlineStore"
  | "officialOfflineStore"
  | "storeList";

interface IsMainArea {
  id: string;
  input: IsBrand;
  lastImageUrl: string;
  isEnterButton: boolean;
  onChangeInput: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => Promise<void>;
  setImageUrl: (url: string) => Promise<void>;
  onChangeInputSaleDate: (
    name: string,
    date: Date | [Date | null, Date | null] | null
  ) => Promise<void>;
  onResetInputSaleDate: () => void;
  handleIsEnterButtonToTrue: () => void;
  handleIsEnterButtonToFalse: () => void;
}

export default function MainArea({
  id,
  input,
  lastImageUrl,
  isEnterButton,
  onChangeInput,
  setImageUrl,
  onChangeInputSaleDate,
  onResetInputSaleDate,
  handleIsEnterButtonToTrue,
  handleIsEnterButtonToFalse,
}: IsMainArea) {
  const { upload, deleteImage } = useImage();
  const { addDocument, updateDocument } = useBrandStore();

  const [isUpload, setIsUpload] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isSale, setIsSale] = useState(input.saleEndDate ? true : false);

  const setImageFile = useCallback(async (file: File | null) => {
    await setLogoFile(file);
  }, []);

  const onSubmit = async () => {
    await upload(logoFile, setImageUrl);
    setIsUpload(true);
  };

  const handleIsSale = () => {
    if (isSale) {
      onResetInputSaleDate();
    }
    setIsSale((prev) => !prev);
  };

  useEffect(() => {
    if (
      input.brandName &&
      input.description &&
      (input.logo || logoFile) &&
      (isSale ? input.saleStartDate && input.saleEndDate : true)
    ) {
      if (
        (input.saleStartDate && input.saleEndDate) ||
        (!input.saleStartDate && !input.saleEndDate)
      ) {
        handleIsEnterButtonToTrue();
      }
    } else {
      handleIsEnterButtonToFalse();
    }
  }, [input, isSale, logoFile]);

  useEffect(() => {
    if (isUpload && input.logo) {
      if (id) {
        updateDocument(id, {
          logo: input.logo,
          brandName: input.brandName,
          description: input.description,
          saleStartDate: input.saleStartDate,
          saleEndDate: input.saleEndDate,
          officialOnlineStore: {
            image: input.officialOnlineStore.image,
            storeName: input.officialOnlineStore.storeName,
            storeUrl: input.officialOnlineStore.storeUrl,
          },
          officialOfflineStore: input.officialOfflineStore,
          storeList: input.storeList,
        });
      } else if (!id) {
        addDocument(input.brandName, {
          logo: input.logo,
          brandName: input.brandName,
          description: input.description,
          saleStartDate: input.saleStartDate,
          saleEndDate: input.saleEndDate,
          officialOnlineStore: {
            image: input.officialOnlineStore.image,
            storeName: input.officialOnlineStore.storeName,
            storeUrl: input.officialOnlineStore.storeUrl,
          },
          officialOfflineStore: input.officialOfflineStore,
          storeList: input.storeList,
          isVisible: true,
        });
      }

      if (id && input.logo !== lastImageUrl) {
        deleteImage(lastImageUrl);
      }

      alert("수정완료");

      // nav("/brand");
    }
  }, [isUpload]);

  return (
    <MainAreaWrap>
      <div className="TitleWrap">
        <ImgageUploader
          defaultImageUrl={input.logo}
          setImageFile={setImageFile}
        />
        <Input
          name="brandName"
          value={input.brandName}
          placeholder="Brand Name"
          onChange={onChangeInput}
          disabled={id ? true : false}
        />
      </div>
      <div className="DescriptionWrap">
        <Textarea
          name="description"
          value={input.description}
          placeholder="Description"
          onChange={onChangeInput}
          isActivated={false}
        />
      </div>
      <div className="SaleHeader">
        <UnderLineBox color="#F33131">SALE</UnderLineBox>
        <div className="ToggleWrap">
          <Toggle isActivated={isSale} onClick={handleIsSale} />
        </div>
      </div>
      <div className="SaleWrap">
        {isSale && (
          <>
            <DatePickerWrap
              dateFormat="yyyy / MM / dd"
              selectsStart
              selected={
                input.saleStartDate ? new Date(input.saleStartDate) : new Date()
              }
              onChange={(date) => onChangeInputSaleDate("saleStartDate", date)}
              startDate={
                input.saleStartDate ? new Date(input.saleStartDate) : new Date()
              }
              endDate={
                input.saleEndDate ? new Date(input.saleEndDate) : new Date()
              }
            />
            <DatePickerWrap
              dateFormat="yyyy / MM / dd"
              selectsEnd
              selected={
                input.saleEndDate ? new Date(input.saleEndDate) : new Date()
              }
              onChange={(date) => onChangeInputSaleDate("saleEndDate", date)}
              startDate={
                input.saleStartDate ? new Date(input.saleStartDate) : new Date()
              }
              endDate={
                input.saleEndDate ? new Date(input.saleEndDate) : new Date()
              }
            />
          </>
        )}
      </div>
      <Button onClick={onSubmit} isActivated={isEnterButton}>
        CONFIRM
      </Button>
    </MainAreaWrap>
  );
}

const MainAreaWrap = styled.div`
  display: flex;
  flex-direction: column;
  .TitleWrap {
    display: flex;
    gap: 16px;
    flex-direction: column;
    align-items: center;
    width: 200px;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .DescriptionWrap {
    margin-bottom: 16px;
  }
  .SaleHeader {
    position: relative;
    .ToggleWrap {
      position: absolute;
      right: 0px;
      top: 8px;
    }
  }
  .SaleWrap {
    width: 100%;
    height: 60px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    // DatePicker
  }
`;

const DatePickerWrap = styled(DatePicker)`
  height: 40px;
  width: 100%;
  padding: 0px 12px;
  background-color: transparent;
  border-bottom: 1px solid grey;
  cursor: pointer;
`;
