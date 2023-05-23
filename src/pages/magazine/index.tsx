import Head from "next/head";
import styled from "styled-components";

export default function Magazine() {
  return (
    <>
      <Head>
        <title>SUNYS | 매거진</title>
        <meta name="description" content="브랜드 별 뉴스" />
      </Head>
      <MagazineWrap>
        <p>준비중 입니다</p>
      </MagazineWrap>
    </>
  );
}

const MagazineWrap = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
