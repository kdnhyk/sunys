import styled from "styled-components";
import { media } from "@/media";
import InfoArea from "../../../containers/brandform/InfoArea";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useBrand from "@/api/brand/useBrandByBrandName";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import useCheckAdmin from "@/hooks/useCheckAdmin";

const CollectionArea = dynamic(
  () => import("@/containers/brandform/CollectionArea"),
  {
    ssr: false,
  }
);

//
export default function BrandForm() {
  const { id } = useRouter().query;
  const { data } = useBrand(typeof id === "string" ? id : "");

  const router = useCheckAdmin();

  if (typeof id !== "string") {
    return <></>;
  }

  return (
    <BrandWrap>
      <div className="InfoWrap">
        <InfoArea brandName={id} lastBrand={data} />
      </div>

      <div className="CollectionWrap">
        <CollectionArea brandName={id} />
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
