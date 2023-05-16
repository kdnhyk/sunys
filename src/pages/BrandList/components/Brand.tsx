import styled from "styled-components";
import { IsBrand } from "../../../types/brand";
interface IsBrandStyle {
  brand: IsBrand;
}

// END
export default function Brand({ brand }: IsBrandStyle) {
  return (
    <BrandWrap>
      <div className="ImageWrap">
        <img src={brand.logo} alt="" width={168} height={168} />
      </div>

      <div className="TextlWrap">
        <h3>{brand.brandName}</h3>
      </div>
    </BrandWrap>
  );
}

const BrandWrap = styled.div`
  position: relative;

  .ImageWrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 200px;
    padding: 16px;
    background-color: white;
    border-radius: 8px;
    cursor: pointer;
    img {
      object-fit: contain;
    }
  }
  .TextlWrap {
    height: 40px;
    padding: 4px 0px;
    cursor: pointer;
    h3 {
    }
  }
`;
