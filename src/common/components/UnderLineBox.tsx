import styled from "styled-components";

interface IsTitleBox {
  children: any;
  color?: string;
  isBold?: boolean;
}

export default function UnderLineBox({ children, color, isBold }: IsTitleBox) {
  return (
    <TitleBoxBlock color={color} isBold={isBold}>
      <h3 className="MainTitle">{children}</h3>
    </TitleBoxBlock>
  );
}

const TitleBoxBlock = styled.div<{ colol?: string; isBold?: boolean }>`
  width: fit-content;
  padding: 4px 4px;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
  cursor: pointer;
  .MainTitle {
    color: ${({ color }) => color || "black"};
    margin-bottom: 4px;
    font-weight: 400;
  }
`;
