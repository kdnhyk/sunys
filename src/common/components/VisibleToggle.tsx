import styled, { css } from "styled-components";

interface IsVisibleToggle {
  isActivated: boolean;
  onClick: () => void;
  label?: string;
}

export default function VisibleToggle({
  isActivated,
  onClick,
  label,
}: IsVisibleToggle) {
  return (
    <VisibleToggleWrap isActivated={isActivated}>
      <div className="VisibleToggle" onClick={onClick}>
        <div className="Circle"></div>
        <p className="Label">{label}</p>
      </div>
    </VisibleToggleWrap>
  );
}

const VisibleToggleWrap = styled.div<{ isActivated: boolean }>`
  position: relative;
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .VisibleToggle {
    width: 60px;
    height: 24px;
    background-color: white;
    border-radius: 20px;
    border: 1px solid black;
    padding: 2px;
    display: flex;
    transition: all 0.2s ease-out;
    cursor: pointer;

    .Circle {
      width: 18px;
      height: 18px;
      background-color: black;
      border-radius: 20px;
      margin-left: 0px;
      transition: margin 0.2s ease-out;
    }
    .Label {
      position: absolute;
      top: 8px;
      left: 24px;
      font-size: 11px;
      /* transition: left 0.2s ease-out; */
    }

    ${({ isActivated }) =>
      isActivated &&
      css`
        background-color: black;
        .Circle {
          background-color: white;
          margin-left: 36px;
        }
        .Label {
          color: white;
          left: 14px;
        }
      `}
  }
`;
