import styled from "styled-components";
import MainArea from "./MainArea";
import { useLocation, useParams } from "react-router-dom";
import ArticleArea from "./ArticleArea";
import { useEffect } from "react";
import { useArticle } from "../../hooks/useArticle";

export default function CollectionForm() {
  const { cid } = useParams();
  const { articleList, handleArticleByCidRealtime } = useArticle();
  const { collection } = useLocation().state;

  useEffect(() => {
    if (!cid) return;
    // handleRealTimeCollectionById(cid);
    handleArticleByCidRealtime(cid || "");
  }, [cid]);

  return (
    <CollectionFormWrap>
      {cid ? (
        <MainArea currentCollection={collection} articleList={articleList} />
      ) : (
        <MainArea articleList={articleList} />
      )}

      {cid && (
        <ArticleArea currentCollection={collection} articleList={articleList} />
      )}
    </CollectionFormWrap>
  );
}

const CollectionFormWrap = styled.div`
  padding: 20px 16px 0px 16px;
`;
