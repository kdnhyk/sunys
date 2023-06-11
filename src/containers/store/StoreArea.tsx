import { IsStore } from "@/types/store";
import Image from "next/image";
import styled from "styled-components";

interface IsStoreArea {
  store: IsStore;
}

export default function StoreArea({ store }: IsStoreArea) {
  return (
    <StoreAreaWrap>
      <div className="ImageWrap">
        <Image src={store.images[0]} alt="" width={160} height={160} />
      </div>
      <div className="TextWrap">
        <h2>{store.storeName}</h2>
      </div>
    </StoreAreaWrap>
  );
}

const StoreAreaWrap = styled.div`
  display: flex;
  position: relative;

  width: 100%;
  height: 100%;
  .ImageWrap {
    width: 100%;
    height: 100%;
    background-color: white;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .TextWrap {
    position: absolute;
    padding: 18px;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;

    width: 100%;
    height: 100%;

    transition: all 0.24s ease-in-out;
    background-color: transparent;

    cursor: pointer;

    h2 {
      opacity: 0;
    }

    &:hover {
      background-color: rgba(1, 1, 1, 0.4);
      backdrop-filter: blur(1px);

      h2,
      .BrandListWrap {
        opacity: 1;
        color: white;
      }
    }
  }
`;
