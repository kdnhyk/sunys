import useLocationState from "@/hooks/useLocationState";
import { IsStore } from "@/types/brand";
import Image from "next/image";
import styled from "styled-components";

interface IsMainStoreArea {
  store: IsStore;
}

export default function MainStoreArea({ store }: IsMainStoreArea) {
  const { onClickBarnd } = useLocationState();

  return (
    <MainStoreAreaWrap>
      <div className="ImageWrap">
        <Image src={store.images[0]} alt="" width={160} height={160} />
      </div>
      <div className="TextWrap">
        <h2>{store.storeName}</h2>
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
    </MainStoreAreaWrap>
  );
}

const MainStoreAreaWrap = styled.div`
  display: flex;
  flex-direction: column;
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
    padding: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    height: 100%;

    transition: all 0.24s ease-in-out;
    background-color: transparent;

    cursor: pointer;
  }
`;
