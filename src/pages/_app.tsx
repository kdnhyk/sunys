import Layout from "@/common/Layout";
import * as gtag from "@/lib/gtag";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { RecoilRoot, RecoilEnv } from "recoil";
import { createGlobalStyle } from "styled-components";
import Script from "next/script";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import Head from "next/head";
import Loading from "@/components/Loading";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

declare global {
  interface Window {
    Kakao: any;
    naver: any;
    gtag: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            suspense: true,
          },
        },
      })
  );

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Suspense fallback={<Loading />}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      ></Script>
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js"></Script>
      <RecoilRoot>
        <QueryClientProvider client={client}>
          <ReactQueryDevtools />
          <Hydrate state={pageProps.dehydratedState}>
            <GlobalStyle />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </Suspense>
  );
}

const GlobalStyle = createGlobalStyle`
  :root {
    --line-color: #666666;
    --border-color: #dddddd;
    --placeholder-color: #8E8E8E;
    --background-color: #fcfcfc;
    }
  body {
    padding: 0;
    margin: 0;
    font-size: 16px;
    background-color: #fcfcfc;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: pretendard;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  li {
    list-style: none;
  }

  button {
    background-color: white;
    border: none;
  }

  input {
    border: none;
  }

  h1 {
    font-size: 17px;
    font-weight: 600;
  }
  h2 {
    font-size: 16px;
    font-weight: 500;
  }
  h3 {
    font-size: 15px;
    font-weight: 400;
  }
  p {
    font-size: 14px;
  }

  @font-face {
      font-family: "montserrat";
      src: url("/font/Montserrat-VariableFont_wght.ttf");
      font-display: swap;
    }

    @font-face {
      font-family: "pretendard";
      src: url("/font/PretendardVariable.woff2");
      font-display: swap;
    }
`;
