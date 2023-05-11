import styled from "styled-components";
import Input from "../../../common/components/Input";
import { ChangeEvent, useEffect, useState } from "react";
import ImgageUploader from "../../../common/components/ImageUploader";
import Button from "../../../common/components/Button";
import { useImage } from "../../../hooks/storage/useImage";
import { useBrandStore } from "../../../hooks/firestore/useBrandStore";
import { IsBrand } from "../../../types/brand";

interface IsWindowModal0 {
  exitModal: () => void;
  input: IsBrand;
  lastImageUrl: string;
  onChangeInput: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onChangeInputOfficialOnlineStoreImage: (url: string) => void;
}

export default function WindowModal0({
  exitModal,
  input,
  lastImageUrl,
  onChangeInput,
  onChangeInputOfficialOnlineStoreImage,
}: IsWindowModal0) {
  const [image, setImage] = useState<File | null>(null);
  const [isEnterButton, setIsEnterButton] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  const { upload, deleteImage } = useImage();
  const { updateBrand } = useBrandStore();

  const setImageFile = (file: File | null) => {
    setImage(() => file);
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isEnterButton) return;

    await upload(image, onChangeInputOfficialOnlineStoreImage);
    setIsUpload(true);
  };

  useEffect(() => {
    if (input.officialOnlineStore.storeUrl) {
      setIsEnterButton(() => true);
    } else {
      setIsEnterButton(() => false);
    }
  }, [input]);

  useEffect(() => {
    if (input.id && isUpload) {
      updateBrand(input.id, {
        ...input,
        officialOnlineStore: input.officialOnlineStore,
      });

      if (input.officialOnlineStore.image !== lastImageUrl) {
        deleteImage(lastImageUrl);
      }

      exitModal();
    }
  }, [isUpload]);

  return (
    <WindowModal0Block>
      <div className="HeaderWrap">
        <h2>Official Store</h2>
        <div className="ButtonWrap">
          <div></div>
          <div></div>
          <div className="CloseBtn" onClick={exitModal}></div>
        </div>
      </div>
      <div className="MainWrap">
        <div className="ImageWrap">
          <ImgageUploader
            defaultImageUrl={input.officialOnlineStore.image}
            setImageFile={setImageFile}
          />
        </div>
        <Input
          name="storeName"
          value={input?.officialOnlineStore.storeName || ""}
          onChange={onChangeInput}
          placeholder="Store Name"
        />
        <Input
          name="storeUrl"
          value={input.officialOnlineStore.storeUrl}
          onChange={onChangeInput}
          placeholder="Store Url"
        />

        <Button onClick={onSubmit} isActivated={isEnterButton}>
          CONFIRM
        </Button>
      </div>
      <div className="Background" onClick={exitModal}></div>
    </WindowModal0Block>
  );
}
const WindowModal0Block = styled.form`
  position: relative;
  width: 300px;
  position: fixed;
  left: calc(50% - 150px);
  top: calc(50% - 150px - 50px);
  background-color: #eeeeee;

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
    background-color: #eeeeee;
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
    background-color: #eeeeee;
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
