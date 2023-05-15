import styled from "styled-components";
import { useEffect, useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useParams } from "react-router-dom";
import { IsCollection, initCollection } from "../../types/collection";
import { useArticle } from "../../hooks/useArticle";
import Article from "../../common/components/Article";
import { Link } from "react-router-dom";

export default function Collection() {
  const { cid } = useParams();
  const { articleList, handleArticleByCid } = useArticle();

  const [success, setSuccess] = useState(false);
  const [currentCollection, setCurrentCollection] =
    useState<IsCollection>(initCollection);
  const { handleCollectionById } = useCollection();

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
        <div className="DateWrap">
          <p className="CollectionName">
            {`${currentCollection.releaseDate.replaceAll("-", ". ")}`}
          </p>
        </div>
      </div>
      <div className="InfoWrap">
        <Link to={`/brand/${currentCollection.brandName}`}>
          <h1>{currentCollection.brandName}</h1>
        </Link>

        <p className="CollectionName">{currentCollection.collectionName}</p>
      </div>
      <div className="ArticleListWrap">
        {articleList.map((article, i) => (
          <div className="ArticleWrap" key={i}>
            <Article article={article} />
          </div>
        ))}
      </div>
    </CollectionWrap>
  );
}

const CollectionWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .ImageWrap {
    position: relative;
    margin-bottom: 4px;
    img {
      max-width: 768px;
      width: 100%;
      height: auto;
      object-fit: contain;
    }
    .DateWrap {
      position: absolute;
      bottom: 8px;
      right: 4px;
      background-color: white;
      p {
        color: #8e8e8e;
      }
    }
  }
  .InfoWrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding-bottom: 10px;
    /* border-bottom: 1px solid black; */
    .CollectionName {
      color: #8e8e8e;
    }
  }
  .ArticleListWrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;

    column-gap: 1px;
    row-gap: 12px;

    padding-bottom: 40px;
    border-bottom: 1px solid #dddddd;

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
