import styled from "styled-components";
import UnderLineBox from "../../common/components/UnderLineBox";
import { Link } from "react-router-dom";
import Brand from "./components/Brand";
import SaleBrand from "./components/SaleBrand";
import CreateBrand from "../../common/components/CreateBrand";
import { useBrand } from "../../hooks/useBrand";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import SearchInput from "./components/SearchInput";

export default function Brands() {
  const {
    newBrandList,
    saleBrandList,
    handleNewBrandList,
    handleSaleBrandList,
  } = useBrand();
  const { user } = useAuth();

  useEffect(() => {
    if (newBrandList.length === 0) {
      handleNewBrandList();
    }
    if (saleBrandList.length === 0) {
      handleSaleBrandList();
    }
  }, []);

  return (
    <BrandsWrap>
      <div className="SearchInputArea">
        <SearchInput placeholder="Search by brand" />
      </div>
      <UnderLineBox>NEW BRAND</UnderLineBox>
      <div className="NewBrandWrap">
        {user.admin && (
          <Link to={`/brandform`}>
            <CreateBrand />
          </Link>
        )}
        {newBrandList.map((e, i) => (
          <Link to={`/brand/${e.id}`} className="Brand" key={i}>
            <Brand brand={e} />
          </Link>
        ))}
      </div>
      <UnderLineBox color="#F33131">SALE</UnderLineBox>
      <div className="SaleBrandWrap">
        {saleBrandList.map((e, i) => (
          <Link to={`/brand/${e.id}`} className="Brand" key={i}>
            <SaleBrand brand={e} />
          </Link>
        ))}
      </div>
      {/* <UnderLineBox>RECOMMEND</UnderLineBox> */}
    </BrandsWrap>
  );
}

const BrandsWrap = styled.div`
  padding: 20px 16px 0px 16px;
  .SearchInputArea {
    margin-bottom: 40px;
  }
  .NewBrandWrap {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 12px;
    margin-bottom: 40px;

    &::-webkit-scrollbar {
      display: none;
    }

    .Collection {
    }
  }
  .SaleBrandWrap {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 12px;
    margin-bottom: 40px;

    &::-webkit-scrollbar {
      display: none;
    }
    .Brand {
    }
  }
`;
