import styled from "styled-components";
import { IsBrand, initBrand } from "@/types/brand";
import { ChangeEvent, useEffect, useState } from "react";
import Input from "@/components/Input";
import ImgageUploader from "@/components/ImageUploader";
import { toCheckDateFormmat, toStringByFormatting } from "@/util";
import Button from "@/components/Button";
import { useImage } from "@/hooks/storage/useImage";
import StoreArea1 from "./StoreArea1";
import useBrand from "@/api/useBrand";
import { useRouter } from "next/router";
import useMutationBrand from "@/api/useMutationBrand";
import useBrandList from "@/api/useBrandList";

interface IsInfoArea {
  brandName?: string;
}

export default function InfoArea({ brandName }: IsInfoArea) {
  const router = useRouter();
  const { data, isLoading } = useBrand(brandName || "");
  const { upload } = useImage("logo");
  const { updateBrand } = useMutationBrand(brandName || "");
  const { data: brandList, addBrandList } = useBrandList();

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

  const onSubmit = async () => {
    await upload(logoFile, currentBrand.brandName, setImageUrl);
    setIsUpload(true);
  };

  useEffect(() => {
    if (!data) return;

    setCurrentBrand(() => ({
      logo: data.logo,
      officialUrl: data.officialUrl,
      brandName: data.brandName,
      brandNameKo: data.brandNameKo,
      tag: data.tag,
      scrapNum: data.scrapNum || 0,
      description: data.description,
      saleName: data.saleName,
      saleStartDate: data.saleStartDate,
      saleEndDate: data.saleEndDate,
      officialStoreList: data.officialStoreList,
      storeList: data.storeList,
    }));
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        currentBrand.brandName &&
        currentBrand.brandNameKo &&
        (currentBrand.logo || logoFile)
      ) {
        setIsEnterButton(true);
      } else {
        setIsEnterButton(false);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [currentBrand, logoFile]);

  useEffect(() => {
    console.log("upload");
    if (isUpload) {
      updateBrand.mutate({
        id: currentBrand.brandName,
        brand: {
          logo: currentBrand.logo,
          officialUrl: currentBrand.officialUrl,
          brandName: currentBrand.brandName,
          brandNameKo: currentBrand.brandNameKo,
          tag: currentBrand.tag,
          scrapNum: currentBrand.scrapNum,
          description: currentBrand.description,
          saleName: currentBrand.saleName,
          saleStartDate: currentBrand.saleName
            ? currentBrand.saleStartDate
            : "",
          saleEndDate: currentBrand.saleName ? currentBrand.saleEndDate : "",
          officialStoreList: currentBrand.officialStoreList,
          storeList: currentBrand.storeList,
        },
      });

      updateBrand.mutate({
        id: currentBrand.brandName,
        brand: {
          logo: currentBrand.logo,
          officialUrl: currentBrand.officialUrl,
          brandName: currentBrand.brandName,
          brandNameKo: currentBrand.brandNameKo,
          tag: currentBrand.tag,
          scrapNum: currentBrand.scrapNum,
          description: currentBrand.description,
          saleName: currentBrand.saleName,
          saleStartDate: currentBrand.saleName
            ? currentBrand.saleStartDate
            : "",
          saleEndDate: currentBrand.saleName ? currentBrand.saleEndDate : "",
          officialStoreList: currentBrand.officialStoreList,
          storeList: currentBrand.storeList,
        },
      });

      addBrandList.mutate({
        oldBrandList: brandList,
        newBrand: {
          default: currentBrand.brandName,
          korean: currentBrand.brandNameKo,
        },
      });

      router.push("/brand", undefined, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpload]);

  if (brandName && isLoading) {
    return <div></div>;
  }

  console.log(toCheckDateFormmat("20020020"));

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
            disabled={brandName ? true : false}
          />
        </div>
        <div className="BrandNameKo">
          <Input
            name="brandNameKo"
            value={currentBrand.brandNameKo}
            placeholder="Brand Name Korean"
            onChange={onChangeInput}
            disabled={brandName ? true : false}
          />
        </div>
      </div>

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
            <Input
              name="saleStartDate"
              value={currentBrand.saleStartDate}
              placeholder="Sale Start Date"
              onChange={onChangeInput}
              disabled={!currentBrand.saleName ? true : false}
            />
            <Input
              name="saleEndDate"
              value={currentBrand.saleEndDate}
              placeholder="Sale End Date"
              onChange={onChangeInput}
              disabled={!currentBrand.saleName ? true : false}
            />
        </div>
      </div>

      <div className="StoreWrap">
        {data && (
          <StoreArea1
            input={data}
            onRemoveInputOfficialStore={onRemoveInputOfficialStore}
          />
        )}
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
