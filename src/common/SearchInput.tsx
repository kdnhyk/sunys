import styled, { css } from "styled-components";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useBrandList } from "../hooks/useBrandList";
import { Link } from "react-router-dom";

interface IsSearchInput {
  placeholder: string;
}

export default function SearchInput({ placeholder }: IsSearchInput) {
  const { brandList } = useBrandList();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const onOpenModal = () => {
    setIsOpenModal(() => true);
  };

  const onCloseModal = () => {
    setIsOpenModal(() => false);
  };

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput((prev) => value);
  };

  const onResetSearchInput = () => {
    setSearchInput(() => "");
    setIsOpenModal(false);
    searchInputRef.current?.focus();
  };

  const resultBrandList = brandList.filter((e) => {
    return (
      e.default
        .replace(" ", "")
        .toLocaleLowerCase()
        .includes(searchInput.toLocaleLowerCase().replace(" ", "")) ||
      e.korean
        .replace(" ", "")
        .includes(searchInput.toLocaleLowerCase().replace(" ", ""))
    );
  });

  useEffect(() => {
    if (searchInput) {
      setIsOpenModal(true);
    }
  }, [searchInput]);

  return (
    <SearchInputStyle value={searchInput}>
      <div className="InputWrap">
        <input
          className="SearchInput"
          placeholder={placeholder}
          value={searchInput}
          onChange={onChangeSearchInput}
          ref={searchInputRef}
          onClick={onOpenModal}
        ></input>
        {searchInput && (
          <div className="DeleteBtn" onClick={onResetSearchInput}>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.65685 2.65687C-0.468102 5.78182 -0.468102 10.8456 2.65685 13.9706C5.78181 17.0955 10.8456 17.0955 13.9706 13.9706C17.0955 10.8456 17.0955 5.78182 13.9706 2.65687C10.8456 -0.468089 5.78181 -0.468089 2.65685 2.65687ZM12.237 5.66777C12.3876 5.81832 12.3876 6.06467 12.237 6.21521L10.1385 8.31372L12.237 10.4122C12.3876 10.5628 12.3876 10.8091 12.237 10.9597L10.9597 12.237C10.8091 12.3876 10.5628 12.3876 10.4122 12.237L8.31371 10.1385L6.2152 12.237C6.06465 12.3876 5.81831 12.3876 5.66776 12.237L4.39041 10.9597C4.23986 10.8091 4.23986 10.5628 4.39041 10.4122L6.48892 8.31372L4.39041 6.21521C4.23986 6.06467 4.23986 5.81832 4.39041 5.66777L5.66776 4.39042C5.81831 4.23987 6.06465 4.23987 6.2152 4.39042L8.31371 6.48893L10.4122 4.39042C10.5628 4.23987 10.8091 4.23987 10.9597 4.39042L12.237 5.66777Z"
                fill="#666666"
              />
            </svg>
          </div>
        )}
      </div>
      {isOpenModal && (
        <>
          <div className="ModalWrap">
            {resultBrandList.map((e, i) => (
              <div className="BrandNameInner" key={i}>
                <Link to={`/brand/${e.default}`}>
                  <p className="Default">{e.default}</p>
                  <p className="Korean">{e.korean}</p>
                </Link>
              </div>
            ))}
          </div>
          <div className="Background" onClick={onCloseModal}></div>
        </>
      )}
    </SearchInputStyle>
  );
}

const SearchInputStyle = styled.div<{ value: string }>`
  position: relative;
  height: 40px;
  .InputWrap {
    position: relative;
    height: 100%;
    z-index: 20;
    .SearchInput {
      transition: width 0.1s ease-out;
      width: 100%;
      height: 100%;
      background-color: #dfdfdf;
      padding: 0px 12px;
      /* border-radius: 12px; */

      &:focus {
        outline: none;
      }
    }
    .DeleteBtn {
      position: absolute;
      right: 12px;
      top: 12px;
      cursor: pointer;
    }
  }

  .ModalWrap {
    display: none;
    position: absolute;
    top: 40px;
    width: 100%;
    height: fit-content;
    max-height: 300px;
    background-color: #ffffff;
    overflow-y: auto;
    z-index: 20;
    &::-webkit-scrollbar {
      display: none;
    }
    .BrandNameInner {
      height: 44px;
      border-bottom: 1px solid #dfdfdf;

      padding: 0px 12px;
      cursor: pointer;
      &:hover {
        background-color: #dfdfdf;
      }

      a {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .Default {
          font-size: 14px;
          margin-bottom: 2px;
        }
        .Korean {
          font-size: 12px;
          color: #8e8e8e;
        }
      }
    }
  }

  .Background {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    cursor: default;
    z-index: 10;

    background-color: transparent;
  }

  ${({ value }) =>
    value &&
    css`
      .InputWrap {
        .SearchInput {
        }
      }
      .ModalWrap {
        display: block;
      }
    `}
`;
