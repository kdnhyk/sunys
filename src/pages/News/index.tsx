import styled from "styled-components";
import Collection from "../../common/components/Collection";
import { Suspense, useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { More } from "../../asset/Icon";
import useRecentCollection from "../../api/useRecentCollection";

//
export default function News() {
  const { recentCollection, fetchNextPage, hasNextPage } =
    useRecentCollection(); // isLoading 추가

  const [onLoad, setOnLoad] = useState(false);

  const handleLoad = () => {
    setOnLoad(true);
  };

  useEffect(() => {
    if (recentCollection.length === 0) {
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
    <NewsWrap>
      <div className="NewColArea">
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            300: 1,
            400: 2,
            660: 3,
            880: 4,
            1100: 5,
            1320: 6,
          }}
        >
          <Masonry>
            {recentCollection.map((e, i) => (
              <div className="ColInner" key={i}>
                <Collection collection={e} />{" "}
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
        <div className="More" onClick={handleLoad}>
          <More />
        </div>
      </div>
    </NewsWrap>
  );
}

const NewsWrap = styled.div`
  padding: 24px 0px;
  .NewColArea {
    padding: 0px 8px;
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
