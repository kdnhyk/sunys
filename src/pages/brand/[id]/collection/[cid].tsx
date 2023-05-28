import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import useLocationState from "@/hooks/useLocationState";
import useCollection, { getCollectionByCid } from "@/api/useCollection";
import useArticle from "@/api/useArticle";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";
import { media } from "@/media";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { SettingIcon } from "@/asset/Icon";

const Article = dynamic(() => import("@/components/Article"), {
  ssr: false,
});

export const getServerSideProps = async (context: {
  query: { cid: string };
}) => {
  const { cid } = context.query;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["collection", cid],
    () => getCollectionByCid(cid),
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

export default function Collection() {
  const { cid } = useRouter().query;
  const { data } = useCollection(typeof cid === "string" ? cid : "");
  const { user } = useAuth();
  const { data: articleData } = useArticle(typeof cid === "string" ? cid : "");

  const { onClickBarnd, onClickCollectionSetting } = useLocationState();

  const [diff, setDiff] = useState(0);

  useEffect(() => {
    if (!data) return;

    setDiff(() =>
      Math.ceil(
        (new Date(data.releaseDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );
  }, [data]);

  return (
    <>
      <Head>
        <title>{data.brandName + " | " + data.collectionName}</title>
        <meta
          name="description"
          content={data.brandNameko + "의 " + data.collectionName + " 컬렉션"}
        />

        <meta property="og:image" content={data.images[0]} />
        <meta property="og:title" content={data.brandName} />
        <meta
          property="og:description"
          content={data.collectionName + " | " + data.releaseDate}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://sunys.co.kr" />
      </Head>

      <CollectionWrap>
        <div className="MainArea">
          <div className="ImageWrap">
            <Image
              src={data.images[0]}
              alt=""
              width={600}
              height={600}
              priority
            />

            {diff > 0 && (
              <div className="DDayWrap">
                <p className="DDay">D - {diff}</p>
              </div>
            )}

            <div className="DateWrap">
              <p className="CollectionName">
                {`${data.releaseDate.replaceAll("-", ". ")}`}
              </p>
            </div>
          </div>

          <div className="InfoWrap">
            <div
              className="BrandName"
              onClick={() => onClickBarnd(data.brandName)}
            >
              <h1>{data.brandName}</h1>
            </div>

            <p className="CollectionName">{data.collectionName}</p>

            {user.admin && (
              <div
                className="Setting"
                onClick={() =>
                  onClickCollectionSetting(data.brandName, data.id)
                }
              >
                <SettingIcon />
              </div>
            )}
          </div>
        </div>

        <div className="ArticleListWrap">
          {articleData?.map((article, i) => (
            <div className="ArticleWrap" key={i}>
              <Article article={article} />
            </div>
          ))}
        </div>
      </CollectionWrap>
    </>
  );
}

const CollectionWrap = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  .MainArea {
    display: flex;
    flex-direction: column;
    align-items: center;
    .ImageWrap {
      width: 100%;
      height: auto;
      position: relative;

      img {
        width: 100%;
        height: auto;
        object-fit: contain;
      }
      .DDayWrap {
        position: absolute;
        top: 0px;
        left: 0px;

        width: 100%;
        height: calc(100% - 4px);

        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.3);

        .DDay {
          font-weight: 500;
          font-size: 20px;
          color: white;
        }
      }

      .DateWrap {
        position: absolute;
        bottom: 8px;
        right: 4px;
        background-color: white;
        p {
          color: #8e8e8e;
        }
      }
    }
    .InfoWrap {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding-bottom: 10px;
      /* border-bottom: 1px solid black; */
      .BrandName {
        cursor: pointer;
      }
      .CollectionName {
        color: #8e8e8e;
      }
      .Setting {
        cursor: pointer;
      }
    }
  }

  .ArticleListWrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: start;
    row-gap: 10px;
    column-gap: 1px;
    margin-bottom: 20px;

    @media (min-width: 600px) {
      grid-template-columns: repeat(1, 1fr);
    }
    @media (min-width: 680px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 940px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1320px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  ${media.desktop`
  flex-direction: row;

  position: fixed;
  height: calc(100% - 50px);

  .MainArea {
    width: calc(40%);
    
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  

  .ArticleListWrap {
    width: calc(60%);
    
    overflow: auto;
    padding-bottom: 40px;
  }
`}
`;
