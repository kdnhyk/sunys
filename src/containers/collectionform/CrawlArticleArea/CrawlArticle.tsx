import styled from "styled-components";
import Image from "next/image";
import { AddCartIcon } from "@/asset/Icon";
import { IsCollection } from "@/types/collection";
import useCrawlArticleForm from "./useCrawlArticleForm";

interface IsCrawlArticle {
  data: any;
  lastCollection: IsCollection;
}

export default function CrawlArticle({ data, lastCollection }: IsCrawlArticle) {
  const { input, onChangeInput, onSubmit } = useCrawlArticleForm(
    data,
    lastCollection
  );

  return (
    <CrawlArticleWrap>
      <div className="ImageWrap">
        <Image src={data.images[0]} alt="" width={200} height={200} />
        <div className="HoverWap">
          <div className="CartWrap" onClick={onSubmit}>
            <AddCartIcon />
          </div>
        </div>
      </div>

      <div className="TextWrap">
        <h3 className="ArticleName">{data.articleName}</h3>
        <p className="Price">{data.price} KRW</p>
      </div>
    </CrawlArticleWrap>
  );
}

const CrawlArticleWrap = styled.div`
  .ImageWrap {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .HoverWap {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

      transition: all 0.3s ease-in-out;
      background-color: rgba(1, 1, 1, 0.4);

      opacity: 0;
      &:hover {
        opacity: 1;
      }

      svg {
        cursor: pointer;
      }
    }
  }
`;
