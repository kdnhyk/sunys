import styled from "styled-components";
import { media } from "@/media";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useBrand, { getBrandByBrandName } from "@/api/brand/useBrand";
import Head from "next/head";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import InfoArea from "@/components/brand/InfoArea";
import { IsBrandName } from "@/types/brand";
import { getBrandList } from "@/api/brandList/useBrandList";

const CollectionArea = dynamic(
  () => import("@/components/brand/CollectionArea"),
  {
    ssr: false,
  }
);

export const getStaticPaths = async () => {
  const brandList = await getBrandList();
  const paths = brandList.map((e: IsBrandName) => ({
    params: {
      id: e.default,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const { id } = params.id;
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

  if (!data) return <></>;

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
        <meta property="og:url" content="http://sunys.co.kr/brand/*" />
      </Head>
      <BrandWrap>
        <div className="LeftSide">
          <InfoArea data={data} />
        </div>

        <div className="RightSide">
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

    .LeftSide {
      width: 40%;
      border-right: 1px solid var(--line-color);
    }
    .RightSide {
      width: 60%;
      border-bottom: 1px solid var(--line-color);


    }
  `}
`;
