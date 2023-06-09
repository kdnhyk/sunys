import styled from "styled-components";
import { useState } from "react";
import { IsBrand, IsOfficialStore } from "@/types/brand";
import WindowModal1 from "./WindowModal1";
import CreateBox from "../../components/CreateBox";
import OfflineStore from "../brand/OfflineStore";
import { useImage } from "@/hooks/storage/useImage";
import useMutationBrand from "@/api/brand/useMutationBrand";

interface IsStoreArea1 {
  input: IsBrand;
  onRemoveInputOfficialStore: (id: string) => void;
}

export default function StoreArea1({
  input,
  onRemoveInputOfficialStore,
}: IsStoreArea1) {
  const { deleteImage } = useImage("store");
  const { updateBrand } = useMutationBrand(input.brandName);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleModalOpen = () => {
    setIsOpenModal(true);
  };

  const handleModalClose = () => {
    setIsOpenModal(false);
  };

  const onRemove = (store: IsOfficialStore) => {
    if (!input.brandName) return;
    deleteImage(store.image);

    updateBrand.mutate({
      id: input.brandName,
      brand: {
        ...input,
        officialStoreList: input.officialStoreList.filter(
          (e) => e.id !== store.storeName
        ),
      },
    });

    onRemoveInputOfficialStore(store.storeName);
  };

  return (
    <StoreArea1Wrap>
      {input.brandName && (
        <>
          <div className="CreateStoreWrap" onClick={handleModalOpen}>
            <CreateBox />
          </div>
          {input.officialStoreList.map((e, i) => (
            <div className="StoreInner" key={i} onClick={() => onRemove(e)}>
              <OfflineStore store={e} />
            </div>
          ))}

          <div className="WindowModalWrap">
            {isOpenModal && (
              <WindowModal1 exitModal={handleModalClose} input={input} />
            )}
          </div>
        </>
      )}
    </StoreArea1Wrap>
  );
}

const StoreArea1Wrap = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 16px 0px;

  &::-webkit-scrollbar {
    display: none;
  }
  .OfficialStoreWrap {
    width: fit-content;
  }
  .CreateStoreWrap {
    cursor: pointer;
  }
`;
