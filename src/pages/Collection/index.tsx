import styled from "styled-components";
import UnderLineBox from "../../common/components/UnderLineBox";
import { useEffect, useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useParams } from "react-router-dom";
import { IsCollection } from "../../types/collection";

export default function Collection() {
  const { cid } = useParams();
  const [currentCollection, setCurrentCollection] = useState<IsCollection>({
    id: "",
    collectionName: "",
    releaseDate: "",
    articleList: [],
    images: [],

    brandName: "",
  });
  const { handleCollectionById } = useCollection();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const onClickArticle = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (!cid) return;
    handleCollectionById(cid).then((collectoin) => {
      setCurrentCollection(collectoin[0]);
    });
  }, []);

  console.log(currentCollection);

  return (
    <CollectionWrap>
      <div className="InfoWrap">
        <UnderLineBox isBold={true}>{currentCollection.brandName}</UnderLineBox>
        <p className="Text">{currentCollection.collectionName}</p>
        <p className="Text">
          {`${currentCollection.releaseDate.replaceAll("-", ". ")}`}
        </p>
      </div>
      <div className="ArticleListWrap">
        {/* {articleList.map((e, i) => (
          <div
            className="ArticleWrap"
            key={i}
            onClick={() => onClickArticle(e.id)}
          >
            <Article article={e} selectedId={selectedId} />
          </div>
        ))} */}
      </div>
    </CollectionWrap>
  );
}

const CollectionWrap = styled.div`
  padding: 20px 16px 0px 16px;
  .InfoWrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    margin-bottom: 16px;
    .Text {
      margin-bottom: 6px;
    }
  }
  .ArticleListWrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 20px;
    column-gap: 10px;

    @media (min-width: 605px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media (min-width: 885px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    @media (min-width: 1165px) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
  }
`;
