import Head from "next/head";
import styled from "styled-components";

export default function Magazine() {
  return (
    <>
      <Head>
        <title>SUNYS | 매거진</title>
        <meta name="description" content="브랜드 별 뉴스" />

        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/sunys-1dcf2.appspot.com/o/og_image.png?alt=media&token=adaa046e-ec2d-466a-9e40-828afe0bee71"
        />
        <meta property="og:title" content="SUNYS" />
        <meta
          property="og:description"
          content="서니즈 | 브랜드 아카이브 매거진"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://sunys.co.kr" />
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
