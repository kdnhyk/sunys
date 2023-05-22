import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Admin, Brand, Home, Search } from "../asset/Icon";
import { useAuth } from "../hooks/useAuth";
import { media } from "../media";

interface IsNavBar {}

export default function NavBar({}: IsNavBar) {
  const { user } = useAuth();
  const path = useLocation().pathname.split("/")[1] || "news";

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
    {
      name: user.uid ? "프로필" : "로그인",
      path: "/account",
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

  return (
    <NavBarBlock>
      <div className="Empty"></div>
      {menu.map((e, i) => (
        <Link to={e.path} key={i} onClick={() => scrollToTop(e.path)}>
          <p>{e.name}</p>
        </Link>
      ))}
      <Link
        to={"/cart"}
        onClick={() => scrollToTop("cart")}
        className="CartWrap"
      >
        <div className="Cart">
          <p>{user.cart.length}</p>
        </div>
      </Link>
    </NavBarBlock>
  );
}

const NavBarBlock = styled.nav`
  width: 100%;

  height: 48px;
  display: flex;

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
  a {
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
