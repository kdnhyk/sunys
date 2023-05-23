import styled from "styled-components";
import { media } from "@/media";
import InfoArea from "@/components/brandform/InfoArea";
import CollectionArea from "@/components/brandform/CollectionArea";

//
export default function BrandForm() {
  return (
    <BrandWrap>
      <div className="InfoWrap">
        <InfoArea brandName={""} />
      </div>

      <div className="CollectionWrap">
        <CollectionArea brandName={""} />
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
