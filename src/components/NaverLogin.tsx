import { useAuth } from "@/hooks/useAuth";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const NaverLogin = () => {
  const { naver } = window;
  const { user, loginWithEmailAndPassword } = useAuth();

  const naverRef = useRef<any>(null);

  useEffect(() => {
    // 실행 안되게
    if (user.uid || !naver) return;

    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      // callbackUrl: process.env.REACT_APP_REDIRECT_URI,
      callbackUrl: "http://localhost:3000/account",
      isPopup: false,
      loginButton: { color: "green", type: 1, height: 50 },
    });

    naverLogin.init();
    naverLogin.logout();

    naverLogin.getLoginStatus((status: boolean) => {
      console.log(naverLogin);

      if (status) {
        console.log(naverLogin.user);
        loginWithEmailAndPassword({
          email: `Naver_${naverLogin.user.id}@sunys.co.kr`,
          password: naverLogin.user.id,
          displayName: naverLogin.user.name,
        });
      } else {
        console.log("error");
      }
    });
  }, []);

  const onClick = () => {
    console.log("click");
    console.log(naverRef);
    naverRef.current?.children[0].click();
  };

  return (
    <NaverLoginStyle>
      <div ref={naverRef} id="naverIdLogin"></div>
      <div onClick={onClick} className="LoginButton">
        <p>LOGIN WITH NAVER</p>
      </div>
    </NaverLoginStyle>
  );
};

export default NaverLogin;

const NaverLoginStyle = styled.div`
  #naverIdLogin {
    display: none;
  }
  .LoginButton {
    width: 100%;
    height: 40px;
    border: 1px solid grey;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
