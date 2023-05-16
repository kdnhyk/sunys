import styled from "styled-components";
import UnderLineBox from "../../common/components/TitleBox";
import { useNavigate } from "react-router-dom";
import Brand from "./components/Brand";
import SaleBrand from "./components/SaleBrand";
import CreateBrand from "../../common/components/CreateBox";
import { useBrand } from "../../hooks/useBrand";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import SearchInput from "../../common/SearchInput";
import TitleBox from "../../common/components/TitleBox";
import { IsBrand } from "../../types/brand";

//END
export default function BrandList() {
  const {
    newBrandList,
    saleBrandList,
    handleNewBrandList,
    handleSaleBrandList,
  } = useBrand();
  const {} = useBrand();
  const { user } = useAuth();
  const nav = useNavigate();

  const onClickBrand = (brand: IsBrand) => {
    nav(`/brand/${brand.brandName}`, {
      state: {
        brand: brand,
      },
    });
  };

  useEffect(() => {
    if (newBrandList.length === 0) {
      handleNewBrandList();
    }
    if (saleBrandList.length === 0) {
      handleSaleBrandList();
    }
  }, []);

  return (
    <BrandListWrap>
      <div className="SearchInputWrap">
        <SearchInput placeholder="Search By Brand" />
      </div>

      {user.uid && (
        <div className="ScrapBrandWrap">
          <TitleBox>My Brand</TitleBox>
          {user.scrapBrandList.map((e, i) => (
            <div
              className="ScrapBrandInner"
              onClick={() =>
                nav(e.default, { state: { brand: { brandName: e.default } } })
              }
              key={i}
            >
              <h3>{e.default}</h3>
              <p>{e.korean}</p>
            </div>
          ))}
        </div>
      )}

      <div className="NewBrandWrap">
        <UnderLineBox subTitle="새로운 브랜드">New Brand</UnderLineBox>
        <div className="NewBrandList">
          {user.admin && (
            <div onClick={() => nav("/brandform")}>
              <CreateBrand />
            </div>
          )}
          {newBrandList.map((e, i) => (
            <div onClick={() => onClickBrand(e)} key={i}>
              <Brand brand={e} />
            </div>
          ))}
        </div>
      </div>
      <div className="SaleBrandWrap">
        <UnderLineBox color="#F33131" subTitle="할인 중인 브랜드">
          Sale
        </UnderLineBox>
        <div className="SaleBrandList">
          {saleBrandList.map((e, i) => (
            <div onClick={() => onClickBrand(e)} key={i}>
              <SaleBrand brand={e} />
            </div>
          ))}
        </div>
      </div>

      {/* <UnderLineBox>RECOMMEND</UnderLineBox> */}
    </BrandListWrap>
  );
}

const BrandListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .SearchInputWrap {
    padding: 0px 16px;
    padding-bottom: 30px;
    border-bottom: 1px solid #dddddd;
    display: flex;
    justify-content: center;
  }

  .ScrapBrandWrap {
    padding: 0px 16px;
    padding-bottom: 30px;
    border-bottom: 1px solid #dddddd;
    .ScrapBrandInner {
      width: fit-content;
      display: flex;
      margin-top: 8px;
      cursor: pointer;
      h3 {
        margin-right: 12px;
      }
      p {
        color: #8e8e8e;
      }
    }
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
