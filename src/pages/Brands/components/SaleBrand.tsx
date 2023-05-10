import styled, { css } from "styled-components";
import { IsBrand } from "../../../types/brand";

interface IsBrandStyle {
  brand: IsBrand;
}

export default function SaleBrand({ brand }: IsBrandStyle) {
  return (
    <SaleBrandWrap>
      <div className="ImageWrap">
        <img src={brand.logo} alt="" />
      </div>

      <div className="TextlWrap">
        <h3>{brand.brandName}</h3>
        <p>~ {brand.saleEndDate}</p>
      </div>
    </SaleBrandWrap>
  );
}

const SaleBrandWrap = styled.div`
  width: 150px;
  position: relative;
  cursor: pointer;
  .ImageWrap {
    width: 150px;
    height: 150px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .TextlWrap {
    padding: 4px 4px;
    h3 {
      margin-bottom: 2px;
    }
    p {
      font-size: 13px;
      text-align: end;
    }
  }
`;
