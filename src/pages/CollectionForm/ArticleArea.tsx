import styled from "styled-components";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import CreateArticle from "./components/CreateArticle";
import WindowModal from "./components/WindowModal";
import { IsArticle } from "../../types/article";
import { IsCollection } from "../../types/collection";
import { useArticle } from "../../hooks/useArticle";
import Article from "./components/Article";
import { useArticleStore } from "../../hooks/firestore/useArticleStore";
import { useImage } from "../../hooks/storage/useImage";

interface IsArticleArea {
  currentCollection: IsCollection;
}

export default function ArticleArea({ currentCollection }: IsArticleArea) {
  const { articleList, handleArticleByCid } = useArticle();
  const { deleteArticle } = useArticleStore();
  const { deleteImage } = useImage("article");

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [input, setInput] = useState<IsArticle>({
    articleName: "",
    price: "",
    collectionId: currentCollection.id || "",
    collectionName: currentCollection.collectionName,
    images: [],

    brandName: currentCollection.brandName,
  });

  const handleIsOpenModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const onChangeInput = useCallback(
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

  const onDeleteArticle = (id: string) => {
    if (!articleList && !id) return;

    const delValue = articleList.find((e) => e.id === id);

    deleteImage(delValue?.images[0] || "");
    deleteArticle(delValue?.id || "");
  };

  //
  useEffect(() => {
    handleArticleByCid(currentCollection.id || "");
  }, [currentCollection]);

  return (
    <ArticleAreaWrap>
      <div className="ArticleListWrap">
        <div className="CreateArticleWrap" onClick={handleIsOpenModal}>
          <CreateArticle />
        </div>

        {articleList.map((article, i) => (
          <div
            className="ArticleWrap"
            key={i}
            onClick={() => onDeleteArticle(article.id || "")}
          >
            <Article article={article} />
          </div>
        ))}
      </div>

      {isOpenModal && (
        <WindowModal
          exitModal={handleIsOpenModal}
          input={input}
          currentCollection={currentCollection}
          setInput={setInput}
          onChangeInput={onChangeInput}
        />
      )}
    </ArticleAreaWrap>
  );
}

const ArticleAreaWrap = styled.div`
  .ArticleListWrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    row-gap: 20px;
    column-gap: 10px;
    margin-top: 20px;

    @media (min-width: 605px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 885px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (min-width: 1165px) {
      grid-template-columns: repeat(5, 1fr);
    }
  }
`;
