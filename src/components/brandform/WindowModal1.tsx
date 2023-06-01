import styled from "styled-components";
import Input from "../Input";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import ImgageUploader from "../ImageUploader";
import Button from "../Button";
import { useImage } from "../../hooks/storage/useImage";
import { IsBrand, IsOfficialStore } from "../../types/brand";
import useMutationBrand from "@/api/brand/useMutationBrand";

interface IsWindowModal1 {
  exitModal: () => void;
  input: IsBrand;
}

export default function WindowModal1({ exitModal, input }: IsWindowModal1) {
  const [newStore, setNewStore] = useState<IsOfficialStore>({
    image: "",
    storeName: "",
    storeLocation: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [isEnterButton, setIsEnterButton] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  const { upload } = useImage("brandstore");
  const { updateBrand } = useMutationBrand(input.brandName);

  const onChangeInput = async (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    await setNewStore((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const setImageUrl = (url: string) => {
    setNewStore((prev) => {
      return { ...prev, image: url };
    });
  };

  const setImageFile = (file: File | null) => {
    setImage(() => file);
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isEnterButton) return;

    await upload(
      image,
      `${input.brandName}-${newStore.storeName}`,
      setImageUrl
    );
    setIsUpload(true);
  };

  const uploadBrand = useCallback(() => {
    if (input.brandName && isUpload) {
      updateBrand.mutate({
        id: input.brandName,
        brand: {
          ...input,
          officialStoreList: [
            ...input.officialStoreList,
            { ...newStore, id: newStore.storeName },
          ],
        },
      });

      exitModal();
    }
  }, [exitModal, input, isUpload, newStore, updateBrand]);

  useEffect(() => {
    if (newStore.storeName && newStore.storeLocation) {
      setIsEnterButton(() => true);
    } else {
      setIsEnterButton(() => false);
    }
  }, [newStore]);

  useEffect(() => {
    uploadBrand();
  }, [uploadBrand]);

  return (
    <WindowModal1Block>
      <div className="HeaderWrap">
        <h2>Offline Store</h2>
        <div className="ButtonWrap">
          <div></div>
          <div></div>
          <div className="CloseBtn" onClick={exitModal}></div>
        </div>
      </div>
      <div className="MainWrap">
        <div className="ImageWrap">
          <ImgageUploader
            defaultImageUrl={newStore.image}
            setImageFile={setImageFile}
          />
        </div>
        <Input
          name="storeName"
          value={newStore.storeName}
          onChange={onChangeInput}
          placeholder="Store Name"
        />
        <Input
          name="storeLocation"
          value={newStore.storeLocation}
          onChange={onChangeInput}
          placeholder="Store Locatioin"
        />

        <Button onClick={onSubmit} isActivated={isEnterButton}>
          CONFIRM
        </Button>
      </div>
      <div className="Background" onClick={exitModal}></div>
    </WindowModal1Block>
  );
}
const WindowModal1Block = styled.form`
  position: relative;
  width: 300px;
  position: fixed;
  left: calc(50% - 150px);
  top: calc(50% - 150px - 50px);
  background-color: #fcfcfc;

  display: flex;
  flex-direction: column;
  justify-content: center;

  border-width: 1px 1px 1px 1px;
  border-color: grey;
  border-style: solid;

  z-index: 10;

  .HeaderWrap {
    padding: 10px 10px 10px 16px;
    border-bottom: 1px solid grey;
    display: flex;
    justify-content: space-between;
    background-color: #fcfcfc;
    z-index: 10;
    h2 {
      font-weight: 400;
    }
    .ButtonWrap {
      display: flex;
      align-items: center;
      gap: 6px;
      div {
        width: 12px;
        height: 12px;
        background-color: #666666;
        border-radius: 20px;
      }
      .CloseBtn {
        background-color: #f35e5e;
        cursor: pointer;
      }
    }
  }

  .MainWrap {
    padding: 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #fcfcfc;
    z-index: 10;
    .ImageWrap {
      /* border: 1px solid white; */
    }
    .DetailWrap {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }
  }

  .Background {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
`;
