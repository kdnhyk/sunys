import styled, { css } from "styled-components";
import { IsBrand } from "../../../types/brand";

interface IsBrandStyle {
  brand: IsBrand;
}

//END
export default function SaleBrand({ brand }: IsBrandStyle) {
  return (
    <SaleBrandWrap>
      <div className="ImageWrap">
        <img src={brand.logo} alt="" width={120} height={120} />
      </div>

      <div className="TextlWrap">
        <h3>{brand.brandName}</h3>
        <p>~ {brand.saleEndDate}</p>
      </div>
    </SaleBrandWrap>
  );
}

const SaleBrandWrap = styled.div`
  position: relative;
  cursor: pointer;
  .ImageWrap {
    width: 160px;
    height: 160px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    img {
      object-fit: contain;
    }
  }
  .TextlWrap {
    height: 40px;
    padding: 4px 4px;
    h3 {
    }
    p {
      text-align: end;
      color: #8e8e8e;
    }
  }
`;
