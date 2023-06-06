import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { SettingIcon, XIcon } from "@/asset/Icon";
import { media } from "@/media";
import UserColllectoinList from "@/components/account/UserCollectionList";
import NewsHeader from "@/components/account/UserFilter";

export default function Account() {
  const { user, logout, removeUser } = useAuth();
  const router = useRouter();

  const [isOpenSetting, setIsOpenSetting] = useState(false);

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

  if (!user.uid) return <></>;

  return (
    <>
      <Head>
        <title>SUNYS | 프로필</title>
        <meta name="description" content="개인 계정 정보" />
      </Head>
      <AccountBlock>
        <div className="LeftArea">
          <div
            className="SettingButtonWrap"
            onClick={() => setIsOpenSetting((prev) => !prev)}
          >
            {isOpenSetting ? <XIcon /> : <SettingIcon />}
          </div>
          <div className="TitleWrap">
            <h3>{user.username}</h3>
            <p>스크랩 브랜드 | {user.scrapBrandList.length}</p>
          </div>

          {!isOpenSetting ? (
            <div className="ScrapBrandCollectionListWrap">
              <NewsHeader />
              <UserColllectoinList user={user} />
            </div>
          ) : (
            <div className="SettingWrap">
              {/* <div className="SettingHeader">
                <h3>설정</h3>
              </div> */}
              <div className="LogoutWrap">
                <p onClick={onLogout}>로그아웃</p>
              </div>
            </div>
          )}
        </div>
        <div className="RightArea">
          <div className="UserCollectionWrap"></div>
        </div>
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
    align-items: end;

    padding: 16px 0px;

    .SettingButtonWrap {
      padding-right: 16px;
      cursor: pointer;
      svg {
      }
    }

    .TitleWrap {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;

      padding-bottom: 46px;
      border-bottom: 1px solid var(--line-color);
      h3 {
      }
    }

    .SettingWrap {
      width: 100%;

      display: flex;
      flex-direction: column;
      gap: 16px;
      justify-content: center;
      align-items: center;

      padding: 16px 0px;

      .SettingHeader {
        width: 100%;
        border-bottom: 1px solid var(--line-color);

        padding: 0px 16px 16px 16px;
        h3 {
        }
      }

      .LogoutWrap {
        p {
          color: var(--red-color);
          cursor: pointer;
        }
      }
    }

    .ScrapBrandCollectionListWrap {
      width: 100%;
      height: 100%;
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
