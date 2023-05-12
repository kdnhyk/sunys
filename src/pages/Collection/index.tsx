import styled from "styled-components";
import UnderLineBox from "../../common/components/UnderLineBox";
import { useEffect, useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useParams } from "react-router-dom";
import { IsCollection } from "../../types/collection";
import { useArticle } from "../../hooks/useArticle";
import Article from "../../common/components/Article";
import { Link } from "react-router-dom";

export default function Collection() {
  const { cid } = useParams();
  const { articleList, handleArticleByCid } = useArticle();

  const [success, setSuccess] = useState(false);
  const [currentCollection, setCurrentCollection] = useState<IsCollection>({
    id: "",
    collectionName: "",
    releaseDate: "",
    images: [],

    brandName: "",
  });
  const { handleCollectionById } = useCollection();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onClickArticle = (id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const onResetSelectedId = () => {
    setSelectedId(null);
  };

  useEffect(() => {
    if (!cid) return;
    handleCollectionById(cid).then(async (collectoin) => {
      await setCurrentCollection(collectoin[0]);
      await handleArticleByCid(cid);
      setSuccess(true);
    });
  }, [cid]);

  if (!success) return <div></div>;

  return (
    <CollectionWrap>
      <div className="ImageWrap">
        <img src={currentCollection.images[0]} alt="" />
      </div>
      <div className="InfoWrap">
        <Link to={`/brand/${currentCollection.brandName}`}>
          <UnderLineBox isBold={true}>
            {currentCollection.brandName}
          </UnderLineBox>
        </Link>

        <p className="Text">{currentCollection.collectionName}</p>
        <p className="Text">
          {`${currentCollection.releaseDate.replaceAll("-", ". ")}`}
        </p>
      </div>
      <div className="ArticleListWrap">
        {articleList.map((article, i) => (
          <div
            className="ArticleWrap"
            key={i}
            onClick={() => onClickArticle(i)}
          >
            <Article article={article} isSelected={selectedId === i} />
          </div>
        ))}
      </div>
    </CollectionWrap>
  );
}

const CollectionWrap = styled.div`
  padding: 20px 16px 0px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .ImageWrap {
    img {
      width: 180px;
      height: 240px;
      object-fit: contain;
    }
  }
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
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    row-gap: 20px;
    column-gap: 10px;
    margin-top: 20px;

    @media (min-width: 605px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 885px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (min-width: 1165px) {
      grid-template-columns: repeat(5, 1fr);
    }
  }
`;
