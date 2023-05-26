import styled from "styled-components";
import BrandListArea from "@/components/brand/BrandListArea";
import SearchInput from "@/components/brand/SearchInput";
import Head from "next/head";
import { media } from "@/media";

export default function BrandList() {
  return (
    <>
      <Head>
        <title>SUNYS | 전체 브랜드</title>
        <meta name="description" content="전체 브랜드 모음" />
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
