import Head from "next/head";
import NewsList from "@/components/news/newsList";

export default function News() {
  return (
    <>
      <Head>
        <title>SUNYS | 뉴스</title>
        <meta name="keywords" content="패션, 브랜드, 웹, 매거진" />
        <meta
          name="description"
          content="서니즈는 세상의 모든 패션 브랜드를 소개하는 웹 매거진입니다. 최신 브랜드 컬렉션 뉴스를 받아보세요."
        />

        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/sunys-1dcf2.appspot.com/o/og_image.png?alt=media&token=adaa046e-ec2d-466a-9e40-828afe0bee71"
        />
        <meta property="og:title" content="SUNYS | 서니즈 매거진" />
        <meta
          property="og:description"
          content="서니즈는 세상의 모든 패션 브랜드를 소개하는 웹 매거진입니다. 최신 브랜드 컬렉션 뉴스를 받아보세요."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://sunys.co.kr" />
      </Head>
      <NewsList />
    </>
  );
}
