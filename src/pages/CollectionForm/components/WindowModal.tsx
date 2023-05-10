import styled from "styled-components";
import Input from "../../../common/components/Input";
import { ChangeEvent, useEffect, useState } from "react";
import ImgageUploader from "../../../common/components/ImageUploader";
import Button from "../../../common/components/Button";
import { useImage } from "../../../hooks/storage/useImage";
import { IsArticle } from "../../../types/article";
import { IsCollection } from "../../../types/collection";
import { useArticleStore } from "../../../hooks/firestore/useArticleStore";

interface IsWindowModal {
  exitModal: () => void;
  currentCollection: IsCollection | undefined;
  addInputArticleList: any;
  handleIsUpload: any;
  input: IsArticle;
  setInput: React.Dispatch<React.SetStateAction<IsArticle>>;
  onChangeInput: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

export default function WindowModal({
  exitModal,
  currentCollection,
  addInputArticleList,
  input,
  handleIsUpload,
  setInput,
  onChangeInput,
}: IsWindowModal) {
  const [image, setImage] = useState<File | null>(null);
  const [isEnterButtonOn, setIsEnterButtonOn] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  const { upload, deleteImage } = useImage();
  const { addDocument, updateDocument } = useArticleStore();

  const setImageUrl = (url: string) => {
    setInput((prev) => ({
      ...prev,
      images: [...prev.images, url],
    }));
  };

  const setImageFile = (file: File | null) => {
    setImage(() => file);
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isEnterButtonOn) return;

    await upload(image, setImageUrl);
    setIsUpload(true);
  };

  useEffect(() => {
    if (input.articleName && input.price) {
      setIsEnterButtonOn(() => true);
    } else {
      setIsEnterButtonOn(() => false);
    }
  }, [input]);

  useEffect(() => {
    if (isUpload) {
      addDocument({
        ...input,
      }).then((id) => {
        addInputArticleList(id);
        handleIsUpload();
      });

      // if (currentCollection) {
      //   if (currentCollection.images[0] !== input.images[0]) {
      //     deleteImage(currentCollection.images[0]);
      //   }
      // }

      exitModal();
    }
  }, [isUpload]);

  return (
    <WindowModalBlock>
      <div className="HeaderWrap">
        <h2>Article</h2>
        <div className="ButtonWrap">
          <div></div>
          <div></div>
          <div className="CloseBtn" onClick={exitModal}></div>
        </div>
      </div>
      <div className="MainWrap">
        <div className="ImageWrap">
          <ImgageUploader
            defaultImageUrl={input.images[0]}
            setImageFile={setImageFile}
          />
        </div>
        <Input
          name="articleName"
          value={input.articleName}
          onChange={onChangeInput}
          placeholder="Article Name"
        />
        <Input
          name="price"
          value={input.price}
          onChange={onChangeInput}
          placeholder="Price"
        />

        <Button onClick={onSubmit} isActivated={isEnterButtonOn}>
          CONFIRM
        </Button>
      </div>
      <div className="Background" onClick={exitModal}></div>
    </WindowModalBlock>
  );
}
const WindowModalBlock = styled.form`
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
