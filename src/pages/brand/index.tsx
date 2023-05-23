import styled from "styled-components";
import BrandListArea from "../../components/brand/BrandListArea";
import SearchInput from "../../components/brand/SearchInput";
import Head from "next/head";

export default function BrandList() {
  return (
    <>
      <Head>
        <title>SUNYS | 전체 브랜드</title>
        <meta name="description" content="모든 브랜드 정보" />
      </Head>
      <BrandListStyle>
        <div className="SearchInputWrap">
          <SearchInput placeholder="Search By Brand" />
        </div>
        <BrandListArea />
      </BrandListStyle>
    </>
  );
}

const BrandListStyle = styled.div`
  padding: 24px 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .SearchInputWrap {
    padding: 0px 16px;
    padding-bottom: 24px;
    border-bottom: 1px solid #dddddd;
    display: flex;
    justify-content: center;
  }
`;
