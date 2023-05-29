import styled from "styled-components";
import { media } from "@/media";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useBrand, { getBrandByBrandName } from "@/api/useBrand";
import Head from "next/head";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import InfoArea from "@/components/brand/InfoArea";

const CollectionArea = dynamic(
  () => import("@/components/brand/CollectionArea"),
  {
    ssr: false,
  }
);

export const getServerSideProps = async (context: {
  query: { id: string };
}) => {
  const { id } = context.query;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["brand", id],
    () => getBrandByBrandName(id),
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

export default function Brand() {
  const { id } = useRouter().query;
  const { data } = useBrand(typeof id === "string" ? id : "");

  return (
    <>
      <Head>
        <title>{data.brandName}</title>
        <meta
          name="description"
          content={data.brandNameKo + " | " + data.description}
        />

        <meta property="og:image" content={data.logo} />
        <meta property="og:title" content={data.brandName} />
        <meta
          property="og:description"
          content={data.brandNameKo + " | " + data.description}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://sunys.co.kr" />
      </Head>
      <BrandWrap>
        <div className="InfoArea">
          <InfoArea data={data} />
        </div>

        <div className="CollectionArea">
          <CollectionArea data={data} />
        </div>
      </BrandWrap>
    </>
  );
}

const BrandWrap = styled.div`
  display: flex;
  flex-direction: column;

  ${media.desktop`
    flex-direction: row;

    .InfoArea {
      width: 40%;
      border-right: 1px solid var(--line-color);
    }
    .CollectionArea {
      width: 60%;
      border-bottom: 1px solid var(--line-color);
    }
  `}
`;
