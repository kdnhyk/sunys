import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import LoginModal from "./LoginModal";
import LogoArea from "./LogoArea";
import { Cart } from "../asset/Icon";
import { useAuth } from "../hooks/useAuth";

interface IsHeader {}

export default function Header({}: IsHeader) {
  const { user } = useAuth();
  const path = useLocation().pathname.split("/")[1] || "news";

  const [isFixHeader, setIsFixHeader] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

  const handleIsLoginModal = () => {
    setIsOpenLoginModal((prev) => !prev);
  };

  const targetRef = useRef(null);
  const handleScroll = useCallback(() => {
    // console.log("scrolling");

    // console.log(window.scrollY);
    if (window.scrollY > 96) {
      setIsFixHeader(() => true);
    } else {
      setIsFixHeader(() => false);
    }
  }, []);

  useLayoutEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
    }, 300);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <HeaderWrap isFixHeader={isFixHeader} ref={targetRef}>
      <LogoArea />

      <div className="HeaderInner">
        {isFixHeader ? (
          <div className="FixedBar">
            <div className="NavName">
              <h1>{path[0].toUpperCase() + path.slice(1)}</h1>

              <div className="Cart">
                <Cart num={user.cart.length} />{" "}
              </div>
            </div>
          </div>
        ) : (
          <div className="EmptyBar">
            <div className="Cart">
              <Cart num={user.cart.length} />
            </div>
          </div>
        )}
      </div>
      {isOpenLoginModal && <LoginModal exitModal={handleIsLoginModal} />}
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div<{ isFixHeader: boolean }>`
  position: relative;
  height: 146px;
  display: flex;
  flex-direction: column;
  color: #314af3;
  z-index: 100;
  background-color: #fcfcfc;

  .HeaderInner {
    position: ${({ isFixHeader }) => (isFixHeader ? "fixed" : "absolute")};
    width: 100%;
    background-color: #fcfcfc;
    z-index: 100;
    top: ${({ isFixHeader }) => (isFixHeader ? "0px" : "96px")};
    height: 50px;
    display: flex;
    flex-direction: column;

    align-items: center;
    transition: border 0.1s ease-out;
    /* border-bottom: ${({ isFixHeader }) =>
      isFixHeader ? "1px solid #dddddd" : "1px solid #fcfcfc"}; */
    background-color: rgb(252, 252, 252, 0.8);

    .FixedBar {
      width: 100%;
      height: 50px;
      position: relative;
      transition: opacity 0.1s ease-out;
      display: flex;
      justify-content: center;
      align-items: center;

      .NavName {
        h1 {
          opacity: ${({ isFixHeader }) => (isFixHeader ? "1" : "0")};
          font-weight: 600;
          font-size: 18px;
        }
        .Cart {
          position: absolute;
          top: 7px;
          right: 8px;
        }
      }
    }
    .EmptyBar {
      width: 100%;
      height: 50px;
      .Cart {
        position: absolute;
        top: 7px;
        right: 8px;
      }
    }
  }
`;
