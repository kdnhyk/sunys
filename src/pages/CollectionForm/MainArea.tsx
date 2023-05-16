import styled from "styled-components";
import UnderLineBox from "../../common/components/TitleBox";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IsCollection } from "../../types/collection";
import Button from "../../common/components/Button";
import ImgageUploader from "../../common/components/ImageUploader";
import Input from "../../common/components/Input";
import { useCollectionStore } from "../../hooks/firestore/useCollectionStore";
import { useImage } from "../../hooks/storage/useImage";
import ReactDatePicker from "react-datepicker";
import { toStringByFormatting } from "../../util";
import VisibleToggle from "../../common/components/VisibleToggle";
import { IsArticle } from "../../types/article";

interface IsMainWrap {
  currentCollection?: IsCollection;
  articleList?: IsArticle[];
}

export default function MainArea({
  currentCollection,
  articleList,
}: IsMainWrap) {
  const { id, cid } = useParams();

  const { updateCollection, addCollection, deleteCollection } =
    useCollectionStore();
  const { upload, deleteImage } = useImage("collection");
  const nav = useNavigate();

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isUpload, setIsUpload] = useState(false);
  const [isEnterButtonOn, setIsEnterButtonOn] = useState(false);
  const [input, setInput] = useState<IsCollection>({
    id: "",
    collectionName: "",
    releaseDate: "",
    images: [],

    brandName: id || "",

    isVisible: false,
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

  const onChangeInputIsVisible = useCallback(async () => {
    await setInput((prev) => {
      return { ...prev, isVisible: !prev.isVisible };
    });
  }, [input.isVisible]);

  const onSubmit = async () => {
    if (!isEnterButtonOn) return;
    await upload(
      logoFile,
      `${input.brandName}-${input.collectionName}-${input.releaseDate}`,
      setImageUrl
    );
    setIsUpload(true);
  };

  const onDeleteCollection = () => {
    if (!currentCollection?.id) {
      alert("생성중엔 삭제할 수 없습니다");
      return;
    }
    console.log(currentCollection.id);

    // deleteCollection(currentCollection.id);
  };

  // Get CurrentCollection Data
  useEffect(() => {
    if (!currentCollection) return;
    setInput(() => ({
      id: currentCollection.id,
      collectionName: currentCollection.collectionName,
      releaseDate: currentCollection.releaseDate,
      images: currentCollection.images,

      brandName: currentCollection.brandName,

      isVisible: currentCollection.isVisible,
    }));

    setIsEnterButtonOn(() => true);
  }, [id, currentCollection]);

  // Check Confirm Button
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

  // Update & Upload
  useEffect(() => {
    if (isUpload && input.images[0]) {
      if (cid) {
        updateCollection(cid, {
          collectionName: input.collectionName,
          releaseDate: input.releaseDate,
          images: input.images,

          brandName: input.brandName,
          isVisible: input.isVisible,
        });
      } else if (!cid) {
        addCollection({
          collectionName: input.collectionName,
          releaseDate: input.releaseDate,
          images: input.images,

          brandName: input.brandName,
          isVisible: input.isVisible,
        });
      }

      nav(`/brandform/${id}`);
    }
  }, [isUpload]);

  return (
    <MainAreaWrap>
      <div className="InfoWrap">
        {currentCollection?.id && (
          <div className="DeleteWrap">
            <svg
              width="22"
              height="25"
              viewBox="0 0 22 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.61169 22.582C1.61169 23.1788 1.84875 23.7511 2.2707 24.173C2.69266 24.595 3.26496 24.832 3.86169 24.832H17.3617C17.9584 24.832 18.5307 24.595 18.9527 24.173C19.3746 23.7511 19.6117 23.1788 19.6117 22.582V6.83204H1.61169V22.582ZM14.3617 10.582C14.3617 10.3831 14.4407 10.1924 14.5814 10.0517C14.722 9.91105 14.9128 9.83204 15.1117 9.83204C15.3106 9.83204 15.5014 9.91105 15.642 10.0517C15.7827 10.1924 15.8617 10.3831 15.8617 10.582V21.082C15.8617 21.2809 15.7827 21.4717 15.642 21.6124C15.5014 21.753 15.3106 21.832 15.1117 21.832C14.9128 21.832 14.722 21.753 14.5814 21.6124C14.4407 21.4717 14.3617 21.2809 14.3617 21.082V10.582ZM9.86169 10.582C9.86169 10.3831 9.94071 10.1924 10.0814 10.0517C10.222 9.91105 10.4128 9.83204 10.6117 9.83204C10.8106 9.83204 11.0014 9.91105 11.142 10.0517C11.2827 10.1924 11.3617 10.3831 11.3617 10.582V21.082C11.3617 21.2809 11.2827 21.4717 11.142 21.6124C11.0014 21.753 10.8106 21.832 10.6117 21.832C10.4128 21.832 10.222 21.753 10.0814 21.6124C9.94071 21.4717 9.86169 21.2809 9.86169 21.082V10.582ZM5.36169 10.582C5.36169 10.3831 5.44071 10.1924 5.58136 10.0517C5.72202 9.91105 5.91278 9.83204 6.11169 9.83204C6.31061 9.83204 6.50137 9.91105 6.64202 10.0517C6.78267 10.1924 6.86169 10.3831 6.86169 10.582V21.082C6.86169 21.2809 6.78267 21.4717 6.64202 21.6124C6.50137 21.753 6.31061 21.832 6.11169 21.832C5.91278 21.832 5.72202 21.753 5.58136 21.6124C5.44071 21.4717 5.36169 21.2809 5.36169 21.082V10.582ZM20.3617 2.33204H14.7367L14.2961 1.45548C14.2027 1.26808 14.0589 1.11044 13.8809 1.0003C13.7029 0.890162 13.4976 0.831889 13.2883 0.832039H7.93044C7.72156 0.831236 7.51667 0.889292 7.33926 0.999554C7.16184 1.10982 7.01908 1.26782 6.92732 1.45548L6.48669 2.33204H0.861694C0.662782 2.33204 0.472016 2.41106 0.331364 2.55171C0.190712 2.69236 0.111694 2.88313 0.111694 3.08204L0.111694 4.58204C0.111694 4.78095 0.190712 4.97172 0.331364 5.11237C0.472016 5.25302 0.662782 5.33204 0.861694 5.33204H20.3617C20.5606 5.33204 20.7514 5.25302 20.892 5.11237C21.0327 4.97172 21.1117 4.78095 21.1117 4.58204V3.08204C21.1117 2.88313 21.0327 2.69236 20.892 2.55171C20.7514 2.41106 20.5606 2.33204 20.3617 2.33204Z"
                fill="black"
              />
            </svg>
          </div>
        )}

        <VisibleToggle
          isActivated={input.isVisible || false}
          onClick={onChangeInputIsVisible}
        />
        <UnderLineBox isBold={true}>{id}</UnderLineBox>
        <ImgageUploader
          defaultImageUrl={currentCollection?.images[0] || ""}
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
          disabled={!articleList ? false : articleList?.length !== 0}
        />
      </div>

      <Button onClick={onSubmit} isActivated={isEnterButtonOn}>
        CONFIRM
      </Button>
    </MainAreaWrap>
  );
}

const MainAreaWrap = styled.div`
  .DeleteWrap {
    margin-bottom: 16px;
    cursor: pointer;
  }
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
