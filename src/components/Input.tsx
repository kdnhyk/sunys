import {
  ChangeEvent,
  ComponentProps,
  HTMLInputTypeAttribute,
  LegacyRef,
} from "react";
import styled, { css } from "styled-components";

interface IsInput extends ComponentProps<"input"> {
  name: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  autoComplete?: string;
  ref?: LegacyRef<HTMLInputElement>;
  isRed?: boolean;
  disabled?: boolean;
}

export default function Input({
  name,
  value,
  onChange,
  type,
  placeholder,
  autoComplete,
  ref,
  isRed,
  disabled,
}: IsInput) {
  if (type && type === "tel") {
  }

  return (
    <InputStyle value={value} className="Input" isRed={isRed || false}>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type ? type : "text"}
        autoComplete={autoComplete}
        ref={ref}
        disabled={disabled}
      ></input>
      <p className="Placeholder">{placeholder}</p>
    </InputStyle>
  );
}

const InputStyle = styled.div<{ value: string; isRed: boolean }>`
  position: relative;
  width: 100%;
  height: 40px;
  input {
    position: relative;
    width: 100%;
    height: 100%;
    padding-left: 14px;
    padding-top: ${({ value }) => value && "10px"};
    font-size: 14px;
    background-color: transparent;
    z-index: 1;
    border-width: 0px 0px 1px 0px;
    border-style: solid;
    border-color: ${({ isRed }) => (isRed ? "#F94646" : "grey")};
    border-radius: 0px;
    color: black;
    &:focus {
      outline: none;
      border-width: 0px 0px 2px 0px;
    }
  }
  .Placeholder {
    position: absolute;
    top: 0px;
    left: 0px;
    margin-top: 10px;
    margin-left: 16px;
    color: #666666;
    font-size: 14px;
    z-index: 0;

    transition: all 0.16s ease-out;
    ${({ value }) =>
      value &&
      css`
        margin-top: 0px;
        margin-left: 6px;
        font-size: 11px;
      `}
  }
`;
