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
          <div className="InfoArea">
            <div className="ImageWrap">{/* <Image /> */}</div>
            <div className="NameWrap">
              <h3>{user.username}</h3>
            </div>
            <div className="LogoutWrap" onClick={onLogout}>
              <p className="Logout">로그아웃</p>
            </div>
          </div>
          <div className="EmptyArea">
            <div className="SettingWrap">
              <SettingIcon />
            </div>
            <div className="Empty1">
              {/* <p
                className="Signout"
                onClick={() => setIsOpenSignout((prev) => !prev)}
              >
                회원탈퇴
              </p> */}
            </div>
            <div className="Empty2"></div>
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
    gap: 16px;
    padding: 16px;
    .InfoArea {
      .ImageWrap {
        width: 180px;
        height: 180px;

        border: 1px solid var(--line-color);
        border-radius: 12px;
        margin-bottom: 16px;
      }

      .NameWrap {
        width: 180px;
        height: 70px;
        border: 1px solid var(--line-color);
        border-radius: 12px;

        display: flex;
        justify-content: center;
        align-items: center;

        margin-bottom: 66px;

        h3 {
        }
      }

      .LogoutWrap {
        width: 180px;
        height: 70px;
        border: 1px solid var(--line-color);
        border-radius: 12px;

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
      }
    }

    .EmptyArea {
      flex: 1;
      height: 100%;
      .SettingWrap {
        float: right;
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: end;
        margin-bottom: 12px;

        cursor: pointer;
      }

      .Empty1 {
        width: 100%;
        height: 280px;
        border: 1px solid var(--line-color);
        border-radius: 12px;

        display: flex;
        flex-direction: column;
        gap: 16px;
        justify-content: center;
        align-items: center;

        margin-bottom: 16px;
      }

      .Empty2 {
        width: 100%;
        height: 240px;
        border: 1px solid var(--line-color);
        border-radius: 12px;

        display: flex;
        flex-direction: column;
        gap: 16px;
        justify-content: center;
        align-items: center;
      }
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
