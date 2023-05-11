import styled from "styled-components";
import Collection from "../../common/components/Collection";
import { Link, useNavigate } from "react-router-dom";
import UnderLineBox from "../../common/components/UnderLineBox";
import UpcommingCollection from "./components/UpcommingCollection";
import { useCollection } from "../../hooks/useCollection";
import { useBrand } from "../../hooks/useBrand";
import { useEffect } from "react";

export default function Home() {
  const { collectionList, handleRecentCollectionList } = useCollection();
  const { handleNewBrandList } = useBrand();
  const nav = useNavigate();

  const moveCollection = (id: string) => {
    nav(`/collection/${id}`);
  };

  useEffect(() => {
    handleNewBrandList();
    handleRecentCollectionList();
  }, []);

  return (
    <HomeWrap>
      <UnderLineBox>UPCOMMING</UnderLineBox>
      <div className="UpcommingWrap">
        {collectionList.map((e, i) => (
          <Link to={`/collection/${e.id}`} className="Collection" key={i}>
            <UpcommingCollection collection={e} />
          </Link>
        ))}
      </div>
      <UnderLineBox>RECENT</UnderLineBox>
      <div className="RecentWrap">
        {collectionList.map((e, i) => (
          <Link to={`/collection/${e.id}`} className="Collection" key={i}>
            <Collection collection={e} />
          </Link>
        ))}
      </div>
      <UnderLineBox>MAGAZINE</UnderLineBox>
    </HomeWrap>
  );
}

const HomeWrap = styled.div`
  padding: 64px 16px 24px 16px;
  .UpcommingWrap {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 12px;
    margin-bottom: 40px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .RecentWrap {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 12px;
    margin-bottom: 40px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
