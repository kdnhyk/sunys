import styled from "styled-components";

interface IsTitleBox {
  children: any;
  color?: string;
  isBold?: boolean;
  subTitle?: string;
}

export default function TitleBox({
  children,
  color,
  isBold,
  subTitle,
}: IsTitleBox) {
  return (
    <TitleBoxBlock color={color} isBold={isBold}>
      <h1 className="MainTitle">{children}</h1>
      <p className="SubTitle">{subTitle}</p>
    </TitleBoxBlock>
  );
}

const TitleBoxBlock = styled.div<{ colol?: string; isBold?: boolean }>`
  width: fit-content;
  padding: 8px 0px;
  /* border-bottom: 1px solid black; */
  .MainTitle {
    color: ${({ color }) => color || "black"};
    margin-bottom: 4px;
  }
  .SubTitle {
    color: #999999;
    font-size: 13px;
  }
`;
