import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { More } from "../../asset/Icon";
import { Suspense, useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Collection from "../../common/components/Collection";
import useBrandCollection from "../../api/useBrandCollection";

export default function CollectionArea() {
  const width = window.innerWidth;
  const { brand } = useLocation().state;
  const { currentCollection, fetchNextPage, hasNextPage } = useBrandCollection(
    brand.brandName
  );

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

  return (
    <CollectionAreaStyle>
      {currentCollection.length > 0 && (
        <div className="CollectionWrap">
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
              {currentCollection.map((e, i) => (
                <div className="ColInner" key={i}>
                  <Collection collection={e} />
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
          {currentCollection.length > 0 && (
            <div className="More" onClick={handleLoad}>
              <More />
            </div>
          )}
        </div>
      )}
    </CollectionAreaStyle>
  );
}

const CollectionAreaStyle = styled.div`
  height: 100%;
  .CollectionWrap {
    height: 100%;
    position: relative;
    padding: 8px 8px 0px 8px;
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
  }
`;
