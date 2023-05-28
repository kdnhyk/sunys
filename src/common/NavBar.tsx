import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import LoginModal from "./LoginModal";
import { useRouter } from "next/router";
import Link from "next/link";
import useModal from "@/hooks/useModal";

export default function NavBar() {
  const { user } = useAuth();
  const { isModal, onOpenModal, onCloseModal } = useModal();
  const path = useRouter().pathname.split("/")[1] || "news";

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
    onCloseModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return (
    <NavBarBlock>
      {menu.map((e, i) => (
        <Link href={e.path} key={i} onClick={() => scrollToTop(e.path)}>
          <h3>{e.name}</h3>
        </Link>
      ))}
      {!user.uid ? (
        <div className="AccountButtonWrap" onClick={onOpenModal}>
          <h3>로그인</h3>
        </div>
      ) : (
        <Link href="/account" onClick={() => scrollToTop("/account")}>
          <h3>프로필</h3>
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
      {isModal && <LoginModal exitModal={onCloseModal} />}
    </NavBarBlock>
  );
}

const NavBarBlock = styled.nav`
  width: 100%;
  height: 50px;
  display: flex;

  a,
  .AccountButtonWrap {
    height: 50px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    border-right: 1px solid var(--line-color);
    cursor: pointer;

    h3 {
    }
  }

  .CartWrap {
    flex: 0 50px;
    border-right: none;
    .Cart {
      width: 30px;
      height: 30px;
      border: 1px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
