import styled from "styled-components";
import MainArea from "./MainArea";
import { useParams } from "react-router-dom";
import ArticleArea from "./ArticleArea";
import { useCollection } from "../../hooks/useCollection";
import { useEffect } from "react";
import { useArticle } from "../../hooks/useArticle";

export default function CollectionForm() {
  const { cid } = useParams();
  const { currentCollection, handleRealTimeCollectionById } = useCollection();
  const { articleList, handleArticleByCidRealtime } = useArticle();

  useEffect(() => {
    if (!cid) return;
    handleRealTimeCollectionById(cid);
    handleArticleByCidRealtime(cid || "");
  }, [cid]);

  return (
    <CollectionFormWrap>
      {cid ? (
        currentCollection[0] && (
          <MainArea
            currentCollection={currentCollection[0]}
            articleList={articleList}
          />
        )
      ) : (
        <MainArea />
      )}

      {cid && currentCollection[0] && (
        <ArticleArea
          currentCollection={currentCollection[0]}
          articleList={articleList}
        />
      )}
    </CollectionFormWrap>
  );
}

const CollectionFormWrap = styled.div`
  padding: 20px 16px 0px 16px;
`;
