import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const NaverLogin = () => {
  const { naver } = window;
  const { loginWithEmailAndPassword } = useAuth();
  const router = useRouter();
  const naverRef = useRef<any>(null);

  useEffect(() => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      // callbackUrl: process.env.REACT_APP_REDIRECT_URI,
      callbackUrl: "http://localhost:3008/account",
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
        router.push("/account");
      } else {
        console.log("error");
      }
    });
  }, []);

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
