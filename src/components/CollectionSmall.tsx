import styled from "styled-components";
import { IsCollection } from "../types/collection";
import { ArrowWhite } from "../asset/Icon";
import useLocationState from "../hooks/useLocationState";
import Image from "next/image";

interface IsCollectionStyle {
  collection: IsCollection;
}

//
export default function CollectionSmall({ collection }: IsCollectionStyle) {
  const { onClickCollection } = useLocationState();

  const diff = Math.ceil(
    (new Date(collection.releaseDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <CollectionSmallWrap
      onClick={() =>
        onClickCollection(collection.brandName, collection.id || "")
      }
    >
      <div className="ImageWrap">
        <Image src={collection.images[0]} alt="" width={180} height={240} />
        {diff <= 0 ? (
          <div className="HoverWrap">
            <ArrowWhite />
          </div>
        ) : (
          <div className="DDayHoverWrap">
            <p>{`D - ${diff}`}</p>
          </div>
        )}
      </div>

      <div className="TextlWrap">
        <h3>{collection.brandName}</h3>
        <p>{collection.collectionName}</p>
      </div>
    </CollectionSmallWrap>
  );
}

const CollectionSmallWrap = styled.div`
  position: relative;
  cursor: pointer;

  .ImageWrap {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      border-radius: 12px;

      object-fit: cover;
    }

    .HoverWrap {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: calc(100% - 4px);
      transition: all 0.2s ease-out;
      background-color: transparent;

      display: flex;
      justify-content: center;
      align-items: center;

      border-radius: 12px;

      svg {
        display: none;
      }
    }

    .DDayHoverWrap {
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

      border-radius: 12px;

      p {
        color: white;
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
  .TextlWrap {
    height: 40px;
    h3 {
      margin-bottom: 4px;
    }
    p {
      color: #8e8e8e;
    }
  }

  &:hover {
    .ImageWrap {
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
  }
`;
