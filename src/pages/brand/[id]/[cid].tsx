import styled from "styled-components";
import useCollection, {
  getCollectionByCid,
} from "@/api/collection/useCollection";
import useArticle from "@/api/article/useArticle";
import { useRouter } from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";
import { media } from "@/media";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import MainArea from "@/components/collection/MainArea";

const Article = dynamic(() => import("@/components/collection/Article"), {
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
  const { data: articleData } = useArticle(typeof cid === "string" ? cid : "");

  if (!data) return <></>;

  return (
    <>
      <Head>
        <title>{data.brandName + " | " + data.collectionName}</title>
        <meta
          name="description"
          content={data.brandName + " | " + data.collectionName}
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

      <CollectionStyle>
        <div className="MainAreaWrap">
          <MainArea collection={data} />
        </div>

        <div className="ArticleListWrap">
          {articleData?.map((article, i) => (
            <div className="ArticleWrap" key={i}>
              <Article article={article} />
            </div>
          ))}
        </div>
      </CollectionStyle>
    </>
  );
}

const CollectionStyle = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  .MainAreaWrap {
  }

  .ArticleListWrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    row-gap: 10px;

    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1320px) {
      grid-template-columns: repeat(4, 1fr);
    }

    .ArticleWrap {
    }
  }

  ${media.desktop`
  flex-direction: row;

  position: fixed;
  height: calc(100% - 50px);

  .MainAreaWrap {
    width: calc(40%);
    
    overflow-y: auto;
    border-right: 1px solid var(--line-color);
    padding-bottom: 40px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  

  .ArticleListWrap {
    width: calc(60%);
    height: 100%;
    overflow: auto;
    align-content: start;

    .ArticleWrap {
    }
  }
`}
`;
