import styled, { css } from "styled-components";

interface IsCollectionStyle {
  children: any;
  onClick?: () => void;
  isSelected: boolean;
}

export default function CoverBoxArticle({
  children,
  onClick,
  isSelected,
}: IsCollectionStyle) {
  return (
    <CoverBoxArticleWrap isSelected={isSelected}>
      <div className="BoxBackground"></div>
      <div className="CoverBoxArticleInner">{children}</div>
    </CoverBoxArticleWrap>
  );
}

const CoverBoxArticleWrap = styled.div<{ isSelected: boolean }>`
  display: none;
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
