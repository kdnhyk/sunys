import styled from "styled-components";
import { IsArticle } from "../types/article";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import WindowModalArticle from "./WindowModaArticlel";
import Image from "next/image";

interface IsArticleWrap {
  article: IsArticle;
}

export default function Article({ article }: IsArticleWrap) {
  const { user } = useAuth();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const isInCart = user.cart.find((e) => e.id === article.id) ? true : false;

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <ArticleWrap isInCart={isInCart}>
      <div className="ArticleInner" onClick={openModal}>
        <div className="ImageWrap">
          <Image src={article.images[0]} alt="" width={200} height={200} />
        </div>
        <div className="TextWrap">
          <h3>{article.articleName}</h3>
          <p>
            {Number(article.price).toLocaleString("ko-KR", {
              maximumFractionDigits: 4,
            }) + " KRW"}
          </p>
        </div>
      </div>

      {isOpenModal && (
        <WindowModalArticle exitModal={closeModal} article={article} />
      )}
    </ArticleWrap>
  );
}

const ArticleWrap = styled.div<{ isInCart: boolean }>`
  height: 100%;
  position: relative;

  .ArticleInner {
    .ImageWrap {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 4px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .TextWrap {
      height: fit-content;
      padding: 0px 8px;

      h3 {
        margin-bottom: 2px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      p {
        color: #8e8e8e;
      }
    }
  }
`;
