import styled from "styled-components";
import MainArea from "./MainArea";
import { useParams } from "react-router-dom";
import ArticleArea from "./ArticleArea";
import { useCollection } from "../../hooks/useCollection";
import { useEffect } from "react";

export default function CollectionForm() {
  const { cid } = useParams();
  const { collectionList, handleRealTimeCollectionById } = useCollection();

  useEffect(() => {
    if (!cid) return;
    handleRealTimeCollectionById(cid);
  }, [cid]);

  return (
    <CollectionFormWrap>
      {collectionList[0] && <MainArea currentCollection={collectionList[0]} />}

      {cid && collectionList[0] && (
        <ArticleArea currentCollection={collectionList[0]} />
      )}
    </CollectionFormWrap>
  );
}

const CollectionFormWrap = styled.div`
  padding: 20px 16px 0px 16px;
`;
