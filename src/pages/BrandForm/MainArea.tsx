import styled from "styled-components";
import UnderLineBox from "../../common/components/TitleBox";
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
import Toggle from "../../common/components/SaleToggle";
import { useBrandListStore } from "../../hooks/firestore/useBrandListStore";
import { useBrandList } from "../../hooks/useBrandList";
import useLocationState from "../../hooks/useLocationState";

export type IsModalSort =
  | "officialOnlineStore"
  | "officialStoreList"
  | "storeList";

interface IsMainArea {
  id: string;
  input: IsBrand;
  isEnterButton: boolean;
  onChangeInput: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => Promise<void>;
  onChangeInputTag: (newTag: string) => void;
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
  isEnterButton,
  onChangeInput,
  onChangeInputTag,
  setImageUrl,
  onChangeInputSaleDate,
  onResetInputSaleDate,
  handleIsEnterButtonToTrue,
  handleIsEnterButtonToFalse,
}: IsMainArea) {
  const { onClickBarndByBrandName } = useLocationState();
  const { upload, deleteImage } = useImage("logo");
  const { addBrand, updateBrand } = useBrandStore();
  const { addBrandToList } = useBrandListStore();
  const { brandList } = useBrandList();

  const [tagInput, setTagInput] = useState<string>("");
  const [isUpload, setIsUpload] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isSale, setIsSale] = useState(
    input.saleEndDate && input.saleStartDate ? true : false
  );

  const onChangeTagInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTagInput(() => e.target.value);
  };

  const setImageFile = useCallback(async (file: File | null) => {
    await setLogoFile(file);
  }, []);

  const onSubmit = async () => {
    await upload(logoFile, input.brandName, setImageUrl);
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
        updateBrand(id, {
          logo: input.logo,
          officialUrl: input.officialUrl,
          brandName: input.brandName,
          brandNameKo: input.brandNameKo,
          tag: input.tag,
          description: input.description,
          saleName: input.saleName,
          saleStartDate: input.saleStartDate,
          saleEndDate: input.saleEndDate,
          officialStoreList: input.officialStoreList,
          storeList: input.storeList,
        });
      } else if (!id) {
        addBrand(input.brandName, {
          logo: input.logo,
          officialUrl: input.officialUrl,
          brandName: input.brandName,
          brandNameKo: input.brandNameKo,
          tag: input.tag,
          description: input.description,
          saleName: input.saleName,
          saleStartDate: input.saleStartDate,
          saleEndDate: input.saleEndDate,

          officialStoreList: input.officialStoreList,
          storeList: input.storeList,
          isVisible: true,
        });
      }

      if (brandList.filter((e) => e.default === input.brandName).length === 0) {
        addBrandToList(brandList, {
          default: input.brandName,
          korean: input.brandNameKo,
        });
      }

      onClickBarndByBrandName(input.brandName);
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
          name="officialUrl"
          value={input.officialUrl}
          placeholder="Official Url"
          onChange={onChangeInput}
        />
        <Input
          name="brandName"
          value={input.brandName}
          placeholder="Brand Name"
          onChange={onChangeInput}
          disabled={id ? true : false}
        />
        <Input
          name="brandNameKo"
          value={input.brandNameKo}
          placeholder="Brand Name Korean"
          onChange={onChangeInput}
          disabled={id ? true : false}
        />
      </div>
      <div className="DescriptionWrap">
        <div className="TagInputWrap">
          <Input
            name="tagInput"
            value={tagInput}
            placeholder="Tag"
            onChange={onChangeTagInput}
          />
          <Button
            onClick={() => onChangeInputTag(tagInput)}
            isActivated={!input.tag.includes(tagInput)}
            disable={input.tag.includes(tagInput)}
          >
            +
          </Button>
        </div>
        <div className="TagWrap">
          {input.tag.map((e, i) => (
            <div key={i} onClick={() => onChangeInputTag(e)}>
              <p>{e}</p>
            </div>
          ))}
        </div>

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
        {isSale && (
          <Input
            name="saleName"
            value={input.saleName}
            placeholder="Sale Name"
            onChange={onChangeInput}
          />
        )}
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
    display: flex;
    flex-direction: column;
    gap: 16px;

    .TagInputWrap {
      display: flex;
      gap: 12px;
    }
    .TagWrap {
      display: flex;
      gap: 8px;
      div {
        width: fit-content;
        background-color: black;
        color: white;
        padding: 6px 12px;
        border-radius: 12px;
        cursor: pointer;
      }
    }
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
