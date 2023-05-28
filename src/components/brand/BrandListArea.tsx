import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import useLocationState from "../../hooks/useLocationState";
import { toSortBrandList, toSortRestBrandList } from "@/util";
import useBrandList from "@/api/useBrandList";
import { useState } from "react";

export default function BrandListArea() {
  const { user } = useAuth();
  const { onClickBarnd, onClickBrandSetting } = useLocationState();
  const { data } = useBrandList();

  const [searchInput, setSearchInput] = useState("");

  return (
    <BrandListAreaWrap>
      {user.admin && (
        <div className="CreateBrandButtonwrap">
          <div
            className="CreateBrandButton"
            onClick={() => onClickBrandSetting()}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.5" y="0.5" width="23" height="23" stroke="black" />
              <path d="M6 12H18M12 18V6" stroke="black" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      )}

      {user.uid && (
        <>
          <div className="ScrapBrandWrap">
            <div className="BrandTitle">
              <h1>스크랩 브랜드</h1>
            </div>
            {toSortBrandList(user.scrapBrandList).map((e, i) => (
              <div
                className="BrandInner"
                onClick={() => onClickBarnd(e.default)}
                key={i}
                style={
                  i === user.scrapBrandList.length - 1
                    ? { borderBottom: "1px solid black" }
                    : {}
                }
              >
                <h3>{e.default}</h3>
                <p>{e.korean}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="AllBrandWrap">
        <div className="BrandTitle">
          <h1>전체 브랜드</h1>
        </div>

        {data &&
          toSortRestBrandList(data, user.scrapBrandList).map((e, i) => (
            <div
              className="BrandInner"
              key={i}
              onClick={() => onClickBarnd(e.default)}
            >
              <h3>{e.default}</h3>
              <p>{e.korean}</p>
            </div>
          ))}
      </div>
    </BrandListAreaWrap>
  );
}

const BrandListAreaWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;

  .CreateBrandButtonwrap {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: end;
    align-items: center;

    padding: 0px 12px;
    border-bottom: 1px solid var(--line-color);

    .CreateBrandButton {
      height: 24px;
      cursor: pointer;
    }
  }

  .ScrapBrandWrap,
  .AllBrandWrap {
    .BrandTitle {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0px 16px;
      border-bottom: 1px solid var(--line-color);
      h1 {
      }
    }

    .BrandInner {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0px 16px;
      border-bottom: 1px solid var(--border-color);

      &:hover {
      }

      cursor: pointer;
      h3 {
        margin-right: 12px;
      }
      p {
        color: #8e8e8e;
      }
    }
  }
`;
