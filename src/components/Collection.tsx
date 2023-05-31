import styled from "styled-components";
import { IsCollection } from "../types/collection";
import useLocationState from "../hooks/useLocationState";
import Image from "next/image";

interface IsCollectionStyle {
  collection: IsCollection;
  isDisable?: boolean;
}

//
export default function Collection({
  collection,
  isDisable,
}: IsCollectionStyle) {
  const { onClickCollection } = useLocationState();

  const diff = Math.ceil(
    (new Date(collection.releaseDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <CollectionWrap
      onClick={() =>
        !isDisable &&
        onClickCollection(collection.brandName, collection.id || "")
      }
      isRed={!collection.isVisible}
    >
      <div className="ImageWrap">
        <Image
          src={collection.images[0]}
          alt=""
          width={200}
          height={200}
          priority
        />
        {diff > 0 && (
          <div className="DDayWrap">
            <p>{`D - ${diff}`}</p>
          </div>
        )}
      </div>

      <div className="TextlWrap">
        <h3>{collection.brandName}</h3>
        <p>{collection.collectionName}</p>
      </div>
    </CollectionWrap>
  );
}

const CollectionWrap = styled.div<{ isRed: boolean }>`
  position: relative;
  cursor: pointer;

  /* &:hover {
    .ImageWrap {
      img {
        transition: scale 0.2s ease-in-out;
        scale: 0.98;
      }
    }
  } */

  .ImageWrap {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .DDayWrap {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: calc(100% - 4px);
      transition: all 0.2s ease-out;
      background-color: rgba(0, 0, 0, 0.3);

      display: flex;
      justify-content: center;
      align-items: center;

      p {
        color: white;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
  .TextlWrap {
    height: fit-content;

    h3 {
      margin-bottom: 4px;
      color: ${({ isRed }) => isRed && "#F33131"};
    }
    p {
      color: #8e8e8e;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
`;
