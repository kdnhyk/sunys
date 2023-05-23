import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Account() {
  const { user, signout } = useAuth();
  const router = useRouter();

  const onSignout = () => {
    signout();
    router.push("/");
  };

  const exitPage = () => {
    router.push("/");
  };

  useEffect(() => {
    if (!user.uid) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>SUNYS | 프로필</title>
        <meta name="description" content="개인 계정 정보" />
      </Head>
      <AccountBlock>
        <p>{user.username}</p>
        <p className="Logout" onClick={onSignout}>
          Logout
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

  .Logout {
    color: #f33131;
    cursor: pointer;
  }
`;
