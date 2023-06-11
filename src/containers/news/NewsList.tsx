import styled from "styled-components";
import Collection from "@/components/Collection";
import { useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import useRecentCollection, {
  getRecentCollectionInit,
} from "@/api/collection/useRecentCollection";
import { useInView } from "react-intersection-observer";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import Loading from "@/components/Loading";

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    ["recentCollection"],
    () => getRecentCollectionInit(),
    {
      staleTime: Infinity,
    }
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default function NewsList() {
  const { data, recentCollection, fetchNextPage, hasNextPage } =
    useRecentCollection();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (recentCollection.length === 0) {
      fetchNextPage();
    }
  }, [fetchNextPage, recentCollection.length]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  // recoil 때문에 SEO 안될거 같음
  if (recentCollection.length === 0) return <Loading />;

  return (
    <NewsListStyle>
      <div className="NewColArea">
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            180: 1,
            360: 2,
            540: 3,
            800: 4,
            1000: 5,
            1200: 6,
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
    </NewsListStyle>
  );
}

const NewsListStyle = styled.div`
  padding: 9px 0px 24px 0px;
  .NewColArea {
    padding: 0px 6px 20px 6px;

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
