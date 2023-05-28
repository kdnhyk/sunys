import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Account() {
  const { user, logout, removeUser } = useAuth();
  const router = useRouter();

  const onLogout = () => {
    logout();
    router.push("/");
  };

  const onDeleteUser = () => {
    removeUser();
    router.push("/");
  };

  // useEffect(() => {
  //   if (!localStorage.getItem("user")) {
  //     router.push("/");
  //   }
  // }, []);

  return (
    <>
      <Head>
        <title>SUNYS | 프로필</title>
        <meta name="description" content="개인 계정 정보" />
      </Head>
      <AccountBlock>
        <p>{user.username}</p>
        <p className="Logout" onClick={onLogout}>
          로그아웃
        </p>
        <p className="Signout" onClick={onDeleteUser}>
          회원탈퇴
        </p>
      </AccountBlock>
    </>
  );
}

const AccountBlock = styled.div`
  padding: 40px 16px 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  .Signout {
    color: #f33131;
    cursor: pointer;
  }
`;
