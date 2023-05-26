import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import { media } from "@/media";

interface IsLayout {
  children: any;
}

export default function Layout({ children }: IsLayout) {
  return (
    <LayoutWrap>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </LayoutWrap>
  );
}

const LayoutWrap = styled.div`
  width: 100%;

  color: black;
  main {
    padding-top: 0px;
    ${media.desktop`
      padding-top: 48px;
    `}
  }
`;
