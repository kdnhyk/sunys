import styled from "styled-components";
import Collection from "@/components/Collection";
import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import useUserCollection from "@/api/collection/useUserCollection";
import { useInView } from "react-intersection-observer";
import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { IsUser } from "@/types/user";

interface IsUserCollectionList {
  user: IsUser;
}

export default function UserColllectoinList({ user }: IsUserCollectionList) {
  const width = typeof window !== "undefined" ? window.innerWidth : 0;
  const { userCollection, fetchNextPage, hasNextPage } = useUserCollection(
    user.scrapBrandList.map((e) => e.default)
  );
  const [ref, inView] = useInView();

  useEffect(() => {
    if (userCollection.length === 0) {
      fetchNextPage();
    }
  }, [fetchNextPage, userCollection.length]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  // recoil 때문에 SEO 안될거 같음
  if (userCollection.length === 0) return <></>;

  return (
    <UserColllectoinListStyle>
      <div className="NewColArea">
        <ResponsiveMasonry
          columnsCountBreakPoints={
            width > 768
              ? {
                  180: 1,
                  360: 2,
                  540: 3,
                  800: 4,
                  1000: 5,
                  1200: 6,
                }
              : {
                  600: 1,
                  800: 2,
                  1000: 3,
                  1200: 4,
                }
          }
        >
          <Masonry>
            {userCollection.map((e, i) => (
              <div className="ColInner" key={i}>
                <Collection collection={e} />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
        <div className="More" ref={ref}></div>
      </div>
    </UserColllectoinListStyle>
  );
}

const UserColllectoinListStyle = styled.div`
  padding: 0px 0px 24px 0px;
  .NewColArea {
    padding: 0px 6px 20px 6px;

    .ColInner {
      padding: 6px;
    }

    .More {
      display: flex;
      justify-content: center;

      cursor: pointer;
    }
  }
`;
