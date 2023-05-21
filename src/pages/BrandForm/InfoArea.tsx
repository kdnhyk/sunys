import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { IsBrand, initBrand } from "../../types/brand";
import { ChangeEvent, useEffect, useState } from "react";
import { useBrandStore } from "../../hooks/firestore/useBrandStore";
import Input from "../../common/components/Input";
import ImgageUploader from "../../common/components/ImageUploader";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toStringByFormatting } from "../../util";
import Button from "../../common/components/Button";
import { useImage } from "../../hooks/storage/useImage";
import { useBrandListStore } from "../../hooks/firestore/useBrandListStore";
import { useBrandList } from "../../hooks/useBrandList";
import useLocationState from "../../hooks/useLocationState";
import StoreArea1 from "./StoreArea1";

export default function InfoArea() {
  const { id } = useParams();
  const { brand } = useLocation().state;
  const { upload } = useImage("logo");
  const { addBrand, updateBrand } = useBrandStore();
  const { addBrandToList } = useBrandListStore();
  const { brandList } = useBrandList();
  const { onClickBarnd } = useLocationState();

  const [currentBrand, setCurrentBrand] = useState<IsBrand>(initBrand);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isEnterButton, setIsEnterButton] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  

  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentBrand((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const setImageUrl = (url: string) => {
    setCurrentBrand((prev) => {
      return { ...prev, logo: url };
    });
  };

  const setImageFile = async (file: File | null) => {
    await setLogoFile(file);
  };

  const onResetInputSaleDate = () => {
    setCurrentBrand((prev) => {
      return { ...prev, saleStartDate: "", saleEndDate: "" };
    });
  };

  const onChangeInputSaleDate = async (
    name: string,
    date: Date | [Date | null, Date | null] | null
  ) => {
    const newDate = toStringByFormatting(date);

    await setCurrentBrand((prev) => {
      return { ...prev, [name]: newDate };
    });
  };

  const onRemoveInputOfficialStore = (id: string) => {
    setCurrentBrand((prev) => {
      return {
        ...prev,
        officialStoreList: prev.officialStoreList.filter((e) => e.id !== id),
      };
    });
  };
  console.log(currentBrand.officialStoreList);

  const onSubmit = async () => {
    await upload(logoFile, currentBrand.brandName, setImageUrl);
    setIsUpload(true);
  };

  useEffect(() => {
    if (brand.brandName) {
      setCurrentBrand(() => ({
        logo: brand.logo,
        officialUrl: brand.officialUrl,
        brandName: brand.brandName,
        brandNameKo: brand.brandNameKo,
        tag: brand.tag,
        scrapNum: brand.scrapNum || 0,
        description: brand.description,
        saleName: brand.saleName,
        saleStartDate: brand.saleStartDate,
        saleEndDate: brand.saleEndDate,
        officialStoreList: brand.officialStoreList,
        storeList: brand.storeList,
      }));
    }
  }, []);

  useEffect(() => {
    if (
      currentBrand.brandName &&
      currentBrand.brandNameKo &&
      (currentBrand.logo || logoFile)
    ) {
      setIsEnterButton(true);
    } else {
      setIsEnterButton(false);
    }
  }, [currentBrand, logoFile]);

  useEffect(() => {
    if (isUpload && currentBrand.logo) {
      if (id) {
        updateBrand(id, {
          logo: currentBrand.logo,
          officialUrl: currentBrand.officialUrl,
          brandName: currentBrand.brandName,
          brandNameKo: currentBrand.brandNameKo,
          tag: currentBrand.tag,
          scrapNum: brand.scrapNum || 0,
          description: currentBrand.description,
          saleName: currentBrand.saleName,
          saleStartDate: currentBrand.saleName
            ? currentBrand.saleStartDate
            : "",
          saleEndDate: currentBrand.saleName ? currentBrand.saleEndDate : "",
          officialStoreList: currentBrand.officialStoreList,
          storeList: currentBrand.storeList,
        });
      } else if (!id) {
        addBrand(currentBrand.brandName, {
          logo: currentBrand.logo,
          officialUrl: currentBrand.officialUrl,
          brandName: currentBrand.brandName,
          brandNameKo: currentBrand.brandNameKo,
          tag: currentBrand.tag,
          scrapNum: brand.scrapNum || 0,
          description: currentBrand.description,
          saleName: currentBrand.saleName,
          saleStartDate: currentBrand.saleName
            ? currentBrand.saleStartDate
            : "",
          saleEndDate: currentBrand.saleName ? currentBrand.saleEndDate : "",
          officialStoreList: currentBrand.officialStoreList,
          storeList: currentBrand.storeList,
          isVisible: true,
        });
      }

      // 새로운 브랜드만 리스트에 추가
      if (
        brandList.filter((e) => e.default === currentBrand.brandName).length ===
        0
      ) {
        addBrandToList(brandList, {
          default: currentBrand.brandName,
          korean: currentBrand.brandNameKo,
        });
      }

      onClickBarnd(currentBrand);
    }
  }, [isUpload]);

  return (
    <InfoAreaStyle>
      <div className="OfficialButtonWrap">
        <div className="ConfirmButtonWrap">
          <Button
            onClick={onSubmit}
            isActivated={isEnterButton}
            disable={!isEnterButton}
          >
            CONFIRM
          </Button>
        </div>
        <div className="OfficialUrlWrap">
          <Input
            name="officialUrl"
            value={currentBrand.officialUrl}
            placeholder="Official Url"
            onChange={onChangeInput}
          />
        </div>
      </div>
      <div className="LogoWrap">
        <ImgageUploader
          defaultImageUrl={currentBrand.logo}
          setImageFile={setImageFile}
        />
      </div>
      <div className="TitleWrap">
        <div className="BrandName">
          <Input
            name="brandName"
            value={currentBrand.brandName}
            placeholder="Brand Name"
            onChange={onChangeInput}
            disabled={id ? true : false}
          />
        </div>
        <div className="BrandNameKo">
          <Input
            name="brandNameKo"
            value={currentBrand.brandNameKo}
            placeholder="Brand Name Korean"
            onChange={onChangeInput}
            disabled={id ? true : false}
          />
        </div>
      </div>
      {currentBrand.saleStartDate && currentBrand.saleEndDate && (
        <div className="SaleWrap">
          <div className="SaleNameWrap">
            <Input
              name="saleName"
              value={currentBrand.saleName}
              placeholder="Sale Name"
              onChange={onChangeInput}
            />
          </div>

          <div className="SaleDatePickerWrap">
            {currentBrand.saleName && (
              <>
                <DatePickerWrap
                  dateFormat="yyyy / MM / dd"
                  selectsStart
                  selected={
                    currentBrand.saleStartDate
                      ? new Date(currentBrand.saleStartDate)
                      : new Date()
                  }
                  onChange={(date) =>
                    onChangeInputSaleDate("saleStartDate", date)
                  }
                  startDate={
                    currentBrand.saleStartDate
                      ? new Date(currentBrand.saleStartDate)
                      : new Date()
                  }
                  endDate={
                    currentBrand.saleEndDate
                      ? new Date(currentBrand.saleEndDate)
                      : new Date()
                  }
                />
                <DatePickerWrap
                  dateFormat="yyyy / MM / dd"
                  selectsEnd
                  selected={
                    currentBrand.saleEndDate
                      ? new Date(currentBrand.saleEndDate)
                      : new Date()
                  }
                  onChange={(date) =>
                    onChangeInputSaleDate("saleEndDate", date)
                  }
                  startDate={
                    currentBrand.saleStartDate
                      ? new Date(currentBrand.saleStartDate)
                      : new Date()
                  }
                  endDate={
                    currentBrand.saleEndDate
                      ? new Date(currentBrand.saleEndDate)
                      : new Date()
                  }
                />
              </>
            )}
          </div>
        </div>
      )}
      <div className="StoreWrap">
        <StoreArea1
          input={currentBrand}
          onRemoveInputOfficialStore={onRemoveInputOfficialStore}
        />
      </div>
    </InfoAreaStyle>
  );
}

const InfoAreaStyle = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: end;

  .OfficialButtonWrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 12px;
    margin-bottom: 40px;
    .ConfirmButtonWrap {
      width: 120px;
    }
    .OfficialUrlWrap {
    }
  }

  .LogoWrap {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    margin-bottom: 50px;
  }

  .TitleWrap {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 12px 16px 16px;

    border-bottom: 1px solid #dddddd;
    .BrandName {
      //
    }
    .BrandNameKo {
      //
    }
  }
  .SaleWrap {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 12px;
    justify-content: center;
    padding: 12px 16px;
    margin-bottom: 20px;
    border-bottom: 1px solid #dddddd;

    .SaleNameWrap {
    }

    .SaleDatePickerWrap {
      display: flex;
      justify-content: space-between;
      gap: 12px;
    }
  }

  .StoreWrap {
    width: 100%;
    padding: 0px 16px;
    border-bottom: 1px solid #dddddd;
  }
`;

const DatePickerWrap = styled(ReactDatePicker)`
  height: 40px;
  width: 100%;
  padding: 0px 12px;
  background-color: transparent;
  border-bottom: 1px solid grey;
  cursor: pointer;
`;
