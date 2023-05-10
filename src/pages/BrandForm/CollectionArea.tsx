import styled from "styled-components";
import UnderLineBox from "../../common/components/UnderLineBox";
import CreateCollection from "./components/CreateCollection";
import { Link } from "react-router-dom";
import Collection from "./components/Collection";
import { useCollection } from "../../hooks/useCollection";
import { useEffect } from "react";

interface IsCollectionArea {
  id: string;
}

export default function CollectionArea({ id }: IsCollectionArea) {
  const { collectionList, getCollectionListByBrandNameAdmin } = useCollection();

  useEffect(() => {
    getCollectionListByBrandNameAdmin(id);
  }, []);

  return (
    <CollectionAreaWrap>
      <UnderLineBox>COLLECTION</UnderLineBox>
      <div className="CollectionWrap">
        <Link
          to={`/brandform/${id}/collectionform`}
          className="CreateCollectionWrap"
        >
          <CreateCollection />
        </Link>
        {collectionList.map((e, i) => (
          <Link to={`/brandform/${id}/collectionform/${e.id}`} key={i}>
            <Collection collection={e} />
          </Link>
        ))}
      </div>
    </CollectionAreaWrap>
  );
}

const CollectionAreaWrap = styled.div`
  .CollectionWrap {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 12px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
