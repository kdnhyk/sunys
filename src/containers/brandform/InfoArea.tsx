import styled from "styled-components";
import { IsBrand, IsBrandName, initBrand } from "@/types/brand";
import { ChangeEvent, useEffect, useState } from "react";
import Input from "@/components/Input";
import ImgageUploader from "@/components/ImageUploader";
import Button from "@/components/Button";
import { useImage } from "@/hooks/storage/useImage";
import StoreArea1 from "./StoreArea1";
import { useRouter } from "next/router";
import useMutationBrand from "@/api/brand/useMutationBrand";
import Textarea from "../../components/Textarea";
import useBrandList from "@/api/brandList/useBrandList";

interface IsInfoArea {
  brandName?: string;
  lastBrand?: IsBrand;
}

export default function InfoArea({ brandName, lastBrand }: IsInfoArea) {
  const router = useRouter();
  const { upload } = useImage("logo");
  const { addBrand, updateBrand } = useMutationBrand(brandName || "");
  const { data: brandList, addBrandList } = useBrandList();

  const [currentBrand, setCurrentBrand] = useState<IsBrand>(
    lastBrand || initBrand
  );
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
    if (!brandList) return;

    if (
      currentBrand.brandName &&
      (!brandName
        ? !brandList
            .map((e: IsBrandName) => e.default.toLowerCase())
            .includes(currentBrand.brandName.toLowerCase())
        : true) &&
      currentBrand.brandNameKo &&
      (currentBrand.logo || logoFile)
    ) {
      setIsEnterButton(true);
    } else {
      setIsEnterButton(false);
    }
  }, [brandList, brandName, currentBrand, logoFile]);

  useEffect(() => {
    if (!brandList) return;

    if (isUpload) {
      if (brandName) {
        updateBrand.mutate({
          id: currentBrand.brandName,
          brand: { ...currentBrand },
        });
      } else if (!brandName) {
        addBrand.mutate({
          id: currentBrand.brandName,
          brand: {
            ...currentBrand,
          },
        });

        addBrandList.mutate({
          oldBrandList: brandList,
          newBrand: {
            default: currentBrand.brandName,
            korean: currentBrand.brandNameKo,
          },
        });
      }

      router.push("/brand", undefined, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpload]);

  return (
    <InfoAreaStyle>
      <div className="OfficialButtonWrap">
        <div className="ConfirmButtonWrap">
          <Button
            onClick={onSubmit}
            isBlack={isEnterButton}
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
      <div className="DescriptionWrap">
        <Textarea
          name="description"
          value={currentBrand.description}
          placeholder="Description"
          onChange={onChangeInput}
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

      <div className="StoreWrap">
        {lastBrand && (
          <StoreArea1
            input={lastBrand}
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
      width: 200px;
    }
  }

  .LogoWrap {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    margin-bottom: 50px;
  }

  .DescriptionWrap {
    width: 100%;
    padding: 12px 16px;
  }

  .TitleWrap {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 12px 16px 16px;
    gap: 12px;

    border-bottom: 1px solid #dddddd;
    .BrandName {
    }
    .BrandNameKo {
    }
  }

  .StoreWrap {
    width: 100%;
    padding: 0px 16px;
    border-bottom: 1px solid #dddddd;
  }
`;
