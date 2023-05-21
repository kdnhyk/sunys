import styled from "styled-components";
import { media } from "../../media";
import InfoArea from "./InfoArea";
import CollectionArea from "./CollectionArea";

//
export default function Brand() {
  return (
    <BrandWrap>
      <div className="InfoWrap">
        <InfoArea />
      </div>

      <div className="CollectionWrap">
        <CollectionArea />
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
