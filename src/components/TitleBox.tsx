import styled from "styled-components";

interface IsTitleBox {
  children: any;
  color?: string;
  subTitle?: string;
}

export default function TitleBox({ children, color, subTitle }: IsTitleBox) {
  return (
    <TitleBoxBlock color={color}>
      <h1 className="MainTitle">{children}</h1>
      <p className="SubTitle">{subTitle}</p>
    </TitleBoxBlock>
  );
}

const TitleBoxBlock = styled.div<{ colol?: string }>`
  width: fit-content;
  margin-bottom: 8px;
  .MainTitle {
    color: ${({ color }) => color || "black"};
    margin-bottom: 4px;
  }
  .SubTitle {
    color: #8e8e8e;
    font-size: 14px;
  }
`;
