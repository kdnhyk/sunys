import styled, { css } from "styled-components";
import { IsBrand } from "../../types/brand";

interface IsCreateBrandStyle {}

export default function CreateBrand({}: IsCreateBrandStyle) {
  return (
    <CreateBrandWrap>
      <div className="ImageWrap">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 0C8.95161 0 0 8.95161 0 20C0 31.0484 8.95161 40 20 40C31.0484 40 40 31.0484 40 20C40 8.95161 31.0484 0 20 0ZM31.6129 22.2581C31.6129 22.7903 31.1774 23.2258 30.6452 23.2258H23.2258V30.6452C23.2258 31.1774 22.7903 31.6129 22.2581 31.6129H17.7419C17.2097 31.6129 16.7742 31.1774 16.7742 30.6452V23.2258H9.35484C8.82258 23.2258 8.3871 22.7903 8.3871 22.2581V17.7419C8.3871 17.2097 8.82258 16.7742 9.35484 16.7742H16.7742V9.35484C16.7742 8.82258 17.2097 8.3871 17.7419 8.3871H22.2581C22.7903 8.3871 23.2258 8.82258 23.2258 9.35484V16.7742H30.6452C31.1774 16.7742 31.6129 17.2097 31.6129 17.7419V22.2581Z"
            fill="#666666"
          />
        </svg>
      </div>

      <div className="TextlWrap">
        <h3>Crate Brand</h3>
      </div>
    </CreateBrandWrap>
  );
}

const CreateBrandWrap = styled.div`
  position: relative;
  cursor: pointer;
  .ImageWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d9d9d9;
    width: 200px;
    height: 200px;
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
  .TextlWrap {
    padding: 4px 0px;
    h3 {
      font-weight: 400;
      margin-bottom: 2px;
    }
  }
`;
