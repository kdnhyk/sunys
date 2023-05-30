import styled from "styled-components";
import { BottomArrow } from "../../asset/Icon";
import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Collection from "../Collection";
import useBrandCollection from "../../api/useBrandCollection";
import { useRouter } from "next/router";
import { IsBrand } from "@/types/brand";
import { useInView } from "react-intersection-observer";

interface IsCollectionArea {
  data: IsBrand;
}

export default function CollectionArea({ data }: IsCollectionArea) {
  const width = typeof window !== "undefined" ? window.innerWidth : 0;
  const { currentCollection, fetchNextPage, hasNextPage } = useBrandCollection(
    data.brandName
  );
  const [ref, inView] = useInView();

  useEffect(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

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
            <div className="More" ref={ref}></div>
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
    padding: 12px 6px 0px 6px;

    .ColInner {
      padding: 6px;
    }

    .More {
    }
  }
`;
