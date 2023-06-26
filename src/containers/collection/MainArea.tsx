import styled from "styled-components";
import { useEffect, useState } from "react";
import useLocationState from "@/hooks/useLocationState";
import Image from "next/image";
import { SettingIcon } from "@/asset/Icon";
import { IsCollection } from "@/types/collection";
import useUser from "@/api/user/useUser";

interface IsMainArea {
  collection: IsCollection;
}

export default function MainArea({ collection }: IsMainArea) {
  const { user } = useUser();

  const { onClickBarnd, onClickCollectionSetting } = useLocationState();

  const [diff, setDiff] = useState(0);

  useEffect(() => {
    if (!collection) return;

    setDiff(() =>
      Math.ceil(
        (new Date(collection.releaseDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );
  }, [collection]);

  return (
    <MainAreaWrap>
      <div className="ImageWrap">
        <Image
          src={collection.images[0]}
          alt=""
          width={600}
          height={600}
          priority={true}
        />

        {diff > 0 && (
          <div className="DDayWrap">
            <p className="DDay">D - {diff}</p>
          </div>
        )}

        <div className="DateWrap">
          <p className="CollectionName">
            {`${collection.releaseDate.replaceAll("-", ". ")}`}
          </p>
        </div>
      </div>

      <div className="InfoWrap">
        <div
          className="BrandName"
          onClick={() => onClickBarnd(collection.brandName)}
        >
          <h1>{collection.brandName}</h1>
        </div>

        <h2 className="CollectionName">{collection.collectionName}</h2>

        <p className="Text">{collection.text}</p>

        {user?.admin && (
          <div
            className="Setting"
            onClick={() =>
              onClickCollectionSetting(collection.brandName, collection.id)
            }
          >
            <SettingIcon />
          </div>
        )}
      </div>
    </MainAreaWrap>
  );
}

const MainAreaWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .ImageWrap {
    width: 100%;
    height: 100%;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .DDayWrap {
      position: absolute;
      top: 0px;
      left: 0px;

      width: 100%;
      height: calc(100% - 4px);

      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.3);

      .DDay {
        font-weight: 500;
        font-size: 20px;
        color: white;
      }
    }

    .DateWrap {
      position: absolute;
      bottom: 8px;
      right: 4px;
      background-color: white;
      p {
        color: var(--placeholder-color);
      }
    }
  }
  .InfoWrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 10px 16px 20px 16px;
    /* border-bottom: 1px solid black; */
    .BrandName {
      color: var(--placeholder-color);
      cursor: pointer;
    }
    .CollectionName {
      font-size: 20px;
      text-align: center;
    }
    .Text {
      text-align: center;
    }
    .Setting {
      cursor: pointer;
    }
  }
`;
