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
          <div className="SettingWrap">{/* <Image /> */}</div>
          <div className="NameWrap">
            <h3>{user.username}</h3>
          </div>
          <div className="LogoutWrap">
            <p>로그아웃</p>
          </div>
          {/* <div className="MyBrandWrap">
            {user.scrapBrandList.map((e, i) => (
              <div key={i}>hi</div>
            ))}
          </div> */}
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
    align-items: center;
    gap: 16px;
    padding: 16px;

    .SettingWrap {
    }

    .NameWrap {
      h3 {
      }
    }

    .LogoutWrap {
      cursor: pointer;
      p {
        color: var(--red-color);
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
