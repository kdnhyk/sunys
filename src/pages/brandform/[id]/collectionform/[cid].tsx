import styled from "styled-components";
import { media } from "@/media";
import { useRouter } from "next/router";
import useCollectionByCid from "@/api/collection/useCollectionByCid";
import useArticleByCid from "@/api/article/useArticleByCid";
import ArticleArea from "@/containers/collectionform/ArticleArea";
import CrawlArticleArea from "@/containers/collectionform/CrawlArticleArea/CrawlArticleArea";
import MainArea from "@/containers/collectionform/MainArea";
import useCheckAdmin from "@/hooks/useCheckAdmin";

export default function CollectionForm() {
  const { cid } = useRouter().query;
  const { data } = useCollectionByCid(typeof cid === "string" ? cid : "");
  const { data: articleList } = useArticleByCid(
    typeof cid === "string" ? cid : ""
  );
  const router = useCheckAdmin();

  if (!articleList || !data) return <></>;

  return (
    <CollectionFormWrap>
      <div className="LeftSide">
        <MainArea
          brandName={data.brandName}
          lastCollection={data}
          articleList={articleList}
        />
        <ArticleArea lastCollection={data} articleList={articleList} />
      </div>
      <div className="RightSide">
        <CrawlArticleArea brandName={data.brandName} lastCollection={data} />
      </div>
    </CollectionFormWrap>
  );
}

const CollectionFormWrap = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  ${media.desktop`
    flex-direction: row;

    position: fixed;
    height: calc(100% - 50px);

    .LeftSide {
      position: relative;
      width: 40%;

      border-right: 1px solid var(--line-color);
      overflow-y: auto;
    }

    .RightSide {
      width: 60%;
      overflow-y: auto;
    }
  `}
`;
