import { useImage } from "@/hooks/storage/useImage";
import { IsStore, initStore } from "@/types/brand";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ImgageUploader from "../ImageUploader";
import Input from "../Input";
import useMutationStore from "@/api/useMutationStore";
import useLocationState from "@/hooks/useLocationState";
import Button from "../Button";

interface IsInfoArea {
  lastStore?: IsStore;
}

export default function InfoArea({ lastStore }: IsInfoArea) {
  const { upload } = useImage("store");
  const { updateStore } = useMutationStore(lastStore?.storeName || "");
  const { onClickStore } = useLocationState();

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isUpload, setIsUpload] = useState(false);
  const [isEnterButtonOn, setIsEnterButtonOn] = useState(
    lastStore ? true : false
  );
  const [input, setInput] = useState<IsStore>(lastStore || initStore);

  const setImageUrl = useCallback(async (url: string) => {
    await setInput((prev) => {
      return { ...prev, images: [url] };
    });
  }, []);

  const setImageFile = useCallback(async (file: File | null) => {
    await setLogoFile(file);
  }, []);

  const onChange = useCallback(
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

  const onSubmit = async () => {
    if (!isEnterButtonOn) return;
    await upload(logoFile, `${input.storeName}`, setImageUrl);
    setIsUpload(true);
  };

  // const onDeleteCollection = () => {
  //   if (!lastStore?.storeName) {
  //     alert("생성중엔 삭제할 수 없습니다");
  //     return;
  //   }

  //   deleteCollection.mutate({
  //     id: lastStore.id,
  //     imageUrl: lastStore.images[0],
  //   });

  //   onClickBrandSetting(brandName);
  // };

  // Check Confirm Button
  useEffect(() => {
    if (input.storeName && (input.images[0] || logoFile)) {
      setIsEnterButtonOn(() => true);
    } else {
      setIsEnterButtonOn(() => false);
    }
  }, [input, logoFile]);

  // Update & Upload
  useEffect(() => {
    if (isUpload) {
      if (lastStore) {
        updateStore.mutate({
          storeName: lastStore.storeName,
          store: input,
        });

        onClickStore();
      } else if (!lastStore) {
        updateStore.mutate({
          storeName: input.storeName,
          store: input,
        });

        onClickStore();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpload]);

  return (
    <InfoAreaWrap>
      <div className="ImageWrap">
        <ImgageUploader
          defaultImageUrl={lastStore?.images[0] || ""}
          setImageFile={setImageFile}
        />
      </div>
      <div className="TextWrap">
        <Input
          name="storeName"
          value={input.storeName}
          onChange={onChange}
          placeholder="Store Name"
        />
        <Button
          onClick={onSubmit}
          isActivated={isEnterButtonOn}
          disable={!isEnterButtonOn}
        >
          Confirm
        </Button>
      </div>
    </InfoAreaWrap>
  );
}

const InfoAreaWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 36px 16px;

  .ImageWrap {
  }

  .TextWrap {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;
