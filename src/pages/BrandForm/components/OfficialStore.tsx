import styled from "styled-components";
import { IsStore } from "../../../types/brand";

interface IsOfficialStoreStyle {
  officialStore: IsStore;
}

export default function OfficialStore({ officialStore }: IsOfficialStoreStyle) {
  return (
    <OfficialStoreWrap>
      <div className="ImageWrap">
        <img src={officialStore.image} alt="" />
      </div>

      <div className="TextlWrap">
        <h3>{officialStore.storeName || "Official Store"}</h3>
      </div>
    </OfficialStoreWrap>
  );
}

const OfficialStoreWrap = styled.div`
  position: relative;
  cursor: pointer;
  .ImageWrap {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
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
