import styled from "styled-components";
import Button from "./components/Button";
import { useAuth } from "../hooks/useAuth";
import UnderLineBox from "./components/TitleBox";
import { useNavigate } from "react-router-dom";

interface IsLoginModal {
  exitModal: () => void;
}

export default function LoginModal({ exitModal }: IsLoginModal) {
  const nav = useNavigate();
  const { loginWithGoogle } = useAuth();
  const onGoogleLogin = () => {
    loginWithGoogle();
    exitModal();
    // nav("/");
  };

  return (
    <LoginModalBlock>
      <div className="HeaderWrap">
        <h2>Signin</h2>
        <div className="ButtonWrap">
          <div></div>
          <div></div>
          <div className="CloseBtn" onClick={exitModal}></div>
        </div>
      </div>
      <div className="MainWrap">
        <UnderLineBox>LOGIN</UnderLineBox>
        <div className="LoginWrap">
          <div className="Google" onClick={onGoogleLogin}>
            <p>LOGIN WITH GOOGLE</p>
          </div>
        </div>

        <Button onClick={exitModal} isActivated={false}>
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
  top: calc(50% - 150px - 50px);
  background-color: #eeeeee;

  display: flex;
  flex-direction: column;
  justify-content: center;

  border-width: 1px 1px 1px 1px;
  border-color: grey;
  border-style: solid;

  color: black;

  z-index: 1000;

  .HeaderWrap {
    padding: 10px 10px 10px 16px;
    border-bottom: 1px solid grey;
    display: flex;
    justify-content: space-between;
    background-color: #eeeeee;
    z-index: 1000;
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
    background-color: #eeeeee;
    z-index: 1000;
    .LoginWrap {
      width: 100%;
      margin-bottom: 40px;
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
    z-index: 100;
  }
`;
