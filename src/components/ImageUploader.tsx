import { useEffect } from "react";
import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { handleImage } from "@/util/file";

interface IsImageUploader {
  defaultImageUrl: string;
  setImageFile: (file: File | null) => void;
}

export default function ImgageUploader({
  defaultImageUrl,
  setImageFile,
}: IsImageUploader) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [attachment, setAttachment] = useState<string | ArrayBuffer | null>();

  useEffect(() => {
    if (defaultImageUrl) {
      setAttachment(defaultImageUrl);
    }
  }, [defaultImageUrl]);

  const onUploadImage = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files, value } = event.target;
      console.log(files, value);
      if (!files) {
        return;
      }
      // console.log(files[0].name);
      const theFile = await handleImage(files[0]);
      console.log(theFile);

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setAttachment(result);
      };
      reader.readAsDataURL(theFile);

      // 개선
      await setImageFile(theFile);
    },
    [setImageFile]
  );

  const onClearAttachment = () => {
    setImageFile(null);
    setAttachment(null);
    if (!inputRef.current) return;
    inputRef.current.value = "";
  };

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.click();
  }, []);

  return (
    <ImgageUploaderWrap
      attachment={typeof attachment === "string" ? attachment : ""}
    >
      <div className="ImageBoxWrapper" onClick={onUploadImageButtonClick}>
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          onChange={onUploadImage}
        />
      </div>
      <div className="ImgWrapper" onClick={onClearAttachment}>
        {attachment && (
          <Image
            alt=""
            src={typeof attachment === "string" ? attachment : ""}
            width={100}
            height={100}
            priority={true}
          />
        )}
      </div>
    </ImgageUploaderWrap>
  );
}

const ImgageUploaderWrap = styled.div<{ attachment: string }>`
  position: relative;
  .ImageBoxWrapper {
    position: relative;
    width: 160px;
    height: 160px;
    z-index: 1;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed black;

    input {
      display: none;
    }
  }
  .ImgWrapper {
    position: absolute;
    top: 0;
    z-index: ${({ attachment }) => attachment && "2"};
    width: 160px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;
