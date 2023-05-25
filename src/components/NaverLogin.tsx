import { useAuth } from "@/hooks/useAuth";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const NaverLogin = () => {
  const { naver } = window;
  const { loginWithEmailAndPassword } = useAuth();
  const naverRef = useRef<any>(null);

  useEffect(() => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      // callbackUrl: process.env.REACT_APP_REDIRECT_URI,
      callbackUrl: "http://localhost:3002/account",
      isPopup: false,
      loginButton: { color: "green", type: 1, height: 50 },
    });

    naverLogin.init();
    naverLogin.logout();

    // if (naverLogin.accessToken) {
    naverLogin.getLoginStatus(async (status: boolean) => {
      console.log(status);

      if (status) {
        console.log(naverLogin.user);
        await loginWithEmailAndPassword({
          email: `Naver_${naverLogin.user.id}@sunys.co.kr`,
          password: naverLogin.user.id,
          displayName: naverLogin.user.name,
        });
      } else {
        console.log("error");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // let naver_api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
  //   process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
  // }&redirect_uri=${encodeURI(
  //   "http://localhost:3002/account"
  // )}&state=${Math.random().toString(36).substr(3, 14)}`;

  const onClick = () => {
    if (!naverRef || !naverRef.current || !naverRef.current.children) return;

    naverRef.current?.children[0]?.click();
  };

  return (
    <NaverLoginStyle>
      <div ref={naverRef} id="naverIdLogin" />
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
