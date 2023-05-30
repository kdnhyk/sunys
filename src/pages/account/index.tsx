import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { SettingIcon } from "@/asset/Icon";
import { media } from "@/media";

export default function Account() {
  const { user, logout, removeUser } = useAuth();
  const router = useRouter();

  const [isOpenSignout, setIsOpenSignout] = useState(false);

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
        <div className="LeftArea">
          <div className="ImageWrap">{/* <Image /> */}</div>
          <div className="NameWrap">
            <h3>{user.username}</h3>
          </div>
          <div className="LogoutWrap" onClick={onLogout}>
            <p className="Logout">로그아웃</p>
          </div>
        </div>
        <div className="RightArea"></div>
      </AccountBlock>
    </>
  );
}

const AccountBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .LeftArea {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 16px;

    .ImageWrap {
      width: 180px;
      height: 180px;

      border: 1px solid var(--line-color);
      border-radius: 12px;
    }

    .NameWrap {
      width: 220px;
      height: 70px;
      border: 1px solid var(--line-color);
      border-radius: 12px;

      display: flex;
      justify-content: center;
      align-items: center;

      h3 {
      }
    }

    .LogoutWrap {
      width: 220px;
      height: 70px;
      border: 1px solid var(--line-color);
      border-radius: 12px;

      display: flex;
      justify-content: center;
      align-items: center;

      cursor: pointer;
    }
  }

  ${media.desktop`
  flex-direction: row;

  position: fixed;
  height: calc(100% - 50px);

  .LeftArea {
    width: calc(40%);
    
    overflow-y: auto;
    border-right: 1px solid var(--line-color);
    padding-bottom: 40px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  

  .RightArea {
    width: calc(60%);
    height: 100%;
    overflow: auto;
  }
`}
`;
