import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import { IsBrand } from "../../types/brand";
import "react-datepicker/dist/react-datepicker.css";
import WindowModal1 from "./components/WindowModal1";
import CreateBrand from "../../common/components/CreateBrand";
import Store from "../Brand/components/Store";

interface IsStoreArea1 {
  input: IsBrand;
  lastImageUrl: string;
  onChangeInputOfficialOnlineStore: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => Promise<void>;
  onChangeInputOfficialOnlineStoreImage: (url: string) => void;
}

export default function StoreArea1({
  input,
  lastImageUrl,
  onChangeInputOfficialOnlineStore,
  onChangeInputOfficialOnlineStoreImage,
}: IsStoreArea1) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleModalOpen = () => {
    setIsOpenModal(true);
  };

  const handleModalClose = () => {
    setIsOpenModal(false);
  };

  return (
    <StoreArea1Wrap>
      <div className="CreateStoreWrap" onClick={handleModalOpen}>
        <CreateBrand />
      </div>
      {input.officialOfflineStore.map((e, i) => (
        <div className="StoreInner" key={i}>
          <Store store={e} />
        </div>
      ))}

      <div className="WindowModalWrap">
        {isOpenModal && (
          <WindowModal1 exitModal={handleModalClose} input={input} />
        )}
      </div>
    </StoreArea1Wrap>
  );
}

const StoreArea1Wrap = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 12px;

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
