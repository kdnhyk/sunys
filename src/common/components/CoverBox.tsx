import styled, { css } from "styled-components";

interface IsCollectionStyle {
  children: any;
  onClick?: () => void;
}

export default function CoverBox({ children, onClick }: IsCollectionStyle) {
  return (
    <CoverBoxWrap>
      <div className="BoxBackground"></div>
      <div className="CoverBoxInner" onClick={onClick}>
        {children}
      </div>
    </CoverBoxWrap>
  );
}

const CoverBoxWrap = styled.div`
  .BoxBackground {
    display: none;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: calc(100% - 27px);
    background-color: black;
    opacity: 0.3;
  }
  .CoverBoxInner {
    display: none;
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    color: white;
    font-size: 16px;
    font-weight: 600;
    padding-bottom: 20px;
    cursor: default;
    z-index: 200;
  }

  &:hover {
    .BoxBackground,
    .CoverBoxInner {
      display: block;
    }
  }
`;
