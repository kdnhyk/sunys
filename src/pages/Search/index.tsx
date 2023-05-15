import styled from "styled-components";
import UnderLineBox from "../../common/components/TitleBox";
import { Link } from "react-router-dom";
import Brand from "./components/Brand";
import SaleBrand from "./components/SaleBrand";
import CreateBrand from "../../common/components/CreateBox";
import { useBrand } from "../../hooks/useBrand";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import SearchInput from "../../common/SearchInput";

//END
export default function Search() {
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
    <SearchListWrap>
      <div className="SearchInputWrap">
        <SearchInput placeholder="Search By Brand" />
      </div>
      <div className="NewBrandWrap">
        <UnderLineBox subTitle="새로운 브랜드">New Brand</UnderLineBox>
        <div className="NewBrandList">
          {user.admin && (
            <Link to={`/brandform`}>
              <CreateBrand />
            </Link>
          )}
          {newBrandList.map((e, i) => (
            <Link to={`/brand/${e.brandName}`} className="Brand" key={i}>
              <Brand brand={e} />
            </Link>
          ))}
        </div>
      </div>
      <div className="SaleBrandWrap">
        <UnderLineBox color="#F33131" subTitle="할인 중인 브랜드">
          Sale
        </UnderLineBox>
        <div className="SaleBrandList">
          {saleBrandList.map((e, i) => (
            <Link to={`/brand/${e.brandName}`} className="Brand" key={i}>
              <SaleBrand brand={e} />
            </Link>
          ))}
        </div>
      </div>

      {/* <UnderLineBox>RECOMMEND</UnderLineBox> */}
    </SearchListWrap>
  );
}

const SearchListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .SearchInputWrap {
    padding: 0px 16px;
    padding-bottom: 40px;
    border-bottom: 1px solid #dddddd;
  }

  .NewBrandWrap {
    padding: 0px 16px;
    border-bottom: 1px solid #dddddd;
    .NewBrandList {
      height: 280px;
      display: flex;
      gap: 10px;
      overflow-x: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  .SaleBrandWrap {
    padding: 0px 16px;
    border-bottom: 1px solid #dddddd;

    .SaleBrandList {
      height: 240px;
      display: flex;
      gap: 10px;
      overflow-x: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;
