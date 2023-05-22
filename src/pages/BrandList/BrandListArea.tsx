import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import TitleBox from "../../common/components/TitleBox";
import { useBrandList } from "../../hooks/useBrandList";
import useLocationState from "../../hooks/useLocationState";
import Button from "../../common/components/Button";

export default function BrandListArea() {
  const { sortUserBrandList, sortRestBrandList } = useBrandList();
  const { user } = useAuth();
  const { onClickBarnd, onClickBrandSetting } = useLocationState();

  return (
    <BrandListAreaWrap>
      {user.admin && (
        <div className="NewBrandWrap">
          <Button onClick={() => onClickBrandSetting()} isActivated={true}>
            NEW
          </Button>
        </div>
      )}
      {user.uid && (
        <>
          <div className="ScrapBrandWrap">
            <TitleBox>스크랩 브랜드</TitleBox>
            {sortUserBrandList(user.scrapBrandList).map((e, i) => (
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

        {sortRestBrandList(user.scrapBrandList).map((e, i) => (
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
  gap: 20px;
  .NewBrandWrap {
    width: 120px;
    padding: 12px;
  }

  .ScrapBrandWrap {
    padding: 0px 16px;

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
    padding: 0px 16px;
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
