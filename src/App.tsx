import { Outlet, useLocation } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Layout from "./common/Layout";
import { Suspense, useEffect } from "react";
import { useBrandList } from "./hooks/useBrandList";
import Loading from "common/components/Loading";

export default function App() {
  const { pathname } = useLocation();
  const { brandList, getBrandList } = useBrandList();

  //
  useEffect(() => {
    if (brandList.length === 0) {
      getBrandList();
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {}, []);

  return (
    <>
      <GlobalStyle />
      <Layout>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Layout>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
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
    font-family: montserrat;
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
    font-size: 16px;
    font-weight: 500;
  }
  h2 {
    font-size: 15px;
    font-weight: 500;
  }
  h3 {
    font-size: 14px;
    font-weight: 400;
  }
  p {
    font-size: 13px;
  }

  @font-face {
      font-family: "montserrat";
      src: url("../font/Montserrat-VariableFont_wght.ttf");
      font-display: swap;
    }
`;
