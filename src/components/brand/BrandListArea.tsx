import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import TitleBox from "../TitleBox";
import useLocationState from "../../hooks/useLocationState";
import Button from "../Button";
import { toSortBrandList, toSortRestBrandList } from "@/util";
import useBrandList, { getBrandList } from "@/api/useBrandList";
import { QueryClient, dehydrate } from "@tanstack/react-query";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["brandlist"], () => getBrandList(), {
    staleTime: Infinity,
  });

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default function BrandListArea() {
  const { user } = useAuth();
  const { onClickBarnd, onClickBrandSetting } = useLocationState();
  const { data } = useBrandList();

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
