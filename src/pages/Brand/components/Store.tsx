import styled from "styled-components";
import { IsOfflineStore, IsStore } from "../../../types/brand";

interface IsStoreStyle {
  store: IsStore | IsOfflineStore;
}

export default function Store({ store }: IsStoreStyle) {
  return (
    <StoreWrap>
      <div className="ImageWrap">
        <img src={store.image} alt="" />
      </div>

      <div className="TextlWrap">
        <h3>{store.storeName}</h3>
      </div>
    </StoreWrap>
  );
}

const StoreWrap = styled.div`
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
