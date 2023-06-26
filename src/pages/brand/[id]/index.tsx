import styled from "styled-components";
import { media } from "@/media";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useBrand, { getBrandByBrandName } from "@/api/brand/useBrandByBrandName";
import Head from "next/head";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import InfoArea from "@/containers/brand/InfoArea";
import { IsBrandName } from "@/types/brand";
import { getBrandList } from "@/api/brandList/useBrandList";

const CollectionArea = dynamic(
  () => import("@/containers/brand/CollectionArea"),
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
  const { brand, refetch } = useBrand(typeof id === "string" ? id : "");

  if (!brand) return <></>;

  return (
    <>
      <Head>
        <title>{brand.brandName}</title>
        <meta
          name="description"
          content={brand.brandNameKo + " | " + brand.description}
        />

        <meta property="og:image" content={brand.logo} />
        <meta property="og:title" content={brand.brandName} />
        <meta
          property="og:description"
          content={brand.brandNameKo + " | " + brand.description}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://sunys.co.kr/brand/*" />
      </Head>
      <BrandWrap>
        <div className="LeftSide">
          <InfoArea data={brand} refetch={refetch} />
        </div>

        <div className="RightSide">
          <CollectionArea data={brand} />
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
