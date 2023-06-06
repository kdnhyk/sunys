import styled from "styled-components";
import { IsArticle } from "../../types/article";
import { useAuth } from "../../hooks/useAuth";
import Image from "next/image";
import { AddIconWhite } from "@/asset/Icon";

interface IsArticleWrap {
  article: IsArticle;
}

export default function Article({ article }: IsArticleWrap) {
  const { user } = useAuth();

  const isInCart = user.cart.find((e) => e.id === article.id) ? true : false;

  return (
    <ArticleWrap isInCart={isInCart}>
      <div className="ImageWrap">
        <Image src={article.images[0]} alt="" width={200} height={200} />
        <div className="HoverWap">
          <AddIconWhite />
        </div>
      </div>
      <div className="TextWrap">
        <h3>{article.articleName}</h3>
        <p>
          {Number(article.price).toLocaleString("ko-KR", {
            maximumFractionDigits: 4,
          }) + " KRW"}
        </p>
      </div>
    </ArticleWrap>
  );
}

const ArticleWrap = styled.div<{ isInCart: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;

  display: flex;
  flex-direction: column;

  .ImageWrap {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 4px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .HoverWap {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease-in-out;
      background-color: rgba(1, 1, 1, 0.4);

      opacity: 0;
      &:hover {
        opacity: 1;
      }

      svg {
        cursor: pointer;
      }
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
      color: var(--placeholder-color);
    }
  }
`;
