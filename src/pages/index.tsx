import Head from "next/head";
import NewsList from "@/components/news/NewsList";
import NewsHeader from "@/components/account/UserFilter";

export default function News() {
  return (
    <>
      <Head>
        <title>SUNYS | 뉴스</title>
        <meta
          name="keywords"
          content="패션, 브랜드, 추천, 컬렉션, 뉴스, 웹매거진"
        />
        <meta
          name="description"
          content="서니즈는 패션 브랜드의 최신 정보를 제공하는 웹 서비스입니다. 브랜드별 컬렉션 뉴스를 확인해 보세요."
        />

        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/sunys-1dcf2.appspot.com/o/og_image.png?alt=media&token=adaa046e-ec2d-466a-9e40-828afe0bee71"
        />
        <meta property="og:title" content="SUNYS | 서니즈 매거진" />
        <meta
          property="og:description"
          content="서니즈는 패션 브랜드의 최신 정보를 제공하는 웹 서비스입니다. 브랜드별 컬렉션 뉴스를 확인해 보세요."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://sunys.co.kr" />
      </Head>

      <NewsList />
    </>
  );
}
