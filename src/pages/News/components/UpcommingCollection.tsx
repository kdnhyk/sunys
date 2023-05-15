import styled from "styled-components";
import { IsCollection } from "../../../types/collection";

interface IsUpcommingCollection {
  collection: IsCollection;
}

export default function UpcommingCollection({
  collection,
}: IsUpcommingCollection) {
  const diff = Math.ceil(
    Math.abs(
      new Date(collection.releaseDate).getTime() - new Date().getTime()
    ) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <UpcommingCollectionWrap>
      <div className="ImageWrap">
        <img src={collection.images[0]} alt="" width={180} height={240} />
      </div>

      <div className="TextlWrap">
        <h3>{collection.brandName}</h3>
        <p>{collection.collectionName}</p>
      </div>

      <div className="HoverWrap">
        <p>{`D - ${diff}`}</p>
      </div>
    </UpcommingCollectionWrap>
  );
}

const UpcommingCollectionWrap = styled.div`
  position: relative;

  &:hover {
    .HoverWrap {
      background-color: rgba(0, 0, 0, 0.5);
      p {
        display: block;
      }
    }
  }

  .ImageWrap {
    img {
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
    transition: all 0.1s ease-out;
    background-color: rgba(0, 0, 0, 0.3);

    display: flex;
    justify-content: center;
    align-items: center;
    p {
      color: white;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
    }
  }
`;
