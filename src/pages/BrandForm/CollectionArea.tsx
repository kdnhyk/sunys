import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { More } from "../../asset/Icon";
import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Collection from "../../common/components/Collection";
import useBrandCollection from "../../api/useBrandCollection";
import useLocationState from "../../hooks/useLocationState";
import CreateBox from "../../common/components/CreateBox";

export default function CollectionArea() {
  const width = window.innerWidth;
  const { brand } = useLocation().state;
  const { currentCollection, fetchNextPage, hasNextPage } = useBrandCollection(
    brand.brandName
  );
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

  return (
    <CollectionAreaStyle>
      {brand.brandName && (
        <>
          <ResponsiveMasonry
            columnsCountBreakPoints={
              width < 700
                ? {
                    300: 1,
                    400: 2,
                    660: 3,
                    880: 4,
                    1100: 5,
                    1320: 6,
                  }
                : {
                    660: 1,
                    880: 2,
                    1100: 3,
                    1320: 4,
                  }
            }
          >
            <Masonry>
              <div
                className="ColInner"
                onClick={() => onClickCollectionSetting(brand.brandName)}
              >
                <CreateBox />
              </div>
              {currentCollection.map((e, i) => (
                <div
                  className="ColInner"
                  key={i}
                  onClick={() => onClickCollectionSetting(e.brandName, e)}
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
