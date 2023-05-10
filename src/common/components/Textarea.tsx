import styled, { css } from "styled-components";

interface IsTextarea {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isActivated: boolean;
}

export default function Textarea({
  name,
  value,
  placeholder,
  onChange,
  isActivated,
}: IsTextarea) {
  return (
    <TextareaWrap
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      isActivated={isActivated}
    ></TextareaWrap>
  );
}

interface IsTextareaWrap {
  isActivated?: boolean;
}

const TextareaWrap = styled.textarea<IsTextareaWrap>`
  width: 100%;
  height: 120px;
  background-color: inherit;
  color: black;
  border: 1px solid grey;
  font-size: 14px;
  transition: all 0.16s ease-out;
  resize: none;
  padding: 14px 10px;

  &:focus {
    outline: none;
  }
  ${({ isActivated }) =>
    isActivated &&
    css`
      background-color: black;
      color: white;
      border: none;
      cursor: pointer;
    `}
`;
