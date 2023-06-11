import styled from "styled-components";
import Header from "./Header";
import { media } from "@/media";

interface IsLayout {
  children: any;
}

export default function Layout({ children }: IsLayout) {
  return (
    <LayoutWrap>
      <Header />
      <main>{children}</main>
    </LayoutWrap>
  );
}

const LayoutWrap = styled.div`
  main {
    padding-bottom: 40px;
    padding-top: 0px;
    ${media.desktop`
      padding-top: 50px;
    `}
  }
`;
