import styled from "styled-components";
import { IsCollection } from "../../types/collection";
import { Arrow } from "../../asset/Icon";
import useLocationState from "../../hooks/useLocationState";

interface IsCollectionStyle {
  collection: IsCollection;
}

//
export default function Collection({ collection }: IsCollectionStyle) {
  const { onClickCollection, onClickCollectionByCid } = useLocationState();

  const diff = Math.ceil(
    (new Date(collection.releaseDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <CollectionWrap>
      <div className="ImageWrap">
        <img src={collection.images[0]} alt="" width={180} height={240} />
      </div>

      <div className="TextlWrap">
        <h3>{collection.brandName}</h3>
        <p>{collection.collectionName}</p>
      </div>

      {diff <= 0 ? (
        <div
          className="HoverWrap"
          onClick={() => onClickCollection(collection)}
        >
          <Arrow />
        </div>
      ) : (
        <div
          className="DDayHoverWrap"
          onClick={() => onClickCollection(collection)}
        >
          <p>{`D - ${diff}`}</p>
        </div>
      )}
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
    .DDayHoverWrap {
      background-color: rgba(0, 0, 0, 0.5);
      p {
        display: block;
      }
    }
  }

  .ImageWrap {
    img {
      border-radius: 8px;
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

    border-radius: 8px;
    cursor: pointer;
    svg {
      display: none;
      cursor: pointer;
    }
  }

  .DDayHoverWrap {
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

    border-radius: 8px;
    cursor: pointer;
    p {
      color: white;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
    }
  }
`;
