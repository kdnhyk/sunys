import styled from "styled-components";
import UnderLineBox from "../../common/components/UnderLineBox";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { IsCollection } from "../../types/collection";
import Button from "../../common/components/Button";
import ImgageUploader from "../../common/components/ImageUploader";
import Input from "../../common/components/Input";
import { useCollectionStore } from "../../hooks/firestore/useCollectionStore";
import { useImage } from "../../hooks/storage/useImage";
import ReactDatePicker from "react-datepicker";
import { toStringByFormatting } from "../../util";

interface IsMainWrap {
  currentCollection: IsCollection;
}

export default function MainArea({ currentCollection }: IsMainWrap) {
  const { id, cid } = useParams();

  const { updateCollection, addCollection } = useCollectionStore();
  const { upload, deleteImage } = useImage();
  const nav = useNavigate();

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isUpload, setIsUpload] = useState(false);
  const [isEnterButtonOn, setIsEnterButtonOn] = useState(false);
  const [input, setInput] = useState<IsCollection>({
    id: "",
    collectionName: "",
    releaseDate: "",
    articleList: [],
    images: [],

    brandName: id || "",
  });

  const setImageUrl = useCallback(async (url: string) => {
    await setInput((prev) => {
      return { ...prev, images: [url] };
    });
  }, []);

  const setImageFile = useCallback(async (file: File | null) => {
    await setLogoFile(file);
  }, []);

  const onChange = useCallback(
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

  const onChangeInputReleaseDate = useCallback(
    async (date: Date | [Date | null, Date | null] | null) => {
      const newDate = toStringByFormatting(date);

      await setInput((prev) => {
        return { ...prev, releaseDate: newDate };
      });
    },
    []
  );

  const onSubmit = async () => {
    await upload(logoFile, setImageUrl);
    setIsUpload(true);
  };

  useEffect(() => {
    if (cid) {
      if (!currentCollection) return;
      setInput((prev) => ({
        ...prev,
        id: currentCollection.id,
        collectionName: currentCollection.collectionName,
        releaseDate: currentCollection.releaseDate,
        articleList: currentCollection.articleList,
        images: currentCollection.images,

        brandName: currentCollection.brandName,
      }));

      setIsEnterButtonOn(() => true);
    }
  }, [id, cid]);

  // useEffect(() => {
  //   let result: any[] = [];
  //   collectionList[0]?.articleList.forEach(async (aid) => {
  //     const newArticle = await getArticleById(aid);
  //     result.push(newArticle);
  //   });
  // }, [collectionList]);

  useEffect(() => {
    if (
      input.collectionName &&
      input.releaseDate &&
      (input.images[0] || logoFile)
    ) {
      setIsEnterButtonOn(() => true);
    } else {
      setIsEnterButtonOn(() => false);
    }
  }, [input, logoFile]);

  useEffect(() => {
    if (isUpload && input.images[0]) {
      if (cid) {
        updateCollection(cid, {
          collectionName: input.collectionName,
          releaseDate: input.releaseDate,
          articleList: input.articleList,
          images: input.images,

          brandName: input.brandName,
          isVisible: input.isVisible || false,
        });
      } else if (!cid) {
        addCollection({
          collectionName: input.collectionName,
          releaseDate: input.releaseDate,
          articleList: input.articleList,
          images: input.images,

          brandName: input.brandName,
          isVisible: false,
        });
      }

      if (currentCollection) {
        if (id && currentCollection.images[0] !== input.images[0]) {
          deleteImage(currentCollection.images[0]);
        }
      }

      nav(`/brandform/${id}`);
    }
  }, [isUpload]);

  return (
    <MainAreaWrap>
      <div className="InfoWrap">
        <UnderLineBox isBold={true}>{id}</UnderLineBox>
        <ImgageUploader
          defaultImageUrl={currentCollection.images[0] || ""}
          setImageFile={setImageFile}
        />
        <Input
          name="collectionName"
          value={input.collectionName}
          placeholder="Collection Name"
          onChange={onChange}
          // disabled={id ? true : false}
        />
        <DatePickerWrap
          dateFormat="yyyy / MM / dd"
          selected={
            input.releaseDate ? new Date(input.releaseDate) : new Date()
          }
          onChange={(date) => onChangeInputReleaseDate(date)}
        />
      </div>
      <Button onClick={onSubmit} isActivated={isEnterButtonOn}>
        CONFIRM
      </Button>
    </MainAreaWrap>
  );
}

const MainAreaWrap = styled.div`
  .InfoWrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    margin-bottom: 16px;
    .Text {
      margin-bottom: 6px;
    }
  }
  .ArticleListWrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 20px;
    column-gap: 10px;
    margin-top: 20px;

    @media (min-width: 605px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media (min-width: 885px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    @media (min-width: 1165px) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
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
