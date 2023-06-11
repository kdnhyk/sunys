import styled, { css } from "styled-components";

interface IsButton {
  children: any;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isRed?: boolean;
  isBlack?: boolean;
  width?: string;
  disable?: boolean;
}

export default function Button({
  children,
  onClick,
  isRed,
  isBlack,
  width,
  disable,
}: IsButton) {
  return (
    <ButtonWrap
      onClick={!disable ? onClick : () => {}}
      isRed={isRed}
      isBlack={isBlack}
      width={width}
      disable={disable}
    >
      {children}
    </ButtonWrap>
  );
}

interface IsButtonWrap {
  isRed?: boolean;
  isBlack?: boolean;
  width?: string;
  disable?: boolean;
}

const ButtonWrap = styled.button<IsButtonWrap>`
  width: ${({ width }) => (width ? width : "100%")};
  height: 40px;
  background-color: inherit;
  color: black;
  border: 1px solid black;
  font-size: 14px;
  transition: all 0.16s ease-out;
  ${({ isBlack }) =>
    isBlack &&
    css`
      background-color: black;
      color: white;
      border: none;
    `}
  ${({ disable }) =>
    !disable &&
    css`
      cursor: pointer;
    `}
  ${({ isRed }) =>
    isRed &&
    css`
      color: red;
    `}
`;
