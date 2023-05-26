import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="utf-8" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />

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

        {/* <meta
          name="naver-site-verification"
          content="ad17f2a0cf5bc90c17029a9a38adc62de09b2ef0"
        /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
