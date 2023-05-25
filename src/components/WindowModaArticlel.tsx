import styled from "styled-components";
import { IsArticle } from "../types/article";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useCloudUser } from "../hooks/firestore/useCloudUser";
import { useUser } from "../hooks/useUser";
import Button from "./Button";
import { useRouter } from "next/router";
import Image from "next/image";
import useModal from "@/hooks/useModal";

interface IsWindowModalArticle {
  exitModal: () => void;
  article: IsArticle;
}

export default function WindowModalArticle({
  exitModal,
  article,
}: IsWindowModalArticle) {
  const { user } = useAuth();
  const { updateCart } = useCloudUser();
  const { handleUserCart } = useUser();
  const { onOpenModal } = useModal();

  const [isCartOn, setIsCartOn] = useState(false);

  const isInCart = user.cart.find((e) => e.id === article.id) ? true : false;

  const onClickCart = () => {
    if (!user.uid) {
      onOpenModal();
      return;
    }
    updateCart(user.uid, user.cart, article);
    handleUserCart(article);
  };

  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "unset";
  //   };
  // }, []);

  useEffect(() => {
    if (isInCart) {
      setIsCartOn(false);
    } else {
      setIsCartOn(true);
    }
  }, [isInCart]);

  return (
    <WindowModalArticleBlock>
      <div className="ModalInner">
        <div className="HeaderWrap">
          <h2>{article.brandName}</h2>
          <div className="ButtonWrap">
            <div></div>
            <div></div>
            <div className="CloseBtn" onClick={exitModal}></div>
          </div>
        </div>

        <div className="MainWrap">
          <div className="ImageWrap">
            <Image src={article.images[0]} alt="" width={200} height={200} />
          </div>
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
              Cart
            </Button>
            <Button onClick={exitModal} isActivated={false} width="100px">
              Cancel
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
    width: 300px;
    height: auto;

    background-color: #fcfcfc;

    display: flex;
    flex-direction: column;
    justify-content: center;

    border-width: 1px 1px 1px 1px;
    border-color: grey;
    border-style: solid;

    z-index: 100;

    .HeaderWrap {
      padding: 10px 10px 10px 16px;
      border-bottom: 1px solid grey;
      display: flex;
      justify-content: space-between;
      background-color: #fcfcfc;
      z-index: 100;
      h2 {
        font-weight: 400;
      }
      .ButtonWrap {
        display: flex;
        align-items: center;
        gap: 6px;
        div {
          width: 12px;
          height: 12px;
          background-color: #666666;
          border-radius: 20px;
        }
        .CloseBtn {
          background-color: #f35e5e;
          cursor: pointer;
        }
      }
    }

    .MainWrap {
      padding: 16px 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      background-color: #fcfcfc;
      z-index: 10;

      .ImageWrap {
        width: 100%;
        height: 100%;
        /* border: 1px solid white; */
      }
      h3 {
      }
      p {
        color: #8e8e8e;
        margin-bottom: 12px;
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
  }
`;
