import styled from "styled-components";
import { IsArticle } from "../../types/article";
import Image from "next/image";

interface IsArticleWrap {
  article: IsArticle;
}

export default function Article({ article }: IsArticleWrap) {
  return (
    <ArticleWrap>
      <div className="ImageWrap">
        <Image src={article.images[0]} alt="" width={160} height={160} />
      </div>
      <h3>{article.articleName}</h3>

      <div className="PriceWrap">
        <p>
          {Number(article.price).toLocaleString("ko-KR", {
            maximumFractionDigits: 4,
          }) + " KRW"}
        </p>
      </div>
    </ArticleWrap>
  );
}

const ArticleWrap = styled.div`
  height: 100%;
  position: relative;
  cursor: pointer;
  .ImageWrap {
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
  }
  h3 {
    font-weight: 400;
    margin-bottom: 4px;
  }
  .PriceWrap {
    p {
      font-size: 13px;
    }
  }
`;
