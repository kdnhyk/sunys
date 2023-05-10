import styled from "styled-components";
import UnderLineBox from "../../common/components/UnderLineBox";
import Input from "../../common/components/Input";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import ImgageUploader from "../../common/components/ImageUploader";
import Button from "../../common/components/Button";
import OfficialStore from "./components/OfficialStore";
import Textarea from "../../common/components/Textarea";
import { IsBrand } from "../../types/brand";
import { useImage } from "../../hooks/storage/useImage";
import { useBrandStore } from "../../hooks/firestore/useBrandStore";
import { useNavigate, useParams } from "react-router-dom";
import { useBrand } from "../../hooks/useBrand";
import WindowModal0 from "./components/WindowModal0";
import CreateCollection from "./components/CreateCollection";
import { Link } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import Collection from "./components/Collection";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toStringByFormatting } from "../../util";
import Store from "../Brand/components/Store";

export type IsModalSort =
  | "officialOnlineStore"
  | "officialOfflineStore"
  | "storeList";

export default function BrandForm() {
  const [isEnterButtonOn, setIsEnterButtonOn] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [input, setInput] = useState<IsBrand>({
    id: "",
    logo: "",
    brandName: "",
    saleStartDate: "",
    saleEndDate: "",
    description: "",
    officialOnlineStore: {
      image: "",
      storeName: "",
      storeUrl: "",
    },
    officialOfflineStore: [],
    storeList: [],
  });
  const [modalInput, setModalInput] = useState<{
    sort: IsModalSort;
    storeId: string;
  }>({
    sort: "officialOnlineStore",
    storeId: "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const nav = useNavigate();
  const { id } = useParams();
  const { upload, deleteImage } = useImage();
  const { addDocument, updateDocument } = useBrandStore();
  const { newBrandList } = useBrand();
  const currentBrand = useMemo(
    () => newBrandList.find((brand) => brand.id === id),
    [id, newBrandList]
  );
  const { collectionList } = useCollection();
  console.log(newBrandList);

  const setImageFile = useCallback(async (file: File | null) => {
    await setLogoFile(file);
  }, []);

  const setImageUrl = useCallback(async (url: string) => {
    await setInput((prev) => {
      return { ...prev, logo: url };
    });
  }, []);

  const handleIsOpenModal = (sort?: IsModalSort) => {
    setIsOpenModal((prev) => !prev);
    if (sort === "officialOnlineStore") {
      setModalInput({
        sort,
        storeId: "",
      });
    } else if (sort === "officialOfflineStore") {
      setModalInput({
        sort,
        storeId: "",
      });
    } else if (sort === "storeList") {
      setModalInput({
        sort,
        storeId: "",
      });
    }
  };

  const onChangeInput = useCallback(
    async (
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      await setInput((prev) => {
        return { ...prev, [name]: value };
      });
    },
    []
  );

  const onChangeSaleDateInput = useCallback(
    async (name: string, date: Date | [Date | null, Date | null] | null) => {
      const newDate = toStringByFormatting(date);
      console.log(name, input.saleEndDate);
      console.log(input.saleEndDate);
      await setInput((prev) => {
        return { ...prev, [name]: newDate };
      });
    },
    []
  );

  const onChangeInputOfficialOnlineStore = useCallback(
    async (
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      await setInput((prev) => {
        return {
          ...prev,
          officialOnlineStore: { ...prev.officialOnlineStore, [name]: value },
        };
      });
    },
    []
  );

  const onSubmit = async () => {
    await upload(logoFile, setImageUrl);
    setIsUpload(true);
  };

  useEffect(() => {
    // if (currentDoc?.uid !== user.uid) {
    //   alert("허용되지 않은 앨범입니다");
    //   nav("/");
    // }
    if (id) {
      if (!currentBrand) return;
      setInput((prev) => ({
        ...prev,
        id,
        logo: currentBrand.logo,
        brandName: currentBrand.brandName,
        description: currentBrand.description,
        saleStartDate: currentBrand.saleStartDate,
        saleEndDate: currentBrand.saleEndDate,
        officialOnlineStore: {
          image: currentBrand.officialOnlineStore.image,
          storeName: currentBrand.officialOnlineStore.storeName,
          storeUrl: currentBrand.officialOnlineStore.storeUrl,
        },
        officialOfflineStore: currentBrand.officialOfflineStore,
        storeList: currentBrand.storeList,
      }));

      setIsEnterButtonOn(() => true);
    }
  }, [currentBrand, id]);

  useEffect(() => {
    if (input.logo || (input.brandName && input.description && logoFile)) {
      setIsEnterButtonOn(() => true);
    } else {
      setIsEnterButtonOn(() => false);
    }
  }, [input, logoFile]);

  useEffect(() => {
    if (isUpload && input.logo) {
      if (id) {
        updateDocument(id, {
          logo: input.logo,
          brandName: input.brandName,
          description: input.description,
          saleStartDate: input.saleStartDate,
          saleEndDate: input.saleEndDate,
          officialOnlineStore: {
            image: input.officialOnlineStore.image,
            storeName: input.officialOnlineStore.storeName,
            storeUrl: input.officialOnlineStore.storeUrl,
          },
          officialOfflineStore: input.officialOfflineStore,
          storeList: input.storeList,
        });
      } else if (!id) {
        addDocument(input.brandName, {
          logo: input.logo,
          brandName: input.brandName,
          description: input.description,
          saleStartDate: input.saleStartDate,
          saleEndDate: input.saleEndDate,
          officialOnlineStore: {
            image: input.officialOnlineStore.image,
            storeName: input.officialOnlineStore.storeName,
            storeUrl: input.officialOnlineStore.storeUrl,
          },
          officialOfflineStore: input.officialOfflineStore,
          storeList: input.storeList,
          isVisible: true,
        });
      }

      if (currentBrand) {
        if (id && currentBrand.logo !== input.logo) {
          deleteImage(currentBrand.logo);
        }

        if (
          currentBrand.officialOnlineStore.image !==
          input.officialOnlineStore.image
        ) {
          deleteImage(currentBrand.logo);
        }
      }

      // 중복 삭제
      // currentBrand.officialOfflineStore.map((e) => e.image !== input.officialOfflineStore.)
      // else if (
      //   currentBrand.officialOfflineStore &&
      //   currentBrand.officialOfflineStore.find((e) => e.id === storeId)
      //     ?.image !== input.image
      // ) {
      //   deleteImage(currentBrand.logo);
      // } else if (
      //   currentBrand.storeList &&
      //   currentBrand.storeList.find((e) => e.id === storeId)?.image !==
      //     input.image
      // ) {
      //   deleteImage(currentBrand.logo);
      // }

      nav("/brand");
    }
  }, [isUpload]);

  return (
    <BrandFormWrap>
      <div className="TitleWrap">
        <ImgageUploader
          defaultImageUrl={input.logo}
          setImageFile={setImageFile}
        />
        <Input
          name="brandName"
          value={input.brandName}
          placeholder="Brand Name"
          onChange={onChangeInput}
          disabled={id ? true : false}
        />
      </div>
      <Textarea
        name="description"
        value={input.description}
        placeholder="Description"
        onChange={onChangeInput}
        isActivated={false}
      />

      <UnderLineBox color="#F33131">SALE</UnderLineBox>
      <div className="SaleWrap">
        <DatePickerWrap
          dateFormat="yyyy / MM / dd"
          selectsStart
          selected={
            input.saleStartDate ? new Date(input.saleStartDate) : new Date()
          }
          onChange={(date) => onChangeSaleDateInput("saleStartDate", date)}
          startDate={
            input.saleStartDate ? new Date(input.saleStartDate) : new Date()
          }
          endDate={input.saleEndDate ? new Date(input.saleEndDate) : new Date()}
        />
        <DatePickerWrap
          dateFormat="yyyy / MM / dd"
          selectsEnd
          selected={
            input.saleEndDate ? new Date(input.saleEndDate) : new Date()
          }
          onChange={(date) => onChangeSaleDateInput("saleEndDate", date)}
          startDate={
            input.saleStartDate ? new Date(input.saleStartDate) : new Date()
          }
          endDate={input.saleEndDate ? new Date(input.saleEndDate) : new Date()}
        />
        {/* <Input
          name="saleEndDate"
          value={input.saleEndDate}
          placeholder="Sale Date"
          onChange={onChangeInput}
        /> */}
      </div>
      <Button onClick={onSubmit} isActivated={isEnterButtonOn}>
        CONFIRM
      </Button>
      {id && (
        <>
          <UnderLineBox>STORE</UnderLineBox>
          <div className="StoreWrap">
            <div
              className="OfficialStoreWrap"
              onClick={() => handleIsOpenModal("officialOnlineStore")}
            >
              <OfficialStore officialStore={input.officialOnlineStore} />
            </div>

            {input.officialOfflineStore.map((e, i) => (
              <div
                className="StoreInner"
                key={i}
                onClick={() => handleIsOpenModal("officialOfflineStore")}
              >
                <Store store={e} />
              </div>
            ))}
            {input.storeList.map((e, i) => (
              <div
                className="StoreInner"
                key={i}
                onClick={() => handleIsOpenModal("storeList")}
              >
                <Store store={e} />
              </div>
            ))}
          </div>
          {/* <div className="WindowModalWrap">
            {isOpenModal && (
              <WindowModal0
                brandId={id}
                sort={modalInput?.sort}
                storeId={modalInput?.storeId}
                exitModal={handleIsOpenModal}
                currentBrand={currentBrand}
                input={input}
                setInput={setInput}
                onChangeInput={onChangeInputOfficialOnlineStore}
              />
            )}
          </div> */}
        </>
      )}

      <UnderLineBox>COLLECTION</UnderLineBox>
      <Link
        to={`/brandform/${id}/collectionform`}
        className="CreateCollectionWrap"
      >
        <CreateCollection />
      </Link>
      {collectionList.map((e, i) => (
        <Link to={`/brandform/${id}/collectionform/${e.id}`} key={i}>
          <Collection collection={e} />
        </Link>
      ))}
    </BrandFormWrap>
  );
}

const BrandFormWrap = styled.div`
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  .TitleWrap {
    display: flex;
    gap: 16px;
    flex-direction: column;
    align-items: center;
    width: 200px;
    margin: 0 auto;
    margin-bottom: 16px;
  }

  .SaleWrap {
    width: 100%;
    height: 60px;
    padding: 20px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    // DatePicker
  }

  .StoreWrap {
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
`;

const DatePickerWrap = styled(DatePicker)`
  height: 40px;
  width: 100%;
  padding: 0px 12px;
  background-color: transparent;
  border-bottom: 1px solid grey;
  cursor: pointer;
  /* .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range {
    background-color: #314af3;
    color: #314af3;
  } */
`;
