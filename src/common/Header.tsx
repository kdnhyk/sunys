import styled, { css } from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import LogoArea from "./LogoArea";
import NavBar from "./NavBar";
import { media } from "@/media";

export default function Header() {
  const [isFixHeader, setIsFixHeader] = useState(false);

  const targetRef = useRef(null);

  const handleScroll = useCallback(() => {
    // console.log("scroll");
    if (window.scrollY > 81) {
      setIsFixHeader(() => true);
    } else {
      setIsFixHeader(() => false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <HeaderWrap isFixHeader={isFixHeader} ref={targetRef}>
      <LogoArea />

      <div className="FixedBar">
        <NavBar />
      </div>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div<{ isFixHeader: boolean }>`
  width: 100%;
  position: relative;
  height: 129px;
  display: flex;
  flex-direction: column;
  color: #314af3;
  background-color: #fcfcfc;
  z-index: 1000;

  .FixedBar {
    width: 100%;
    position: absolute;
    z-index: 200;
    top: 81px;
    height: 48px;
    display: flex;
    flex-direction: column;

    align-items: center;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;

    /* transition: border 0.1s ease-out; */

    background-color: #fcfcfc;

    ${({ isFixHeader }) =>
      isFixHeader &&
      css`
        position: fixed;
        top: 0px;
        border-top: none;
      `}
  }

  ${media.desktop`
    height: 48px;
    flex-direction: row;
    position: fixed;
    top: 0px;

    .FixedBar {
      position: relative;
      top: 0px;
    }
  `}
`;
