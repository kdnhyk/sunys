import styled from "styled-components";
import Collection from "../../common/components/Collection";
import TitleBox from "../../common/components/TitleBox";
import { useCollection } from "../../hooks/useCollection";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function News() {
  const {
    myList,
    upcommingList,
    recentList,
    getMyCollectionList,
    getUpcommingCollectionList,
    getRecentCollectionList,
  } = useCollection();
  const { user } = useAuth();

  const getScrapBrandList = () => {
    let result: string[] = [];
    user.scrapBrandList.forEach((e) => {
      result.push(e.default);
    });
    return result;
  };

  useEffect(() => {
    if (user.uid && myList.length === 0) {
      getMyCollectionList(getScrapBrandList());
    }
    if (upcommingList.length === 0) {
      getUpcommingCollectionList();
    }
    if (recentList.length === 0) {
      getRecentCollectionList();
    }
  }, []);

  return (
    <NewsWrap>
      {user.uid && (
        <div className="NewCollectionArea">
          <TitleBox subTitle="스크랩 브랜드">My News</TitleBox>
          <div className="NewCollectionWrap">
            {myList.map((e, i) => (
              <div className="ScrapBrandInner" key={i}>
                <Collection collection={e} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="RecentWrap">
        <TitleBox subTitle="최근 출시된 컬렉션">Recent</TitleBox>
        <div className="RecentList">
          {recentList.map((e, i) => (
            <div className="Collection" key={i}>
              <Collection collection={e} />
            </div>
          ))}
        </div>
      </div>

      <div className="UpcommingWrap">
        <TitleBox subTitle="발매 예정">Upcomming</TitleBox>
        <div className="UpcommingList">
          {upcommingList.map((e, i) => (
            <div className="Collection" key={i}>
              <Collection collection={e} />
            </div>
          ))}
        </div>
      </div>

      {/* <TitleBox>MAGAZINE</TitleBox> */}
    </NewsWrap>
  );
}

const NewsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .NewCollectionArea {
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

  .RecentWrap {
    padding: 0px 16px;
    border-bottom: 1px solid #dddddd;

    .RecentList {
      height: 320px;
      display: flex;
      gap: 10px;
      overflow-x: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  .UpcommingWrap {
    padding: 0px 16px;

    border-bottom: 1px solid #dddddd;
    .UpcommingList {
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
