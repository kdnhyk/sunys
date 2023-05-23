import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=6.0, user-scalable=0"
        />

        <meta name="description" content="서니즈 - 패션 브랜드 정보 매거진" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />

        <meta property="og:image" content="/SUNYS.png" />
        <meta property="og:site_name" content="서니즈(SUNYS)" />
        <meta property="og:description" content="패션 브랜드 정보 매거진" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="서니즈(SUNYS)" />
        <meta property="og:url" content="http://sunys.co.kr" />

        <meta
          name="naver-site-verification"
          content="ad17f2a0cf5bc90c17029a9a38adc62de09b2ef0"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
