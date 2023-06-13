import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="utf-8" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />

        <meta
          name="naver-site-verification"
          content="ad17f2a0cf5bc90c17029a9a38adc62de09b2ef0"
        />

        <Script
          type="text/javascript"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLOUD_CLIENT_ID}`}
          strategy="afterInteractive"
        ></Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
