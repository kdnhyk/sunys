import { useMemo } from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

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
  height: ${({ vh }) => `calc(${vh} * 100px)`};
  /* position: fixed; */

  color: black;
  background-color: #eeeeee;
  main {
    /* overflow-y: auto; */
  }
`;
