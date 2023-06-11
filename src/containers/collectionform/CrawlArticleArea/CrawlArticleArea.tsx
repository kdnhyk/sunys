import styled from "styled-components";
import { IsCollection } from "@/types/collection";
import CrawlArticle from "./CrawlArticle";
import useCrawlArticle from "@/api/article/useCrawlArticle";
import Loading from "@/components/Loading";

interface IsCrawlArticleArea {
  brandName: string;
  lastCollection: IsCollection;
}

export default function CrawlArticleArea({
  brandName,
  lastCollection,
}: IsCrawlArticleArea) {
  const { data } = useCrawlArticle(brandName);

  console.log(data);
  if (!data) return <Loading />;

  return (
    <CrawlArticleAreaWrap>
      <div className="ArticleListWrap">
        {data.map((e, i) => {
          return (
            <div className="ArticleInner" key={i}>
              <CrawlArticle data={e} lastCollection={lastCollection} />
            </div>
          );
        })}
      </div>
    </CrawlArticleAreaWrap>
  );
}

const CrawlArticleAreaWrap = styled.div`
  padding-bottom: 40px;
  .ArticleListWrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    row-gap: 20px;
    column-gap: 10px;
    margin-top: 20px;

    @media (min-width: 885px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1165px) {
      grid-template-columns: repeat(4, 1fr);
    }

    .ArticleInner {
      .ImageWrap {
        position: relative;
        width: 100%;
        height: 100%;
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
        padding-left: 4px;
        h3 {
          font-weight: 400;
          margin-bottom: 4px;
        }
        p {
        }
      }
    }
  }
`;
