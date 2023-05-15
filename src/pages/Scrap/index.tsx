import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../common/LoginModal";
import TitleBox from "../../common/components/TitleBox";
import { useCollection } from "../../hooks/useCollection";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IsCollection } from "../../types/collection";
import Collection from "../../common/components/Collection";

export default function Scrap() {
  const nav = useNavigate();
  const { user } = useAuth();
  const { getCollectionListByBrandNameList } = useCollection();

  const [currentCollectionList, setCurrentCollectionList] = useState<
    IsCollection[]
  >([]);

  const getScrapBrandList = () => {
    let result: string[] = [];
    user.scrapBrandList.forEach((e) => {
      result.push(e.default);
    });
    return result;
  };

  const exitPage = () => {};

  useEffect(() => {
    if (!user.uid) {
      nav("/account");
    }
  });

  useEffect(() => {
    if (user.scrapBrandList.length === 0) return;
    console.log("go");
    getCollectionListByBrandNameList(getScrapBrandList()).then(
      async (collection) => {
        await setCurrentCollectionList(collection);
      }
    );
  }, [user.scrapBrandList]);

  return (
    <ScrapWrap>
      <div className="ScrapBrandWrap">
        <TitleBox subTitle="나의 브랜드">My Brand</TitleBox>
        {user.scrapBrandList.map((e, i) => (
          <Link to={`/brand/${e.default}`} className="ScrapBrandInner" key={i}>
            <h3>{e.default}</h3>
            <p>{e.korean}</p>
          </Link>
        ))}
      </div>
      <div className="NewCollectionArea">
        <TitleBox subTitle="새로운 컬렉션">My News</TitleBox>
        <div className="NewCollectionWrap">
          {currentCollectionList.map((e, i) => (
            <Link
              to={`/collection/${e.id}`}
              className="ScrapBrandInner"
              key={i}
            >
              <Collection collection={e} />
            </Link>
          ))}
        </div>
      </div>
    </ScrapWrap>
  );
}

const ScrapWrap = styled.div`
  .ScrapBrandWrap {
    padding: 0px 16px;
    padding-bottom: 60px;
    border-bottom: 1px solid #dddddd;
    .ScrapBrandInner {
      width: fit-content;
      display: flex;
      margin-bottom: 6px;
      h3 {
        margin-right: 12px;
      }
      p {
        color: #8e8e8e;
      }
    }
  }

  .NewCollectionArea {
    margin-top: 20px;
    padding: 0px 16px;
    border-bottom: 1px solid #dddddd;

    .NewCollectionWrap {
      height: 320px;
      display: flex;
      gap: 10px;
      overflow-x: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;
