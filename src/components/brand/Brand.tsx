import styled from "styled-components";
import { IsBrand } from "../../types/brand";
import Image from "next/image";
interface IsBrandStyle {
  brand: IsBrand;
}

// END
export default function Brand({ brand }: IsBrandStyle) {
  return (
    <BrandWrap>
      <div className="ImageWrap">
        <Image
          src={brand.logo}
          alt={brand.brandName}
          width={168}
          height={168}
        />
      </div>

      <div className="TextlWrap">
        <h3>{brand.brandName}</h3>
        <p>{brand.brandNameKo}</p>
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
      margin-bottom: 4px;
    }
    p {
      color: #8e8e8e;
    }
  }
`;
