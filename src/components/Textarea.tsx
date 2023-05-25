import styled, { css } from "styled-components";

interface IsTextarea {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({
  name,
  value,
  placeholder,
  onChange,
}: IsTextarea) {
  return (
    <TextareaWrap
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    ></TextareaWrap>
  );
}

const TextareaWrap = styled.textarea`
  width: 100%;
  height: 80px;
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
`;
