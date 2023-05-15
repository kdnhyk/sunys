import styled from "styled-components";
import { IsCollection } from "../../types/collection";
import { Arrow } from "../../asset/Icon";

interface IsCollectionStyle {
  collection: IsCollection;
}

export default function Collection({ collection }: IsCollectionStyle) {
  return (
    <CollectionWrap>
      <div className="ImageWrap">
        <img src={collection.images[0]} alt="" width={180} height={240} />
      </div>

      <div className="TextlWrap">
        <h3>{collection.brandName}</h3>
        <p>{collection.collectionName}</p>
      </div>

      <div className="HoverWrap">
        <Arrow />
      </div>
    </CollectionWrap>
  );
}

const CollectionWrap = styled.div`
  position: relative;

  &:hover {
    .HoverWrap {
      background-color: rgba(0, 0, 0, 0.3);
      svg {
        display: block;
      }
    }
  }

  .ImageWrap {
    img {
      width: 180px;
      height: 240px;
      object-fit: cover;
    }
  }
  .TextlWrap {
    height: 43px;
    h3 {
      margin-bottom: 2px;
    }
    p {
      color: #8e8e8e;
    }
  }

  .HoverWrap {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: calc(100% - 47px);
    transition: all 0.16s ease-out;
    background-color: transparent;

    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      display: none;
      cursor: pointer;
    }
  }
`;
