import styled from "styled-components";
import { IsCollection } from "../../../types/collection";

interface IsCollectionStyle {
  collection: IsCollection;
}

export default function UpcommingCollection({ collection }: IsCollectionStyle) {
  const diff = Math.ceil(
    Math.abs(
      new Date(collection.releaseDate).getTime() - new Date().getTime()
    ) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <UpcommingCollectionWrap>
      <div className="ImageWrap">
        <img src={collection.images[0]} alt="" />
      </div>

      <div className="TextlWrap">
        <h3>{collection.brandName}</h3>
        <p>{collection.collectionName}</p>
      </div>

      <div className="Background"></div>
      <div className="DDayWrap">
        <p>{`D - ${diff}`}</p>
      </div>
    </UpcommingCollectionWrap>
  );
}

const UpcommingCollectionWrap = styled.div`
  position: relative;
  cursor: pointer;
  .ImageWrap {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    img {
      width: 180px;
      height: 240px;
      object-fit: contain;
    }
  }
  .TextlWrap {
    padding: 4px 4px;
    h3 {
      margin-bottom: 2px;
    }
    p {
      font-size: 13px;
    }
  }

  .DDayWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0px;
    width: 100%;
    height: calc(100% - 43px);
    cursor: pointer;
    p {
      color: white;
      font-size: 16px;
      font-weight: 600;
    }
  }
  .Background {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0px;
    width: 100%;
    height: calc(100% - 43px);
    background-color: black;
    opacity: 0.3;
  }
`;
