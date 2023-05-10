import styled from "styled-components";

interface IsUnderLineBox {
  children: any;
  color?: string;
  isBold?: boolean;
}

export default function UnderLineBox({
  children,
  color,
  isBold,
}: IsUnderLineBox) {
  return (
    <UnderLineBoxBlock color={color} isBold={isBold}>
      <p>{children}</p>
    </UnderLineBoxBlock>
  );
}

const UnderLineBoxBlock = styled.div<{ colol?: string; isBold?: boolean }>`
  width: fit-content;
  padding: 8px 8px;
  border-bottom: 1px solid black;
  margin-bottom: 8px;
  cursor: pointer;
  p {
    color: ${({ color }) => color || "black"};
    font-weight: ${({ isBold }) => isBold && "bold"};
  }
`;
