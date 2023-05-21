import styled from "styled-components";
import { IsOfficialStore } from "../../../types/brand";

interface IsStoreStyle {
  store: IsOfficialStore;
}

export default function OfflineStore({ store }: IsStoreStyle) {
  return (
    <OfflineStoreWrap>
      <div className="ImageWrap">
        <img src={store.image} alt="" width={200} height={200} />
      </div>

      <div className="TextlWrap">
        <h3>{store.storeName}</h3>
      </div>

      <div className="HoverWrap">
        <div className="Background"></div>
        <p>{store.storeLocation}</p>
      </div>
    </OfflineStoreWrap>
  );
}

const OfflineStoreWrap = styled.div`
  position: relative;
  &:hover {
    .HoverWrap {
      background-color: rgba(0, 0, 0, 0.3);
      p {
        display: block;
      }
    }
  }
  &:hover {
    .HoverWrap {
      display: flex;
    }
  }
  .ImageWrap {
    width: 200px;
    height: 200px;
    img {
      border-radius: 8px;
      object-fit: cover;
    }
  }
  .TextlWrap {
    height: 23px;
    padding: 4px 0px;
    h3 {
      font-weight: 400;
      margin-bottom: 2px;
    }
  }

  .HoverWrap {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: calc(100% - 23px);
    transition: all 0.2s ease-out;
    background-color: transparent;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 8px;
    p {
      display: none;
      position: absolute;
      color: white;
      max-width: 160px;
      text-align: center;
    }
  }
`;
