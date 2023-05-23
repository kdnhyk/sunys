import styled from "styled-components";
import Collection from "../../common/components/Collection";
import { useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import useRecentCollection from "../../api/useRecentCollection";
import { useInView } from "react-intersection-observer";

//
export default function News() {
  const { recentCollection, fetchNextPage, hasNextPage } =
    useRecentCollection(); // isLoading 추가

  const [ref, inView] = useInView();

  useEffect(() => {
    if (recentCollection.length === 0) {
      fetchNextPage();
    }
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView]);

  return (
    <NewsWrap>
      <div className="NewColArea">
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            180: 1,
            360: 2,
            540: 3,
            720: 4,
            900: 5,
            1080: 6,
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
        <div className="More" ref={ref}></div>
      </div>
    </NewsWrap>
  );
}

const NewsWrap = styled.div`
  padding: 9px 0px 24px 0px;
  .NewColArea {
    padding: 0px 6px 24px 6px;
    border-bottom: 1px solid #dddddd;

    .ColInner {
      padding: 6px;
    }

    .More {
      display: flex;
      justify-content: center;

      cursor: pointer;
    }
  }
`;
