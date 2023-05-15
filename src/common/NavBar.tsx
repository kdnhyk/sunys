import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Admin, Brand, Home, Scrap, Search } from "../asset/Icon";

interface IsNavBar {}

export default function NavBar({}: IsNavBar) {
  const path = useLocation().pathname.split("/")[1] || "news";

  const menu = [
    {
      name: "news",
      path: "/",
      isSelected: path === "news",
      icon: <Home isSelected={path === "news"} />,
    },
    {
      name: "Magaginze",
      path: "/magazine",
      isSelected: path === "magazine",
      icon: <Brand isSelected={path === "magazine"} />,
    },
    {
      name: "Brand",
      path: "/brand",
      isSelected: ["brand", "collection"].includes(path),
      icon: <Search isSelected={["brand", "collection"].includes(path)} />,
    },
    {
      name: "Scrap",
      path: "/scrap",
      isSelected: path === "scrap",
      icon: <Brand isSelected={path === "scrap"} />,
    },

    {
      name: "Account",
      path: "/account",
      isSelected: path === "account",
      icon: <Admin isSelected={path === "account"} />,
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
      <nav className="ModalInner">
        {menu.map((e, i) => (
          <Link to={e.path} key={i} onClick={() => scrollToTop(e.path)}>
            <div>{e.icon}</div>
            <p style={e.isSelected ? { color: "#314af3" } : {}}>{e.name}</p>
          </Link>
        ))}
      </nav>
    </NavBarBlock>
  );
}

const NavBarBlock = styled.div`
  position: fixed;
  bottom: 0px;
  background-color: #fcfcfc;
  z-index: 1000;

  .ModalInner {
    width: calc(100vw);

    height: 48px;
    background-color: #fcfcfc;
    display: flex;
    border-top: 1px solid #dddddd;
    /* border-top: none; */
    z-index: 100;

    a,
    .LoginWrap {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: end;
      padding-bottom: 2px;
      cursor: pointer;

      p {
        font-size: 10px;
        color: #8e8e8e;
      }
    }
  }

  .Background {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    /* background-color: #fcfcfc; */
  }
`;
