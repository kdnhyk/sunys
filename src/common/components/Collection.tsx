import styled, { css } from "styled-components";
import { IsCollection } from "../../types/collection";

interface IsCollectionStyle {
  collection: IsCollection;
}

export default function Collection({ collection }: IsCollectionStyle) {
  return (
    <CollectionWrap>
      <div className="ImageWrap">
        <img src={collection.images[0]} alt="" />
      </div>

      <div className="TextlWrap">
        <h3>{collection.brandName}</h3>
        <p>{collection.collectionName}</p>
      </div>
    </CollectionWrap>
  );
}

const CollectionWrap = styled.div`
  width: 180px;
  position: relative;
  cursor: pointer;
  .ImageWrap {
    display: flex;
    align-items: center;
    justify-content: center;
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
`;
