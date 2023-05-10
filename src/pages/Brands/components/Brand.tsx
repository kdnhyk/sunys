import styled, { css } from "styled-components";
import { IsBrand } from "../../../types/brand";

interface IsBrandStyle {
  brand: IsBrand;
}

export default function Brand({ brand }: IsBrandStyle) {
  return (
    <BrandWrap>
      <div className="ImageWrap">
        <img src={brand.logo} alt="" />
      </div>

      <div className="TextlWrap">
        <h3>{brand.brandName}</h3>
      </div>
    </BrandWrap>
  );
}

const BrandWrap = styled.div`
  position: relative;
  cursor: pointer;
  .ImageWrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 200px;
    padding: 20px;
    background-color: white;
    /* box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.25);
    border-radius: 20px; */
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
  }
`;
