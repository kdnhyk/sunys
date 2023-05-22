import styled from "styled-components";
import BrandListArea from "./BrandListArea";
import SearchInput from "./components/SearchInput";

export default function BrandList() {
  return (
    <BrandListStyle>
      <div className="SearchInputWrap">
        <SearchInput placeholder="Search By Brand" />
      </div>
      <BrandListArea />
    </BrandListStyle>
  );
}

const BrandListStyle = styled.div`
  padding: 24px 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .SearchInputWrap {
    padding: 0px 16px;
    padding-bottom: 24px;
    border-bottom: 1px solid #dddddd;
    display: flex;
    justify-content: center;
  }
`;
