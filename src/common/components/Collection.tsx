import styled from "styled-components";
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

      <div className="HoverWrap">
        <svg
          width="35"
          height="10"
          viewBox="0 0 35 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 9H32L25.2903 1" stroke="white" stroke-width="2" />
        </svg>
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
      object-fit: contain;
    }
  }
  .TextlWrap {
    padding: 4px 0px;
    h3 {
      margin-bottom: 2px;
    }
    p {
    }
  }

  .HoverWrap {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: calc(100% - 43px);
    transition: all 0.1s ease-out;
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
