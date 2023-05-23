import styled, { css } from "styled-components";

interface IsSaleToggle {
  isActivated: boolean;
  onClick: () => void;
  label?: string;
}

export default function SaleToggle({
  isActivated,
  onClick,
  label,
}: IsSaleToggle) {
  return (
    <SaleToggleWrap isActivated={isActivated}>
      <div className="SaleToggle" onClick={onClick}>
        <div className="Circle"></div>
        <p className="Label">{label}</p>
      </div>
    </SaleToggleWrap>
  );
}

const SaleToggleWrap = styled.div<{ isActivated: boolean }>`
  position: relative;
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .SaleToggle {
    width: 60px;
    height: 24px;
    background-color: white;
    border-radius: 20px;
    border: 1px solid #f33131;
    padding: 2px;
    display: flex;
    transition: all 0.2s ease-out;
    cursor: pointer;

    .Circle {
      width: 18px;
      height: 18px;
      background-color: #f33131;
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
        background-color: #f33131;
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
