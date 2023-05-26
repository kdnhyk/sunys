import styled from "styled-components";
import { media } from "@/media";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";
import useBrand from "@/api/useBrand";
import Head from "next/head";

const InfoArea = dynamic(() => import("@/components/brand/InfoArea"), {
  ssr: false,
});

const CollectionArea = dynamic(
  () => import("@/components/brand/CollectionArea"),
  {
    ssr: false,
  }
);

export default function Brand() {
  const { id } = useRouter().query;
  const { data } = useBrand(typeof id === "string" ? id : "");

  if (!data) {
    return false;
  }

  return (
    <>
      <Head>
        <title>{data.brandName}</title>
        <meta
          name="description"
          content={data.brandNameKo + " | " + data.description}
        />

        <meta property="og:image" content={data.logo} />
        <meta
          property="og:description"
          content={data.brandNameKo + " | " + data.description}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={data.brandName} />
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
      width: 220px;
      flex-grow: 2;
      border-right: 1px solid #dddddd;
      .SaleWrap {
      }
    }
    .CollectionArea {
      width: 174px;
      flex-grow: 4;
    }
  `}
`;
