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
    maxSizeMB: 0.2, // 이미지 최대 용량
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
  const [file, setFile] = useState<File | null>();

  useEffect(() => {
    if (defaultImageUrl) {
      setAttachment(defaultImageUrl);
    }
  }, [defaultImageUrl]);

  const onUploadImage = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files, value } = event.target;

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
      setFile(theFile);
      await setImageFile(theFile);
    },
    []
  );

  const onClearAttachment = () => {
    setImageFile(null);
    setAttachment(null);
    setFile(null);
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
        {/* <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 16.6667C25.9889 16.6667 26.9556 16.3734 27.7779 15.824C28.6001 15.2746 29.241 14.4937 29.6194 13.5801C29.9978 12.6665 30.0969 11.6611 29.9039 10.6912C29.711 9.7213 29.2348 8.8304 28.5355 8.1312C27.8363 7.4319 26.9454 6.95569 25.9755 6.76279C25.0055 6.56979 24.0002 6.66889 23.0866 7.04729C22.173 7.42569 21.3921 8.0666 20.8427 8.8888C20.2932 9.7111 20 10.6778 20 11.6667C20 12.9928 20.5268 14.2645 21.4645 15.2022C22.4021 16.1399 23.6739 16.6667 25 16.6667ZM25 10C25.3296 10 25.6519 10.0978 25.926 10.2809C26.2 10.464 26.4137 10.7243 26.5398 11.0289C26.6659 11.3334 26.699 11.6685 26.6346 11.9918C26.5703 12.3151 26.4116 12.6121 26.1785 12.8452C25.9454 13.0783 25.6485 13.237 25.3252 13.3013C25.0019 13.3656 24.6667 13.3326 24.3622 13.2065C24.0577 13.0803 23.7974 12.8667 23.6142 12.5926C23.4311 12.3186 23.3333 11.9963 23.3333 11.6667C23.3333 11.2247 23.5089 10.8007 23.8215 10.4882C24.134 10.1756 24.558 10 25 10Z"
            fill="black"
          />
          <path
            d="M36.6667 0H3.3333C2.4493 0 1.6014 0.351199 0.976299 0.976299C0.351199 1.6014 0 2.4493 0 3.3333V36.6667C0 37.5507 0.351199 38.3986 0.976299 39.0237C1.6014 39.6488 2.4493 40 3.3333 40H36.6667C37.5507 40 38.3986 39.6488 39.0237 39.0237C39.6488 38.3986 40 37.5507 40 36.6667V3.3333C40 2.4493 39.6488 1.6014 39.0237 0.976299C38.3986 0.351199 37.5507 0 36.6667 0ZM36.6667 36.6667H3.3333V26.6667L11.6667 18.3333L20.9833 27.65C21.6079 28.2708 22.4527 28.6193 23.3333 28.6193C24.214 28.6193 25.0588 28.2708 25.6833 27.65L28.3333 25L36.6667 33.3333V36.6667ZM36.6667 28.6167L30.6833 22.6333C30.0588 22.0125 29.214 21.664 28.3333 21.664C27.4527 21.664 26.6079 22.0125 25.9833 22.6333L23.3333 25.2833L14.0167 15.9667C13.3921 15.3458 12.5473 14.9974 11.6667 14.9974C10.786 14.9974 9.9412 15.3458 9.3167 15.9667L3.3333 21.95V3.3333H36.6667V28.6167Z"
            fill="black"
          />
        </svg> */}

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
