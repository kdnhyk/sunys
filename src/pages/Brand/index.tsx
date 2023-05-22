import styled from "styled-components";
import { media } from "../../media";
import InfoArea from "./InfoArea";
import CollectionArea from "./CollectionArea";

//
export default function Brand() {
  return (
    <BrandWrap>
      <div className="InfoArea">
        <InfoArea />
      </div>

      <div className="CollectionArea">
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
