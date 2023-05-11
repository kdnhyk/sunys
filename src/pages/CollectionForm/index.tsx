import styled from "styled-components";
import MainArea from "./MainArea";
import { useParams } from "react-router-dom";
import ArticleArea from "./ArticleArea";
import { useCollection } from "../../hooks/useCollection";
import { useEffect } from "react";

export default function CollectionForm() {
  const { cid } = useParams();
  const { recentList, handleRealTimeCollectionById } = useCollection();

  console.log(recentList);
  useEffect(() => {
    if (!cid) return;
    handleRealTimeCollectionById(cid);
  }, [cid]);

  return (
    <CollectionFormWrap>
      {recentList[0] ? (
        <MainArea currentCollection={recentList[0]} />
      ) : (
        <MainArea />
      )}

      {cid && recentList[0] && (
        <ArticleArea currentCollection={recentList[0]} />
      )}
    </CollectionFormWrap>
  );
}

const CollectionFormWrap = styled.div`
  padding: 20px 16px 0px 16px;
`;
