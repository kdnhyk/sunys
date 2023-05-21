import styled from "styled-components";
import { useState } from "react";
import { IsBrand, IsOfficialStore } from "../../types/brand";
import "react-datepicker/dist/react-datepicker.css";
import WindowModal1 from "./components/WindowModal1";
import CreateBox from "../../common/components/CreateBox";
import OfflineStore from "../Brand/components/OfflineStore";
import { useParams } from "react-router-dom";
import { useImage } from "../../hooks/storage/useImage";
import { useBrandStore } from "../../hooks/firestore/useBrandStore";

interface IsStoreArea1 {
  input: IsBrand;
  onRemoveInputOfficialStore: (id: string) => void;
}

export default function StoreArea1({
  input,
  onRemoveInputOfficialStore,
}: IsStoreArea1) {
  const { id } = useParams();
  const { deleteImage } = useImage("store");
  const { updateBrand } = useBrandStore();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleModalOpen = () => {
    setIsOpenModal(true);
  };

  const handleModalClose = () => {
    setIsOpenModal(false);
  };

  const onRemove = (store: IsOfficialStore) => {
    if (!id) return;
    deleteImage(store.image);

    updateBrand(id, {
      ...input,
      officialStoreList: input.officialStoreList.filter(
        (e) => e.id !== store.storeName
      ),
    });

    onRemoveInputOfficialStore(store.storeName);
  };

  return (
    <StoreArea1Wrap>
      {id && (
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
