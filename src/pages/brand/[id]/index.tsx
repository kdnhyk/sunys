import styled from "styled-components";
import { media } from "@/media";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

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

  if (!id) {
    return <div></div>;
  }

  return (
    <>
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
