import styled from "styled-components";
import Collection from "./components/Collection";
import { Link } from "react-router-dom";
import UnderLineBox from "../../common/components/UnderLineBox";
import Brand from "./components/Brand";
import UpcommingCollection from "./components/UpcommingCollection";
import { useCollection } from "../../hooks/useCollection";
import { useBrand } from "../../hooks/useBrand";
import { useEffect } from "react";

export default function Home() {
  const { collectionList, handleRecentCollectionList } = useCollection();
  const { saleBrandList } = useBrand();
  const { handleNewBrandList, handleSaleBrandList } = useBrand();

  useEffect(() => {
    handleNewBrandList();
    handleSaleBrandList();
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
      <UnderLineBox color="#F33131">SALE</UnderLineBox>
      <div className="SaleBrandWrap">
        {saleBrandList.map((e, i) => (
          <Link to={`/brand/${e.id}`} className="Brand" key={i}>
            <Brand brand={e} />
          </Link>
        ))}
      </div>
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

    .Collection {
    }
  }

  .SaleBrandWrap {
    height: 476px;
    display: flex;
    flex-direction: column;
    align-content: start;
    flex-wrap: wrap;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 12px;
    margin-bottom: 40px;

    /* display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;

    @media (min-width: 605px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media (min-width: 885px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    @media (min-width: 1165px) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    } */

    &::-webkit-scrollbar {
      display: none;
    }
    .Brand {
    }
  }
`;
