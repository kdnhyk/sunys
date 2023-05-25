import styled from "styled-components";
import MainArea from "@/components/collectionform/MainArea";
import ArticleArea from "@/components/collectionform/ArticleArea";
import { useRouter } from "next/router";
import useCollection from "@/api/useCollection";
import useArticle from "@/api/useArticle";
import Loading from "@/components/Loading";

export default function CollectionForm() {
  const { cid } = useRouter().query;
  const { data, isLoading } = useCollection(typeof cid === "string" ? cid : "");
  const { data: articleList, isLoading: isArticleLoading } = useArticle(
    typeof cid === "string" ? cid : ""
  );

  if (isLoading || !articleList) return <Loading />;

  return (
    <CollectionFormWrap>
      <MainArea
        brandName={data.brandName}
        currentCollection={data}
        articleList={articleList}
      />
      <ArticleArea currentCollection={data} articleList={articleList} />
    </CollectionFormWrap>
  );
}

const CollectionFormWrap = styled.div`
  padding: 20px 16px 0px 16px;
`;
