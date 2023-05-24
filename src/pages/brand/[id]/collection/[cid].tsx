import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import useLocationState from "@/hooks/useLocationState";
import useCollection, { getCollectionByCid } from "@/pages/api/useCollection";
import useArticle from "@/pages/api/useArticle";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import dynamic from "next/dynamic";

const Article = dynamic(() => import("@/components/Article"), {
  ssr: false,
});

export const getServerSideProps = async (ctx: { params: { cid: string } }) => {
  const cid = ctx.params.cid;

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
  const { data, isLoading } = useCollection(typeof cid === "string" ? cid : "");
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

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>{data.collectionName}</title>
        <meta name="description" content="컬렉션 별 전체 상품" />
      </Head>
      <CollectionWrap>
        <div className="ImageWrap">
          <Image
            src={data.images[0]}
            alt=""
            width={400}
            height={400}
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
              onClick={() => onClickCollectionSetting(data.brandName, data.id)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.7359 12.5422L18.1915 11.2921C18.2646 10.8679 18.3023 10.4349 18.3023 10.0018C18.3023 9.56874 18.2646 9.13568 18.1915 8.71154L19.7359 7.46146C19.8524 7.36704 19.9358 7.2413 19.9749 7.10094C20.0141 6.96058 20.0072 6.81225 19.9552 6.67569L19.934 6.61765C19.5088 5.49263 18.8721 4.44972 18.0547 3.53931L18.0123 3.49243C17.9131 3.38205 17.7809 3.3027 17.6332 3.26484C17.4854 3.22698 17.3291 3.2324 17.1846 3.28036L15.2676 3.9255C14.5602 3.37635 13.7703 2.94328 12.9168 2.63969L12.5466 0.742239C12.5186 0.599466 12.4455 0.468118 12.3368 0.365645C12.2282 0.263173 12.0891 0.194426 11.9382 0.168538L11.8746 0.157377C10.6461 -0.052459 9.35393 -0.052459 8.12544 0.157377L8.06178 0.168538C7.91086 0.194426 7.77184 0.263173 7.66318 0.365645C7.55452 0.468118 7.48136 0.599466 7.45343 0.742239L7.08088 2.64862C6.23412 2.95228 5.44557 3.38511 4.74653 3.92996L2.81538 3.28036C2.67099 3.23201 2.51448 3.22641 2.36665 3.26429C2.21882 3.30217 2.08666 3.38174 1.98774 3.49243L1.9453 3.53931C1.12886 4.45036 0.492285 5.4931 0.0660269 6.61765L0.0448055 6.67569C-0.0613015 6.95472 0.0259421 7.26725 0.264093 7.46146L1.8274 8.72494C1.75431 9.14461 1.71894 9.57321 1.71894 9.99958C1.71894 10.4282 1.75431 10.8568 1.8274 11.2742L0.264093 12.5377C0.147601 12.6321 0.0642265 12.7579 0.0250554 12.8982C-0.0141157 13.0386 -0.00722707 13.1869 0.0448055 13.3235L0.0660269 13.3815C0.492813 14.5066 1.12474 15.5446 1.9453 16.4598L1.98774 16.5067C2.0869 16.6171 2.21907 16.6965 2.36681 16.7343C2.51455 16.7722 2.67095 16.7668 2.81538 16.7188L4.74653 16.0692C5.44919 16.6161 6.23438 17.0492 7.08088 17.3505L7.45343 19.2569C7.48136 19.3997 7.55452 19.531 7.66318 19.6335C7.77184 19.736 7.91086 19.8047 8.06178 19.8306L8.12544 19.8418C9.36521 20.0527 10.6348 20.0527 11.8746 19.8418L11.9382 19.8306C12.0891 19.8047 12.2282 19.736 12.3368 19.6335C12.4455 19.531 12.5186 19.3997 12.5466 19.2569L12.9168 17.3595C13.77 17.0567 14.5644 16.6222 15.2676 16.0737L17.1846 16.7188C17.329 16.7671 17.4855 16.7727 17.6334 16.7349C17.7812 16.697 17.9133 16.6174 18.0123 16.5067L18.0547 16.4598C18.8753 15.5424 19.5072 14.5066 19.934 13.3815L19.9552 13.3235C20.0613 13.0489 19.9741 12.7364 19.7359 12.5422ZM16.5173 8.97495C16.5763 9.31203 16.6069 9.65804 16.6069 10.004C16.6069 10.35 16.5763 10.6961 16.5173 11.0331L16.3617 11.9283L18.1231 13.3547C17.8561 13.9371 17.519 14.4884 17.1186 14.9977L14.9304 14.2633L14.19 14.8392C13.6265 15.2767 12.9993 15.6205 12.3202 15.8616L11.4218 16.1808L10.9998 18.3461C10.3338 18.4176 9.66147 18.4176 8.99552 18.3461L8.57345 16.1763L7.68215 15.8527C7.01014 15.6116 6.38529 15.2678 5.82646 14.8325L5.08607 14.2543L2.88376 14.9955C2.48291 14.4843 2.14808 13.9329 1.87928 13.3525L3.65952 11.9127L3.50625 11.0197C3.44966 10.6871 3.41901 10.3434 3.41901 10.004C3.41901 9.6625 3.4473 9.32096 3.50625 8.98835L3.65952 8.09543L1.87928 6.6556C2.14572 6.07297 2.48291 5.52382 2.88376 5.01262L5.08607 5.75375L5.82646 5.17558C6.38529 4.74028 7.01014 4.39651 7.68215 4.15542L8.57581 3.8362L8.99788 1.66641C9.66046 1.59498 10.3372 1.59498 11.0021 1.66641L11.4242 3.83174L12.3226 4.15096C12.9993 4.39205 13.6289 4.73582 14.1924 5.17335L14.9328 5.74928L17.121 5.01486C17.5218 5.52605 17.8566 6.07743 18.1254 6.65783L16.3641 8.08427L16.5173 8.97495ZM10.0024 5.85197C7.71045 5.85197 5.8524 7.61102 5.8524 9.78081C5.8524 11.9506 7.71045 13.7097 10.0024 13.7097C12.2943 13.7097 14.1523 11.9506 14.1523 9.78081C14.1523 7.61102 12.2943 5.85197 10.0024 5.85197ZM11.8698 11.5488C11.6249 11.7813 11.3338 11.9658 11.0133 12.0914C10.6928 12.2171 10.3493 12.2815 10.0024 12.281C9.29734 12.281 8.63476 12.0198 8.13487 11.5488C7.88923 11.3169 7.69445 11.0413 7.56172 10.7379C7.42899 10.4345 7.36093 10.1092 7.36147 9.78081C7.36147 9.11336 7.63735 8.48608 8.13487 8.01283C8.63476 7.53959 9.29734 7.28064 10.0024 7.28064C10.7074 7.28064 11.37 7.53959 11.8698 8.01283C12.1155 8.24472 12.3103 8.5203 12.443 8.82372C12.5757 9.12714 12.6438 9.4524 12.6432 9.78081C12.6432 10.4483 12.3674 11.0755 11.8698 11.5488Z"
                  fill="black"
                />
              </svg>
            </div>
          )}
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
  align-items: center;
  .ImageWrap {
    width: 100%;
    max-width: 768px;
    height: auto;
    position: relative;

    img {
      width: 100%;
      max-width: 768px;
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
  }
  .ArticleListWrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;

    column-gap: 1px;
    row-gap: 12px;

    padding-bottom: 40px;
    border-bottom: 1px solid #dddddd;

    @media (min-width: 605px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 885px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (min-width: 1165px) {
      grid-template-columns: repeat(5, 1fr);
    }
  }
`;
