import styled from "styled-components";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/Button";

interface IsLoginModal {
  exitModal: () => void;
}

export default function LoginModal({ exitModal }: IsLoginModal) {
  const { loginWithGoogle, successs } = useAuth();

  const onGoogleLogin = async () => {
    await loginWithGoogle();
  };

  useEffect(() => {
    if (successs) {
      exitModal();
    }
  }, [exitModal, successs]);

  return (
    <LoginModalBlock>
      <div className="HeaderWrap">
        <h2>Login</h2>
        <div className="ButtonWrap">
          <div></div>
          <div></div>
          <div className="CloseBtn" onClick={exitModal}></div>
        </div>
      </div>
      <div className="MainWrap">
        <div className="TitleWrap">
          <h1>SIGNIN</h1>
        </div>

        <div className="LoginWrap">
          <div className="Google" onClick={onGoogleLogin}>
            <p>LOGIN WITH GOOGLE</p>
          </div>
          {/* <NaverLogin /> */}
        </div>

        <Button onClick={exitModal} isBlack={false}>
          CANCEL
        </Button>
      </div>
      <div className="Background" onClick={exitModal}></div>
    </LoginModalBlock>
  );
}
const LoginModalBlock = styled.form`
  position: relative;
  width: 300px;
  position: fixed;
  left: calc(50% - 150px);
  top: calc(50% - 150px);
  background-color: #fcfcfc;

  display: flex;
  flex-direction: column;
  justify-content: center;

  border-width: 1px 1px 1px 1px;
  border-color: grey;
  border-style: solid;

  color: black;

  z-index: 200;

  .HeaderWrap {
    padding: 10px 10px 10px 16px;
    border-bottom: 1px solid grey;
    display: flex;
    justify-content: space-between;
    background-color: #fcfcfc;
    z-index: 100;

    h2 {
      font-weight: 400;
    }

    .ButtonWrap {
      display: flex;
      align-items: center;
      gap: 6px;
      div {
        width: 12px;
        height: 12px;
        background-color: #666666;
        border-radius: 20px;
      }
      .CloseBtn {
        background-color: #f35e5e;
        cursor: pointer;
      }
    }
  }

  .MainWrap {
    padding: 40px 16px 16px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: #fcfcfc;
    z-index: 200;

    .TitleWrap {
      border-bottom: 1px solid var(--line-color);
      height: 28px;
      padding: 0px 8px;
      margin-bottom: 20px;
      h2 {
        font-weight: 400;
      }
    }
    .LoginWrap {
      width: 100%;
      margin-bottom: 30px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      .Google {
        width: 100%;
        height: 40px;
        border: 1px solid grey;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
  }

  .Background {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgb(0, 0, 0, 0.2);
  }
`;
