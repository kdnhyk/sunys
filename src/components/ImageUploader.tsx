import { useEffect } from "react";
import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import imageCompression from "browser-image-compression";
import Image from "next/image";

interface IsImageUploader {
  defaultImageUrl: string;
  setImageFile: (file: File | null) => void;
}

const handleImage = async (file: File) => {
  const options = {
    maxSizeMB: 1, // 이미지 최대 용량
    maxWidthOrHeight: 1920, // 최대 넓이(혹은 높이)
    useWebWorker: true,
  };

  const newFile = await imageCompression(file, options);
  const result = new File([newFile], file.name.split(".")[0] + ".webp", {
    type: "image/webp",
    lastModified: new Date().getTime(),
  });

  return result;
};

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
            priority
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
