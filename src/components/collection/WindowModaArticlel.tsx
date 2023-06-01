import styled from "styled-components";
import { IsArticle } from "../../types/article";
import { useAuth } from "../../hooks/useAuth";
import Button from "../Button";
import Image from "next/image";
import useModal from "@/hooks/useModal";
import { useUser } from "@/api/useUser";
import { useEffect } from "react";
import { media } from "@/media";

interface IsWindowModalArticle {
  exitModal: () => void;
  article: IsArticle;
}

export default function WindowModalArticle({
  exitModal,
  article,
}: IsWindowModalArticle) {
  const { user } = useAuth();
  const { handleCart } = useUser();
  const { onOpenModal } = useModal();

  const isInCart = user.cart.find((e) => e.id === article.id) ? true : false;

  const onClickCart = () => {
    if (!user.uid) {
      onOpenModal();
      return;
    }
    handleCart(user, article);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <WindowModalArticleBlock>
      <div className="ModalInner">
        <div className="HeaderWrap">
          <h1>{article.brandName}</h1>
        </div>

        <Image src={article.images[0]} alt="" width={300} height={400} />

        <div className="MainWrap">
          <h3>{article.articleName}</h3>
          <p>
            {Number(article.price).toLocaleString("ko-KR", {
              maximumFractionDigits: 4,
            }) + " KRW"}
          </p>

          <div className="ButtonWrap">
            <Button
              onClick={onClickCart}
              disable={isInCart}
              isActivated={!isInCart}
            >
              저장
            </Button>
            <Button onClick={exitModal} isActivated={false} width="120px">
              취소
            </Button>
          </div>
        </div>
      </div>

      <div className="Background" onClick={exitModal}></div>
    </WindowModalArticleBlock>
  );
}
const WindowModalArticleBlock = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  .ModalInner {
    position: absolute;
    top: 51px;
    width: 100%;
    max-width: 300px;
    height: auto;

    background-color: var(--background-color);

    display: flex;
    flex-direction: column;
    justify-content: center;

    border: 1px solid var(--line-color);
    overflow-y: auto;
    z-index: 100;

    .HeaderWrap {
      padding: 8px 12px;
      border-bottom: 1px solid grey;
      display: flex;
      justify-content: center;

      border-bottom: 1px solid var(--line-color);
      background-color: var(--background-color);
      z-index: 100;

      h1 {
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .MainWrap {
      display: flex;
      flex-direction: column;
      gap: 6px;
      background-color: var(--background-color);

      padding: 8px 12px 12px 12px;

      z-index: 10;

      h3 {
      }
      p {
        margin-bottom: 8px;
      }
      .ButtonWrap {
        display: flex;
        gap: 10px;
      }
    }
  }

  .Background {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(1, 1, 1, 0.2);
  }

  ${media.desktop`
    .ModalInner {
      position: static;
    }
  `}
`;
