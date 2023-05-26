import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import TitleBox from "../TitleBox";
import useLocationState from "../../hooks/useLocationState";
import { toSortBrandList, toSortRestBrandList } from "@/util";
import useBrandList from "@/api/useBrandList";

export default function BrandListArea() {
  const { user } = useAuth();
  const { onClickBarnd, onClickBrandSetting } = useLocationState();
  const { data } = useBrandList();

  return (
    <BrandListAreaWrap>
      {user.admin && (
        <div className="NewBrandWrap">
          <div className="CreateBrand" onClick={() => onClickBrandSetting()}>
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
            <TitleBox>스크랩 브랜드</TitleBox>
            {toSortBrandList(user.scrapBrandList).map((e, i) => (
              <div
                className="ScrapBrandInner"
                onClick={() => onClickBarnd(e.default)}
                key={i}
              >
                <h3>{e.default}</h3>
                <p>{e.korean}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="DefaultBrandWrap">
        <TitleBox>전체 브랜드</TitleBox>

        {data &&
          toSortRestBrandList(data, user.scrapBrandList).map((e, i) => (
            <div
              className="DefaultBrandInner"
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
  .NewBrandWrap {
    width: 100%;
    height: 48px;
    padding: 12px;
    display: flex;
    justify-content: end;
    align-items: center;
    border-bottom: 1px solid #dddddd;
    .CreateBrand {
      height: 24px;
      cursor: pointer;
    }
  }

  .ScrapBrandWrap {
    padding: 20px 16px 0px 16px;

    .ScrapBrandInner {
      width: fit-content;
      display: flex;
      margin-top: 10px;
      cursor: pointer;
      h3 {
        margin-right: 12px;
      }
      p {
        color: #8e8e8e;
      }
    }
    .AllBrand {
      margin-top: 24px;
      p {
        font-weight: 500;
        color: #8e8e8e;
      }
    }
    .More {
      display: flex;
      width: 100%;

      justify-content: center;
      margin-top: 12px;

      cursor: pointer;

      // More
    }
  }

  .DefaultBrandWrap {
    padding: 20px 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #dddddd;
    .DefaultBrandInner {
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
`;
