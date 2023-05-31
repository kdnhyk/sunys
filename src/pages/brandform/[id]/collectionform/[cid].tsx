import styled from "styled-components";
import MainArea from "@/components/collectionform/MainArea";
import ArticleArea from "@/components/collectionform/ArticleArea";
import { useRouter } from "next/router";
import useCollection from "@/api/useCollection";
import useArticle from "@/api/useArticle";

export default function CollectionForm() {
  const { cid } = useRouter().query;
  const { data } = useCollection(typeof cid === "string" ? cid : "");
  const { data: articleList } = useArticle(typeof cid === "string" ? cid : "");

  if (!articleList || !data) return <></>;

  return (
    <CollectionFormWrap>
      <MainArea
        brandName={data.brandName}
        lastCollection={data}
        articleList={articleList}
      />
      <ArticleArea lastCollection={data} articleList={articleList} />
    </CollectionFormWrap>
  );
}

const CollectionFormWrap = styled.div`
  padding: 20px 16px 0px 16px;
`;
