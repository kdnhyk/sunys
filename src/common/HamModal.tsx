import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import LoginModal from "./LoginModal";

interface IsHamModal {
  closeModal: () => void;
}

export default function HamModal({ closeModal }: IsHamModal) {
  const path = useLocation().pathname.split("/")[1] || "main";
  const { user } = useAuth();

  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

  const handleIsLoginModal = () => {
    setIsOpenLoginModal((prev) => !prev);
  };

  const menu = [
    {
      id: 0,
      name: "MAIN",
      path: "/",
    },
    {
      id: 1,
      name: "BRAND",
      path: "/brand",
    },
    {
      id: 2,
      name: "EMPTY",
      path: "/",
    },
  ];

  return (
    <HamModalBlock>
      <div className="ModalInner">
        {menu.map((e, i) => (
          <Link
            to={e.path}
            key={i}
            style={
              path.toUpperCase() === e.name
                ? { backgroundColor: "#dddddd" }
                : {}
            }
          >
            <p>{e.name}</p>
          </Link>
        ))}
        {user.uid ? (
          <Link to="/account">
            <p>ACCOUNT</p>
          </Link>
        ) : (
          <div className="Login" onClick={handleIsLoginModal}>
            <p>LOGIN</p>
          </div>
        )}
      </div>
      {isOpenLoginModal && <LoginModal exitModal={handleIsLoginModal} />}
      <div className="Background" onClick={closeModal}></div>
    </HamModalBlock>
  );
}

const HamModalBlock = styled.div`
  background-color: #eeeeee;
  color: #314af3;
  .ModalInner {
    position: absolute;
    left: -16px;
    width: calc(100vw);

    height: 40px;
    background-color: #eeeeee;
    display: flex;
    border-bottom: 1px solid #dddddd;
    /* border-top: none; */
    z-index: 100;

    a {
      width: 100%;
      padding: 14px 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background-color: #d9d9d9;
      }
      p {
        font-size: 12px;
      }
    }
    .Login {
      width: 100%;
      padding: 14px 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background-color: #d9d9d9;
      }
      p {
        font-size: 11px;
        /* font-weight: 600; */
      }
    }
  }

  .Background {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    /* background-color: #eeeeee; */
  }
`;
