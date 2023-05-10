import styled, { css } from "styled-components";

interface IsButton {
  children: any;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isRed?: boolean;
  isActivated?: boolean;
}

export default function Button({
  children,
  onClick,
  isRed,
  isActivated,
}: IsButton) {
  return (
    <ButtonWrap onClick={onClick} isRed={isRed} isActivated={isActivated}>
      {children}
    </ButtonWrap>
  );
}

interface IsButtonWrap {
  isRed?: boolean;
  isActivated?: boolean;
}

const ButtonWrap = styled.button<IsButtonWrap>`
  width: 100%;
  height: 40px;
  background-color: inherit;
  color: black;
  border: 1px solid black;
  font-size: 14px;
  transition: all 0.16s ease-out;
  ${({ isActivated }) =>
    isActivated &&
    css`
      background-color: black;
      color: white;
      border: none;
      cursor: pointer;
    `}
  ${({ isRed }) =>
    isRed &&
    css`
      color: red;
    `}
`;
