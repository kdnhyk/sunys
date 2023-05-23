import styled from "styled-components";
import { media } from "../../../media";
import InfoArea from "../../../components/brand/InfoArea";
import CollectionArea from "../../../components/brand/CollectionArea";
import { useRouter } from "next/router";
import Head from "next/head";

//
export default function Brand() {
  const { id } = useRouter().query;

  if (!id) {
    return <div></div>;
  }

  return (
    <>
      <Head>
        <title>{typeof id === "string" ? id : ""}</title>
        <meta
          name="description"
          content={typeof id === "string" ? id + "의 상세 정보" : ""}
        />
      </Head>
      <BrandWrap>
        <div className="InfoArea">
          <InfoArea brandName={typeof id === "string" ? id : ""} />
        </div>

        <div className="CollectionArea">
          <CollectionArea brandName={typeof id === "string" ? id : ""} />
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
