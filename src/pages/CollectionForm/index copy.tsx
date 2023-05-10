import styled from "styled-components";
import UnderLineBox from "../../common/components/UnderLineBox";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import CreateArticle from "./components/CreateArticle";
import { useNavigate, useParams } from "react-router-dom";
import WindowModal from "./components/WindowModal";
import { IsArticle } from "../../types/article";
import { useCollection } from "../../hooks/useCollection";
import { IsCollection } from "../../types/collection";
import Button from "../../common/components/Button";
import { useArticle } from "../../hooks/useArticle";
import ImgageUploader from "../../common/components/ImageUploader";
import Input from "../../common/components/Input";
import { useCollectionStore } from "../../hooks/firestore/useCollectionStore";
import { useImage } from "../../hooks/storage/useImage";
import Article from "./components/Article";
import { useBrandStore } from "../../hooks/firestore/useBrandStore";

export default function CollectionForm() {
  const { id, cid } = useParams();
  const { getBrandByBrandName } = useBrandStore();
  const { collectionList, handleRealTimeCollectionById } = useCollection();
  const { updateDocument, addDocument } = useCollectionStore();
  const { getArticleById } = useArticle();
  const { upload, deleteImage } = useImage();
  const nav = useNavigate();

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isUpload, setIsUpload] = useState(false);
  const handleIsUpload = () => {
    setIsUpload((prev) => !prev);
  };
  const [isEnterButtonOn, setIsEnterButtonOn] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [input, setInput] = useState<IsCollection>({
    id: "",
    collectionName: "",
    releaseDate: "",
    articleList: [],
    images: [],

    brandName: "",

    isVisible: false,
  });
  const [currentArticleList, setCurrentArticleList] = useState<IsArticle[]>();
  console.log(currentArticleList);
  const [inputArticle, setInputArticle] = useState<IsArticle>({
    images: [],
    articleName: "",
    price: "",

    brandName: "",
    collectionId: cid || "",
    collectionName: "",
  });

  const setImageUrl = useCallback(async (url: string) => {
    await setInput((prev) => {
      return { ...prev, images: [...prev.images, url] };
    });
  }, []);

  const setImageFile = useCallback(async (file: File | null) => {
    await setLogoFile(file);
  }, []);

  const exitModal = () => {
    setIsOpenModal((prev) => !prev);
  };

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

  const addInputArticleList = useCallback(async (id: string) => {
    await setInput((prev) => {
      return { ...prev, articleList: prev.articleList.concat(id) };
    });
  }, []);

  const onChangeInput = useCallback(
    async (
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      await setInputArticle((prev) => {
        return { ...prev, [name]: value };
      });
    },
    []
  );

  const onClickArticle = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const onSubmit = async () => {
    await upload(logoFile, setImageUrl);
    setIsUpload(true);
  };

  useEffect(() => {
    if (!id) return;
    getBrandByBrandName(id).then((brand) => {});
  }, [id]);

  useEffect(() => {
    // if (currentDoc?.uid !== user.uid) {
    //   alert("허용되지 않은 앨범입니다");
    //   nav("/");
    // }
    if (cid) {
      handleRealTimeCollectionById(cid);
      const currentCollection = collectionList[0];
      if (!currentCollection) return;
      setInput((prev) => ({
        ...prev,
        id: cid,
        collectionName: currentCollection.collectionName,
        releaseDate: currentCollection.releaseDate,
        articleList: currentCollection.articleList,
        images: currentCollection.images,

        brandName: currentCollection.brandName,
      }));

      setInputArticle((prev) => ({
        ...prev,
        collectionName: currentCollection.collectionName,
      }));

      setIsEnterButtonOn(() => true);
    }
  }, [id, cid]);

  useEffect(() => {
    let result: any[] = [];
    collectionList[0]?.articleList.forEach(async (aid) => {
      const newArticle = await getArticleById(aid);
      result.push(newArticle);
    });
    setCurrentArticleList(result);
  }, [collectionList]);

  useEffect(() => {
    if (
      input.images[0] ||
      (input.collectionName && input.releaseDate && logoFile)
    ) {
      setIsEnterButtonOn(() => true);
    } else {
      setIsEnterButtonOn(() => false);
    }
  }, [input, logoFile]);

  useEffect(() => {
    if (isUpload && input.images[0]) {
      if (cid) {
        updateDocument(cid, {
          id: cid,
          collectionName: input.collectionName,
          releaseDate: input.releaseDate,
          articleList: input.articleList,
          images: input.images,

          brandName: input.brandName,
          isVisible: false,
        });
      } else if (!cid) {
        addDocument({
          collectionName: input.collectionName,
          releaseDate: input.releaseDate,
          articleList: input.articleList,
          images: input.images,

          brandName: input.brandName,
          isVisible: false,
        });
      }

      const currentCollection = collectionList[0];
      if (currentCollection) {
        if (id && currentCollection.images[0] !== input.images[0]) {
          deleteImage(currentCollection.images[0]);
        }
      }

      nav(`/brandform/${id}`);
    }
  }, [isUpload]);

  return (
    <CollectionFormWrap>
      <div className="InfoWrap">
        <UnderLineBox isBold={true}>{input.brandName}</UnderLineBox>
        <ImgageUploader
          defaultImageUrl={collectionList[0]?.images[0] || ""}
          setImageFile={setImageFile}
        />
        <Input
          name="collectionName"
          value={input.collectionName}
          placeholder="Collection Name"
          onChange={onChange}
          // disabled={id ? true : false}
        />
        <Input
          name="releaseDate"
          value={input.releaseDate}
          placeholder="Release Date"
          onChange={onChange}
          // disabled={id ? true : false}
        />
      </div>
      <Button onClick={onSubmit} isActivated={isEnterButtonOn}>
        CONFIRM
      </Button>
      {cid && (
        <>
          <div className="ArticleListWrap">
            <div className="CreateArticleWrap" onClick={exitModal}>
              <CreateArticle />
            </div>

            {currentArticleList?.map((e, i) => (
              <div
                className="ArticleWrap"
                key={i}
                onClick={() => onClickArticle(e.id || "")}
              >
                <Article article={e} selectedId={selectedId} />
              </div>
            ))}
          </div>
        </>
      )}

      {isOpenModal && (
        <WindowModal
          exitModal={exitModal}
          currentCollection={collectionList[0]}
          addInputArticleList={addInputArticleList}
          input={inputArticle}
          handleIsUpload={handleIsUpload}
          setInput={setInputArticle}
          onChangeInput={onChangeInput}
        />
      )}
    </CollectionFormWrap>
  );
}

const CollectionFormWrap = styled.div`
  padding: 20px 16px 0px 16px;
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
