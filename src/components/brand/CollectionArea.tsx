import styled from "styled-components";
import { More } from "../../asset/Icon";
import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Collection from "../Collection";
import useBrandCollection from "../../api/useBrandCollection";
import { useRouter } from "next/router";
import { IsBrand } from "@/types/brand";

interface IsCollectionArea {
  data: IsBrand;
}

export default function CollectionArea({ data }: IsCollectionArea) {
  const router = useRouter();
  const width = typeof window !== "undefined" ? window.innerWidth : 0;
  const { currentCollection, fetchNextPage, hasNextPage } = useBrandCollection(
    data.brandName
  );

  const [onLoad, setOnLoad] = useState(false);

  const handleLoad = () => {
    setOnLoad(true);
  };

  useEffect(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  useEffect(() => {
    if (onLoad && hasNextPage) {
      fetchNextPage();
    }
    setOnLoad(false);
  }, [fetchNextPage, hasNextPage, onLoad]);

  return (
    <CollectionAreaStyle>
      {currentCollection.length > 0 && (
        <div className="CollectionWrap">
          <ResponsiveMasonry
            columnsCountBreakPoints={
              width < 700
                ? {
                    180: 1,
                    360: 2,
                    540: 3,
                    720: 4,
                    900: 5,
                    1080: 6,
                  }
                : {
                    540: 1,
                    720: 2,
                    900: 3,
                    1080: 4,
                  }
            }
          >
            <Masonry>
              {currentCollection.map((e, i) => (
                <div className="ColInner" key={i}>
                  <Collection collection={e} />
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
          {currentCollection.length > 0 && (
            <div className="More" onClick={handleLoad}>
              <More />
            </div>
          )}
        </div>
      )}
    </CollectionAreaStyle>
  );
}

const CollectionAreaStyle = styled.div`
  height: 100%;
  .CollectionWrap {
    height: 100%;
    position: relative;
    padding: 8px 8px 0px 8px;
    border-bottom: 1px solid #dddddd;

    .ColInner {
      padding: 8px;
    }

    .More {
      display: flex;
      justify-content: center;
      padding-bottom: 16px;
      cursor: pointer;
    }
  }
`;
