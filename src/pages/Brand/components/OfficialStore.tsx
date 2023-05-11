import styled from "styled-components";
import { IsStore } from "../../../types/brand";
import CoverBox from "../../../common/components/CoverBox";
import { useState } from "react";

interface IsOfficialStoreStyle {
  officialStore: IsStore;
}

export default function OfficialStore({ officialStore }: IsOfficialStoreStyle) {
  const [isSelected, setIsSelected] = useState(false);

  const openCoverBox = () => {
    setIsSelected(true);
  };

  const exitCoverBox = () => {
    setIsSelected(false);
  };

  return (
    <OfficialStoreWrap>
      <div onClick={openCoverBox}>
        <div className="ImageWrap">
          <img src={officialStore.image} alt="" />
        </div>

        <div className="TextlWrap">
          <h3>{officialStore.storeName || "Official Store"}</h3>
        </div>
      </div>

      <CoverBox exit={exitCoverBox} isSelected={isSelected}>
        <a href={officialStore.storeUrl} target="_blank" rel="noreferrer">
          {`${officialStore.storeUrl.split("/")[2]}`}
        </a>
      </CoverBox>
    </OfficialStoreWrap>
  );
}

const OfficialStoreWrap = styled.div`
  width: fit-content;
  position: relative;
  cursor: pointer;
  .ImageWrap {
    position: relative;
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
