import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import useLocationState from "@/hooks/useLocationState";
import useCollection from "@/api/useCollection";
import Image from "next/image";
import { useRouter } from "next/router";
import { SettingIcon } from "@/asset/Icon";
import { IsCollection } from "@/types/collection";

interface IsMainArea {
  collection: IsCollection;
}

export default function MainArea({ collection }: IsMainArea) {
  const { user } = useAuth();

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
          priority
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

        <p className="CollectionName">{collection.collectionName}</p>

        {user.admin && (
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
    height: auto;
    position: relative;

    img {
      width: 100%;
      height: auto;
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
        color: #8e8e8e;
      }
    }
  }
  .InfoWrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding-bottom: 10px;
    /* border-bottom: 1px solid black; */
    .BrandName {
      cursor: pointer;
    }
    .CollectionName {
      color: #8e8e8e;
    }
    .Setting {
      cursor: pointer;
    }
  }
`;
