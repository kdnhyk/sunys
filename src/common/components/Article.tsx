import styled from "styled-components";
import { IsArticle } from "../../types/article";
import { useAuth } from "../../hooks/useAuth";
import { Arrow } from "../../asset/Icon";
import { useState } from "react";
import WindowModalArticle from "./WindowModaArticlel";

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
      <div className="ArticleInner">
        <div className="ImageWrap">
          <img src={article.images[0]} alt="" />
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

      <div className="HoverWrap" onClick={openModal}>
        <Arrow />
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

  &:hover {
    .HoverWrap {
      background-color: rgba(0, 0, 0, 0.3);
      svg {
        display: block;
      }
    }
  }

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
      height: 38px;
      padding: 0px 8px;

      h3 {
        margin-bottom: 2px;
      }
      p {
        color: #8e8e8e;
      }
    }
  }
  svg {
    cursor: pointer;
  }

  .HoverWrap {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: calc(100% - 42px);
    transition: all 0.16s ease-out;
    background-color: transparent;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    svg {
      display: none;
      cursor: pointer;
    }
  }
`;
