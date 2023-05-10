import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import OfficialStore from "./components/OfficialStore";
import { IsBrand } from "../../types/brand";
import WindowModal0 from "./components/WindowModal0";
import "react-datepicker/dist/react-datepicker.css";
import Store from "../Brand/components/Store";

interface IsStoreArea0 {
  input: IsBrand;
  lastImageUrl: string;
  onChangeInputOfficialOnlineStore: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => Promise<void>;
  onChangeInputOfficialOnlineStoreImage: (url: string) => void;
}

export default function StoreArea0({
  input,
  lastImageUrl,
  onChangeInputOfficialOnlineStore,
  onChangeInputOfficialOnlineStoreImage,
}: IsStoreArea0) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleModalOpen = () => {
    setIsOpenModal(true);
  };

  const handleModalClose = () => {
    setIsOpenModal(false);
  };

  return (
    <StoreArea0Wrap>
      <div className="OfficialStoreWrap" onClick={handleModalOpen}>
        <OfficialStore officialStore={input.officialOnlineStore} />
      </div>

      {input.storeList.map((e, i) => (
        <div className="StoreInner" key={i} onClick={handleModalOpen}>
          <Store store={e} />
        </div>
      ))}

      <div className="WindowModalWrap">
        {isOpenModal && (
          <WindowModal0
            exitModal={handleModalClose}
            input={input}
            lastImageUrl={lastImageUrl}
            onChangeInput={onChangeInputOfficialOnlineStore}
            onChangeInputOfficialOnlineStoreImage={
              onChangeInputOfficialOnlineStoreImage
            }
          />
        )}
      </div>
    </StoreArea0Wrap>
  );
}

const StoreArea0Wrap = styled.div`
  .OfficialStoreWrap {
    width: fit-content;
  }
`;
