import styled from "styled-components";
import { IsCollection } from "../../../types/collection";

interface IsCollectionStyle {
  collection: IsCollection;
}

export default function UpcommingCollection({ collection }: IsCollectionStyle) {
  return (
    <UpcommingCollectionWrap>
      <div className="ImageWrap">
        <img src={collection.images[0]} alt="" />
      </div>

      <div className="TextlWrap">
        <h3>{collection.brandName}</h3>
        <p>{collection.collectionName}</p>
      </div>

      <div className="SelectArea">
        <p>D - 3</p>
      </div>
    </UpcommingCollectionWrap>
  );
}

const UpcommingCollectionWrap = styled.div`
  width: 200px;
  position: relative;
  cursor: pointer;
  .ImageWrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 200px;
    padding: 20px;
    background-color: white;
    img {
      width: 100%;
      height: 100%;
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

  .SelectArea {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0px;
    width: 100%;
    height: calc(100% - 43px);
    background-color: black;
    opacity: 0.3;
    cursor: pointer;
    p {
      color: white;
      font-size: 20px;
      font-weight: 600;
    }
  }
`;
