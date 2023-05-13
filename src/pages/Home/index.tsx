import styled from "styled-components";
import Collection from "../../common/components/Collection";
import { Link, useNavigate } from "react-router-dom";
import UnderLineBox from "../../common/components/TitleBox";
import UpcommingCollection from "./components/UpcommingCollection";
import { useCollection } from "../../hooks/useCollection";
import { useBrand } from "../../hooks/useBrand";
import { useEffect } from "react";

export default function Home() {
  const {
    upcommingList,
    recentList,
    getCollectionListByUpcomming,
    getCollectionListByRecent,
  } = useCollection();
  const { handleNewBrandList } = useBrand();
  const nav = useNavigate();

  const moveCollection = (id: string) => {
    nav(`/collection/${id}`);
  };

  useEffect(() => {
    handleNewBrandList();
    if (upcommingList.length === 0) {
      getCollectionListByUpcomming();
    }
    if (recentList.length === 0) {
      getCollectionListByRecent();
    }
  }, []);

  return (
    <HomeWrap>
      <div className="UpcommingWrap">
        <UnderLineBox subTitle="발매 예정">Upcomming</UnderLineBox>
        <div className="UpcommingList">
          {upcommingList.map((e, i) => (
            <Link to={`/collection/${e.id}`} className="Collection" key={i}>
              <UpcommingCollection collection={e} />
            </Link>
          ))}
        </div>
      </div>

      <div className="RecentWrap">
        <UnderLineBox subTitle="최근 컬렉션">Recent</UnderLineBox>
        <div className="RecentList">
          {recentList.map((e, i) => (
            <Link to={`/collection/${e.id}`} className="Collection" key={i}>
              <Collection collection={e} />
            </Link>
          ))}
        </div>
      </div>

      {/* <UnderLineBox>MAGAZINE</UnderLineBox> */}
    </HomeWrap>
  );
}

const HomeWrap = styled.div`
  padding-top: 20px;

  .UpcommingWrap {
    padding: 0px 16px;
    margin-bottom: 20px;
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
`;
