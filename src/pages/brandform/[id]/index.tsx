import styled from "styled-components";
import { media } from "@/media";
import InfoArea from "../../../components/brandform/InfoArea";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const CollectionArea = dynamic(
  () => import("@/components/brandform/CollectionArea"),
  {
    ssr: false,
  }
);

//
export default function BrandForm() {
  const { id } = useRouter().query;

  if (!id) {
    return false;
  }

  return (
    <BrandWrap>
      <div className="InfoWrap">
        <InfoArea brandName={typeof id === "string" ? id : ""} />
      </div>

      <div className="CollectionWrap">
        <CollectionArea brandName={typeof id === "string" ? id : ""} />
      </div>
    </BrandWrap>
  );
}

const BrandWrap = styled.div`
  display: flex;
  flex-direction: column;
  ${media.desktop`
    flex-direction: row;
    .InfoWrap {
      width: 220px;
      flex-grow: 2;
      border-right: 1px solid #dddddd;
      .SaleWrap {
      }
    }
    .CollectionWrap {
      width: 173.5px;
      flex-grow: 4;
    }
  `}
`;
