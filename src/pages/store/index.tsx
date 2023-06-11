import useRecentStoreList, {
  getRecentStoreList,
} from "@/api/store/useRecentStoreList";
import { AddIcon } from "@/asset/Icon";
import StoreArea from "@/containers/store/StoreArea";
import { useAuth } from "@/hooks/useAuth";
import useLocationState from "@/hooks/useLocationState";
import { media } from "@/media";
import { IsStore } from "@/types/store";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["recentStoreList"],
    () => getRecentStoreList(),
    {
      staleTime: Infinity,
    }
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default function Store() {
  const { user } = useAuth();
  const { onClickStoreSetting } = useLocationState();
  const { data } = useRecentStoreList();
  const { onClickBarnd } = useLocationState();

  const [selectedStore, setSelectedStore] = useState<IsStore | null>(null);

  const onClickStore = (store: IsStore) => {
    setSelectedStore(() => store);
  };

  if (!data) return <></>;

  return (
    <>
      <Head>
        <title>SUNYS | 스토어</title>
        <meta name="description" content="편집샵, 스토어" />

        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/sunys-1dcf2.appspot.com/o/og_image.png?alt=media&token=adaa046e-ec2d-466a-9e40-828afe0bee71"
        />
        <meta property="og:title" content="SUNYS" />
        <meta property="og:description" content="서니즈 | 스토어" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://sunys.co.kr/store" />
      </Head>
      <StoreWrap>
        <div className="LeftSide">
          {user.admin && (
            <div className="CreateStoreButtonwrap">
              <div
                className="CreateStoreButton"
                onClick={() => onClickStoreSetting()}
              >
                <AddIcon />
              </div>
            </div>
          )}

          <div className="StoreListWrap">
            {data.map((e, i) => {
              return (
                <div
                  className="StoreWrap"
                  onClick={() => onClickStore(e)}
                  key={i}
                >
                  <StoreArea store={e} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="RightSide"></div>
      </StoreWrap>
    </>
  );
}

const StoreWrap = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  .LeftSide {
    display: flex;
    flex-direction: column;

    .CreateStoreButtonwrap {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: end;
      align-items: center;

      padding: 0px 12px;
      border-bottom: 1px solid var(--line-color);

      .CreateStoreButton {
        height: 24px;
        cursor: pointer;
      }
    }

    .StoreListWrap {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
      padding: 20px 12px;

      .StoreWrap {
        width: 160px;
        height: 160px;
        border: 1px solid var(--line-color);
      }
    }

    .MainStoreWrap {
      .ImageWrap {
        img {
          object-fit: contain;
        }
      }
    }
  }

  ${media.desktop`
    flex-direction: row;

    position: fixed;
    height: calc(100% - 50px);

    .LeftSide {
      position: relative;
      width: 40%;

      border-right: 1px solid var(--line-color);


    }

    .RightSide {
      width: 60%;
    }
  `}
`;
