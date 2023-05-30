import styled, { css } from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import { media } from "@/media";
import Link from "next/link";
import Logo from "@/asset/Logo.png";
import Image from "next/image";

export default function Header() {
  const [isFixHeader, setIsFixHeader] = useState(false);
  const [currentY, setCurrentY] = useState(0);

  const targetRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (window.scrollY >= 50) {
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
      <div className="LogoArea">
        <Link href={"/"}>
          <Image src={Logo} alt={""} width={129} height={44} priority></Image>
        </Link>
        <div className="EmptyArea"></div>
      </div>

      <div className="NavBarArea">
        <NavBar />
      </div>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div<{ isFixHeader: boolean }>`
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;

  background-color: var(--background-color);
  z-index: 100;

  .LogoArea {
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;

    z-index: 100;

    a {
      flex: 4;
      display: flex;
      justify-content: center;

      cursor: pointer;

      svg {
        width: 100%;
        height: 80px;
      }
    }

    .EmptyArea {
    }
  }

  .NavBarArea {
    width: 100%;

    align-items: center;
    border-top: 1px solid var(--line-color);
    border-bottom: 1px solid var(--line-color);

    background-color: var(--background-color);

    z-index: 100;

    ${({ isFixHeader }) =>
      isFixHeader &&
      css`
        position: fixed;
        top: 0px;
        /* animation: slideNav 0.2s ease-in-out;
        /* border-top: none; */
        @keyframes slideNav {
          0% {
            top: -50px;
          }
          100% {
            top: 0px;
          }
        } */
      `}
  }

  ${media.desktop`
    height: 50px;
    flex-direction: row;
    position: fixed;
    top: 0px;

    .LogoArea {
      height: 50px;
      justify-content: start;

      border-bottom: 1px solid var(--line-color);
      border-right: 1px solid var(--line-color);

      width: 40%;

      a{
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 0 220px;
        svg {
        }
      }

      .EmptyArea {
        position: static;
        width: auto;
        right: none;
        flex: 1 0 0;
        height: 50px;

        border-left: 1px solid var(--line-color);
      }
    }

 

    .NavBarArea {
      position: relative;
      border-top: none;

      width: 60%;
    }
  `}
`;
