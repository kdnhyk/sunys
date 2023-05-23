import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { media } from "@/media";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import { useRouter } from "next/router";
import Link from "next/link";

export default function NavBar() {
  const { user } = useAuth();
  const path = useRouter().pathname.split("/")[1] || "news";
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const handleIsOpenLogin = () => {
    setIsOpenLogin((prev) => !prev);
  };

  const menu = [
    {
      name: "뉴스",
      path: "/",
    },
    {
      name: "브랜드",
      path: "/brand",
    },
    {
      name: "매거진",
      path: "/magazine",
    },
  ];

  const scrollToTop = (currentPath: string) => {
    if (path === currentPath.split("/")[1] || "news") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    setIsOpenLogin(false);
  }, [path]);

  return (
    <NavBarBlock>
      <div className="Empty"></div>
      {menu.map((e, i) => (
        <Link href={e.path} key={i} onClick={() => scrollToTop(e.path)}>
          <p>{e.name}</p>
        </Link>
      ))}
      {!user.uid ? (
        <div className="AccountButtonWrap" onClick={handleIsOpenLogin}>
          <p>로그인</p>
        </div>
      ) : (
        <Link href="/account" onClick={() => scrollToTop("/account")}>
          <p>프로필</p>
        </Link>
      )}
      <Link
        href={"/cart"}
        onClick={() => scrollToTop("cart")}
        className="CartWrap"
      >
        <div className="Cart">
          <p>{user.cart.length}</p>
        </div>
      </Link>
      {isOpenLogin && <LoginModal exitModal={handleIsOpenLogin} />}
    </NavBarBlock>
  );
}

const NavBarBlock = styled.nav`
  width: 100%;

  height: 48px;
  display: flex;

  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  color: black;

  .Empty {
    height: 48px;
    display: none;
    flex-grow: 2;
    border-right: 1px solid #dddddd;
    ${media.desktop`
      display: block
    `}
  }
  a,
  .AccountButtonWrap {
    height: 48px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-right: 1px solid #dddddd;
    cursor: pointer;

    &:hover {
      background-color: #eeeeee;
    }

    P {
      font-size: 13px;
      font-weight: 500;
    }
  }

  .CartWrap {
    flex-basis: 48px;
    flex-grow: 0;
    border-right: none;
    .Cart {
      width: 24px;
      height: 24px;
      border: 1px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
