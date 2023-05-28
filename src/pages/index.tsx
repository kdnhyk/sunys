import Head from "next/head";
import styled from "styled-components";
import Collection from "@/components/Collection";
import { useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import useRecentCollection, {
  getRecentCollectionInit,
} from "@/api/useRecentCollection";
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

export default function News() {
  const { recentCollection, fetchNextPage, hasNextPage } =
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

  if (recentCollection.length === 0) return <Loading />;

  return (
    <>
      <Head>
        <title>SUNYS | 뉴스</title>
        <meta name="description" content="서니즈 | 브랜드 별 새로운 컬렉션" />

        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/sunys-1dcf2.appspot.com/o/og_image.png?alt=media&token=adaa046e-ec2d-466a-9e40-828afe0bee71"
        />
        <meta
          property="og:description"
          content="서니즈 | 브랜드 아카이브 매거진"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SUNYS" />
        <meta property="og:url" content="http://sunys.co.kr" />
      </Head>
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
              {recentCollection?.map((e, i) => (
                <div className="ColInner" key={i}>
                  <Collection collection={e} />{" "}
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
          <div className="More" ref={ref}></div>
        </div>
      </NewsWrap>
    </>
  );
}

const NewsWrap = styled.div`
  padding: 9px 0px 24px 0px;
  .NewColArea {
    padding: 0px 6px 24px 6px;

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
