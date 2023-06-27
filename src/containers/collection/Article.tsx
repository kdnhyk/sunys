import styled from "styled-components";
import { IsArticle } from "../../types/article";
import Image from "next/image";
import { AddCartIcon, RemoveCartIcon } from "@/asset/Icon";
import { useHandleUser } from "@/hooks/useHandleUser";
import useModal from "@/hooks/useModal";
import useUser from "@/api/user/useUser";

interface IsArticleWrap {
  article: IsArticle;
}

export default function Article({ article }: IsArticleWrap) {
  const { user } = useUser();
  const { handleCart } = useHandleUser();
  const { onOpenModal } = useModal();

  const isInCart = user?.cart.find((e) => e.id === article.id) ? true : false;

  const onClickCart = () => {
    if (!user?.uid) {
      onOpenModal();
      return;
    }
    handleCart(article);
  };

  return (
    <ArticleWrap isInCart={isInCart}>
      <div className="ImageWrap">
        <Image src={article.images[0]} alt="" width={200} height={200} />
        <div className="HoverWap">
          <div className="CartWrap" onClick={onClickCart}>
            {!isInCart ? <AddCartIcon /> : <RemoveCartIcon />}
          </div>
        </div>
      </div>
      <div className="TextWrap">
        <h3>{article.articleName}</h3>

        <p>
          {article.price
            ? Number(article.price).toLocaleString("ko-KR", {
                maximumFractionDigits: 4,
              }) + " KRW"
            : ""}
        </p>
      </div>
    </ArticleWrap>
  );
}

const ArticleWrap = styled.div<{ isInCart: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;

  display: flex;
  flex-direction: column;

  .ImageWrap {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 4px;

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
  .TextWrap {
    height: fit-content;
    padding: 0px 8px;

    h3 {
      margin-bottom: 2px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    p {
      color: var(--placeholder-color);
    }
  }
`;
