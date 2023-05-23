import styled from "styled-components";
import { More } from "@/asset/Icon";
import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Collection from "../Collection";
import useBrandCollection from "@/pages/api/useBrandCollection";
import useLocationState from "@/hooks/useLocationState";
import CreateBox from "../CreateBox";

interface IsCollectionArea {
  brandName: string;
}

export default function CollectionArea({ brandName }: IsCollectionArea) {
  const width = window.innerWidth;
  const { currentCollection, fetchNextPage, hasNextPage } =
    useBrandCollection(brandName);
  const { onClickCollectionSetting } = useLocationState();

  const [onLoad, setOnLoad] = useState(false);

  const handleLoad = () => {
    setOnLoad(true);
  };

  useEffect(() => {
    if (currentCollection.length === 0) {
      fetchNextPage();
    }
  }, []);

  useEffect(() => {
    if (onLoad && hasNextPage) {
      fetchNextPage();
    }
    setOnLoad(false);
  }, [hasNextPage, onLoad]);

  if (!currentCollection) {
    return <div></div>;
  }
  return (
    <CollectionAreaStyle>
      {brandName && (
        <>
          <ResponsiveMasonry
            columnsCountBreakPoints={
              width < 700
                ? {
                    180: 1,
                    360: 2,
                    540: 3,
                    720: 4,
                    900: 5,
                    1080: 6,
                  }
                : {
                    540: 1,
                    720: 2,
                    900: 3,
                    1080: 4,
                  }
            }
          >
            <Masonry>
              <div
                className="ColInner"
                onClick={() => onClickCollectionSetting(brandName)}
              >
                <CreateBox />
              </div>
              {currentCollection.map((e, i) => (
                <div
                  className="ColInner"
                  key={i}
                  onClick={() => onClickCollectionSetting(e.brandName, e.id)}
                >
                  <Collection collection={e} isDisable={true} />
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
          {currentCollection.length > 0 && (
            <div className="More" onClick={handleLoad}>
              <More />
            </div>
          )}
        </>
      )}
    </CollectionAreaStyle>
  );
}

const CollectionAreaStyle = styled.div`
  height: 100%;
  position: relative;
  padding: 16px 8px 0px 8px;
  border-bottom: 1px solid #dddddd;

  .ColInner {
    padding: 8px;
  }

  .More {
    display: flex;
    justify-content: center;
    padding-bottom: 16px;
    cursor: pointer;
  }
`;
