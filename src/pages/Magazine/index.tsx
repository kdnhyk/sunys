import styled from "styled-components";
import { useEffect, useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useParams } from "react-router-dom";
import { IsCollection, initCollection } from "../../types/collection";
import { Link } from "react-router-dom";

export default function Magazine() {
  const { mid } = useParams();

  const [success, setSuccess] = useState(false);
  const [currentCollection, setCurrentCollection] =
    useState<IsCollection>(initCollection);
  const { handleCollectionById } = useCollection();

  useEffect(() => {
    if (!mid) return;
    handleCollectionById(mid).then(async (collectoin) => {
      await setCurrentCollection(collectoin[0]);
      // await handleArticleByCid(cid);
      setSuccess(true);
    });
  }, [mid]);

  if (!success) return <div></div>;

  return (
    <MagazineWrap>
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
    </MagazineWrap>
  );
}

const MagazineWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .ImageWrap {
    position: relative;
    img {
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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    .CollectionName {
      color: #8e8e8e;
    }
  }
`;
