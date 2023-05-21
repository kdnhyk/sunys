import styled from "styled-components";
import Collection from "../../common/components/Collection";
import TitleBox from "../../common/components/TitleBox";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { More } from "../../asset/Icon";

export default function NewsUser() {
  const { user } = useAuth();

  // const getScrapBrandList = () => {
  //   let result: string[] = [];
  //   user.scrapBrandList.forEach((e) => {
  //     result.push(e.default);
  //   });
  //   return result;
  // };

  // const [onLoad, setOnLoad] = useState(false);
  // const handleLoad = () => {
  //   setOnLoad(true);
  // };

  // useEffect(() => {
  //   if (user.uid && myList.length === 0) {
  //     getMyCollectionList(getScrapBrandList());
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log(myList);
  //   console.log(myList[-1]);
  //   if (onLoad && myList[-1]) {
  //     getMyCollectionList(getScrapBrandList());
  //   }
  //   setOnLoad(false);
  // }, [onLoad]);

  return (
    <NewsUserWrap>
      {/* <div className="TitleWrap">
        <TitleBox subTitle="구독중인 컬렉션">My Collection</TitleBox>
      </div>
      <div className="MyColArea">
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            300: 1,
            400: 2,
            660: 3,
            880: 4,
            1100: 5,
            1320: 6,
          }}
        >
          <Masonry>
            {myList.map((e, i) => (
              <div className="ColInner" key={i}>
                <Collection collection={e} />{" "}
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
        <div className="More" onClick={handleLoad}>
          <More />
        </div>
      </div> */}
    </NewsUserWrap>
  );
}

const NewsUserWrap = styled.div`
  .TitleWrap {
    padding: 0px 16px;
  }

  .MyColArea {
    padding: 0px 8px;
    border-bottom: 1px solid #dddddd;
    padding-bottom: 20px;
    margin-bottom: 30px;

    .ColInner {
      padding: 8px;
    }

    .More {
      display: flex;
      justify-content: center;
      cursor: pointer;
    }
  }
`;
