import styled from "styled-components";
import MainArea from "./MainArea";

export default function CollectionForm() {
  return (
    <CollectionFormWrap>
      <MainArea />
    </CollectionFormWrap>
  );
}

const CollectionFormWrap = styled.div`
  padding: 20px 16px 0px 16px;
`;
