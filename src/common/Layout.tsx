import { useMemo } from "react";
import styled from "styled-components";
import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { media } from "../media";

interface IsLayout {
  children: any;
}

export default function Layout({ children }: IsLayout) {
  const vh = useMemo(() => window.innerHeight * 0.01, []);

  return (
    <LayoutWrap vh={vh}>
      <Header />
      <main>{children}</main>
      <Footer />
    </LayoutWrap>
  );
}

const LayoutWrap = styled.div<{ vh: number }>`
  width: 100%;
  /* height: ${({ vh }) => `calc(${vh} * 100px)`}; */

  color: black;
  main {
    padding-top: 0px;
    ${media.desktop`
      padding-top: 48px;
    `}
  }
`;
