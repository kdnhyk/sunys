import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import useLocationState from "../../hooks/useLocationState";
import { toSortBrandList, toSortRestBrandList } from "@/util";
import useBrandList from "@/api/useBrandList";
import { AddIcon } from "@/asset/Icon";
import { IsBrandName } from "@/types/brand";
import { useMemo } from "react";

interface IsBrandList {
  searchInput: string;
}

export default function BrandListArea({ searchInput }: IsBrandList) {
  const { user } = useAuth();
  const { onClickBarnd, onClickBrandSetting } = useLocationState();
  const { data: brandList } = useBrandList();

  const resultBrandList = useMemo(
    () =>
      brandList
        ? brandList.filter((e: IsBrandName) => {
            return (
              e.default
                .replace(" ", "")
                .toLocaleLowerCase()
                .includes(searchInput.toLocaleLowerCase().replace(" ", "")) ||
              e.korean
                .replace(" ", "")
                .includes(searchInput.toLocaleLowerCase().replace(" ", ""))
            );
          })
        : [],
    [brandList, searchInput]
  );

  return (
    <BrandListAreaWrap>
      {user.admin && (
        <div className="CreateBrandButtonwrap">
          <div
            className="CreateBrandButton"
            onClick={() => onClickBrandSetting()}
          >
            <AddIcon />
          </div>
        </div>
      )}

      {searchInput ? (
        <>
          <div className="SearchBrandWrap">
            {toSortBrandList(resultBrandList).map((e, i) => (
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
      ) : (
        <>
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

            {brandList &&
              toSortRestBrandList(brandList, user.scrapBrandList).map(
                (e, i) => (
                  <div
                    className="BrandInner"
                    key={i}
                    onClick={() => onClickBarnd(e.default)}
                  >
                    <h3>{e.default}</h3>
                    <p>{e.korean}</p>
                  </div>
                )
              )}
          </div>
        </>
      )}
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
  .SearchBrandWrap,
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
