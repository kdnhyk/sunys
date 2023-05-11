import styled, { css } from "styled-components";

interface IsCollectionStyle {
  children: any;
  onClick?: () => void;
  exit: () => void;
  isSelected: boolean;
}

export default function CoverBoxArticle({
  children,
  onClick,
  exit,
  isSelected,
}: IsCollectionStyle) {
  return (
    <CoverBoxArticleWrap isSelected={isSelected}>
      <div className="Background" onClick={exit}></div>
      <div className="BoxBackground"></div>
      <div className="CoverBoxArticleInner" onClick={onClick}>
        {children}
      </div>
    </CoverBoxArticleWrap>
  );
}

const CoverBoxArticleWrap = styled.div<{ isSelected: boolean }>`
  display: none;
  .Background {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    cursor: default;
    z-index: 100;

    background-color: transparent;
  }
  .BoxBackground {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: calc(100% - 42px);
    background-color: black;
    opacity: 0.3;
  }
  .CoverBoxArticleInner {
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0px;
    width: 100%;
    height: calc(100% - 44px);
    color: white;
    font-size: 16px;
    font-weight: 600;
    padding-bottom: 20px;
    cursor: default;
    z-index: 200;
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      display: block;
    `}
`;
