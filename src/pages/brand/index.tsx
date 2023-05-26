import styled from "styled-components";
import BrandListArea from "@/components/brand/BrandListArea";
import SearchInput from "@/components/brand/SearchInput";
import Head from "next/head";
import { media } from "@/media";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getBrandList } from "@/api/useBrandList";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["brandlist"], () => getBrandList(), {
    staleTime: Infinity,
  });

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default function BrandList() {
  return (
    <>
      <Head>
        <title>SUNYS | 전체 브랜드</title>
        <meta name="description" content="전체 브랜드 모음" />

        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/sunys-1dcf2.appspot.com/o/og_image.png?alt=media&token=adaa046e-ec2d-466a-9e40-828afe0bee71"
        />
        <meta property="og:title" content="SUNYS" />
        <meta property="og:description" content="서니즈 | 전체 브랜드" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://sunys.co.kr" />
      </Head>
      <BrandListStyle>
        <div className="BrandListArea">
          <div className="SearchInputWrap">
            <SearchInput placeholder="Search By Brand" />
          </div>
          <BrandListArea />
        </div>
        <div className="RightArea"></div>
      </BrandListStyle>
    </>
  );
}

const BrandListStyle = styled.div`
  display: flex;
  flex-direction: column;

  .BrandListArea {
    padding-top: 20px;
    .SearchInputWrap {
      padding: 0px 16px;
      padding-bottom: 24px;
      border-bottom: 1px solid #dddddd;
      display: flex;
      justify-content: center;
    }
  }
  ${media.desktop`
  flex-direction: row;
  .BrandListArea {
    position: relative;
    width: 220px;
    flex-grow: 2;
    border-right: 1px solid #dddddd;
  }

  .RightArea {
    width: 174px;
    height: 100%;
    flex-grow: 4;
  }
  `}
`;
