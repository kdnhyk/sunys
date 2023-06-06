import styled from "styled-components";
import BrandListArea from "@/components/brand/BrandListArea";
import SearchInput from "@/components/brand/SearchInput";
import Head from "next/head";
import { media } from "@/media";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { getBrandList } from "@/api/brandList/useBrandList";

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
  const [searchInput, setSearchInput] = useState("");

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(() => value);
  };

  const onResetSearchInput = () => {
    setSearchInput(() => "");
  };

  return (
    <>
      <Head>
        <title>SUNYS | 전체 브랜드</title>
        <meta name="keywords" content="브랜드, brand" />
        <meta name="description" content="전체 브랜드 모음" />

        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/sunys-1dcf2.appspot.com/o/og_image.png?alt=media&token=adaa046e-ec2d-466a-9e40-828afe0bee71"
        />
        <meta property="og:title" content="SUNYS" />
        <meta property="og:description" content="서니즈 | 전체 브랜드" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://sunys.co.kr/brand" />
      </Head>
      <BrandListStyle>
        <div className="LeftSide">
          <div className="SearchInputWrap">
            <SearchInput
              placeholder="Search By Brand"
              value={searchInput}
              onChange={onChangeSearchInput}
              onReset={onResetSearchInput}
            />
          </div>
          <div className="BrandList">
            <BrandListArea searchInput={searchInput} />
          </div>
        </div>
        <div className="RightSide"></div>
      </BrandListStyle>
    </>
  );
}

const BrandListStyle = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  .LeftSide {
    .SearchInputWrap {
      position: sticky;
      top: 50px;
      padding: 20px;

      border-bottom: 1px solid var(--line-color);
      display: flex;
      justify-content: center;

      background-color: var(--background-color);
    }

    .BrandList {
    }
  }
  ${media.desktop`
    flex-direction: row;

    position: fixed;
    height: calc(100% - 50px);

    .LeftSide {
      position: relative;
      width: 40%;

      border-right: 1px solid var(--line-color);

      .SearchInputWrap {

      }
      .BrandList {
        height: calc(100% - 81px);
        overflow-y: auto;
      }
    }

    .RightSide {
      width: 60%;
    }
  `}
`;
