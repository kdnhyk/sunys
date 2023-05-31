import useLocationState from "@/hooks/useLocationState";
import { IsStore } from "@/types/brand";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

interface IsStoreArea {
  store: IsStore;
}

export default function StoreArea({ store }: IsStoreArea) {
  const { onClickBarnd } = useLocationState();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StoreAreaWrap>
      <div className="ImageWrap">
        <Image src={store.images[0]} alt="" width={200} height={200} />
      </div>
      <div className="TextWrap">
        <h1>{store.storeName}</h1>
        {store.brandList.length > 0 && (
          <div className="BrandListWrap">
            {store.brandList.map((e, i) => {
              return (
                <div className="BrandNameWrap" key={i}>
                  <p
                    className="BrandName"
                    onClick={() => onClickBarnd(e.default)}
                  >
                    {e.default.slice(0, 1).toUpperCase() + e.default.slice(1)}
                  </p>
                  <p>,&nbsp;</p>
                </div>
              );
            })}
            <p>etc</p>
          </div>
        )}
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
    justify-content: space-between;

    width: 100%;
    height: 100%;

    transition: all 0.24s ease-in-out;
    background-color: transparent;

    cursor: pointer;

    h1 {
      opacity: 0;
      font-size: 18px;
    }

    .BrandListWrap {
      display: flex;
      opacity: 0;

      .BrandNameWrap {
        display: flex;

        .BrandName {
          font-weight: 300;

          &:hover {
            background-color: white;
            color: black;
          }
        }
      }
    }

    &:hover {
      background-color: rgba(1, 1, 1, 0.4);
      backdrop-filter: blur(1.6px);

      h1,
      .BrandListWrap {
        opacity: 1;
        color: white;
      }
    }
  }
`;
