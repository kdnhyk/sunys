import styled from "styled-components";
//
export default function CollectionBone() {
  return (
    <CollectionBoneWrap>
      <div className="ImageWrap"></div>

      <div className="TextlWrap"></div>
    </CollectionBoneWrap>
  );
}

const CollectionBoneWrap = styled.div`
  position: relative;

  .ImageWrap {
    width: 180px;
    height: 240px;
    background-color: #eeeeee;
  }
  .TextlWrap {
    height: 43px;
  }
`;
