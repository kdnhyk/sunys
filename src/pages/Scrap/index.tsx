import styled from "styled-components";

export default function Scrap() {
  return (
    <ScrapWrap>
      <p>준비 중 입니다</p>
    </ScrapWrap>
  );
}

const ScrapWrap = styled.div`
  padding: 64px 16px 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
