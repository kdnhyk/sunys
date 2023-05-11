import styled from "styled-components";
import { IsOfflineStore, IsStore } from "../../../types/brand";
import CoverBox from "../../../common/components/CoverBox";
import { useState } from "react";

interface IsStoreStyle {
  store: IsOfflineStore;
}

export default function OfflineStore({ store }: IsStoreStyle) {
  const [isSelected, setIsSelected] = useState(false);

  const openCoverBox = () => {
    setIsSelected(true);
  };

  const exitCoverBox = () => {
    setIsSelected(false);
  };

  return (
    <OfflineStoreWrap>
      <div onClick={openCoverBox}>
        <div className="ImageWrap">
          <img src={store.image} alt="" />
        </div>

        <div className="TextlWrap">
          <h3>{store.storeName}</h3>
        </div>
      </div>
      <CoverBox exit={exitCoverBox} isSelected={isSelected}>
        <p>{store.storeLocation}</p>
      </CoverBox>
    </OfflineStoreWrap>
  );
}

const OfflineStoreWrap = styled.div`
  position: relative;
  cursor: pointer;
  .ImageWrap {
    width: 200px;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
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
