import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import { IsArticle } from "../../../types/article";
import styled from "styled-components";
import { useCloudUser } from "../../../hooks/firestore/useCloudUser";
import { useEffect } from "react";
import NotFound from "../../../asset/NotFound.png";
import useLocationState from "../../../hooks/useLocationState";

interface IsCartArticle {
  article: IsArticle;
}

export default function CartArticle({ article }: IsCartArticle) {
  const { user, handleUserCart } = useUser();
  const { updateCart } = useCloudUser();
  const nav = useNavigate();
  const { onClickBarndByBrandName, onClickCollectionByCid } =
    useLocationState();

  const onRemoveArticle = () => {
    handleUserCart(article);
    updateCart(user.uid, user.cart, article);
  };

  const onMoveCollection = () => {
    nav(`/collection/${article.collectionId}`);
  };

  const onErrorImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = NotFound;
  };

  useEffect(() => {
    // const img = new Image(article.images[0]);
  }, []);

  return (
    <CartArticleBlock>
      <div
        className="ImageWrap"
        onClick={() => onClickCollectionByCid(article.collectionId)}
      >
        <img
          alt={""}
          src={article.images[0]}
          width={110}
          height={110}
          onError={onErrorImg}
        />
      </div>
      <div className="InfoWrapper">
        <div className="TextArea">
          <div className="TextHeader">
            <div onClick={() => onClickBarndByBrandName(article.brandName)}>
              <h2>{`${article.brandName}`}</h2>
            </div>

            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={onRemoveArticle}
            >
              <path
                d="M2.65685 2.65687C-0.468102 5.78182 -0.468102 10.8456 2.65685 13.9706C5.78181 17.0955 10.8456 17.0955 13.9706 13.9706C17.0955 10.8456 17.0955 5.78182 13.9706 2.65687C10.8456 -0.468089 5.78181 -0.468089 2.65685 2.65687ZM12.237 5.66777C12.3876 5.81832 12.3876 6.06467 12.237 6.21521L10.1385 8.31372L12.237 10.4122C12.3876 10.5628 12.3876 10.8091 12.237 10.9597L10.9597 12.237C10.8091 12.3876 10.5628 12.3876 10.4122 12.237L8.31371 10.1385L6.2152 12.237C6.06465 12.3876 5.81831 12.3876 5.66776 12.237L4.39041 10.9597C4.23986 10.8091 4.23986 10.5628 4.39041 10.4122L6.48892 8.31372L4.39041 6.21521C4.23986 6.06467 4.23986 5.81832 4.39041 5.66777L5.66776 4.39042C5.81831 4.23987 6.06465 4.23987 6.2152 4.39042L8.31371 6.48893L10.4122 4.39042C10.5628 4.23987 10.8091 4.23987 10.9597 4.39042L12.237 5.66777Z"
                fill="#666666"
              />
            </svg>
          </div>

          <p
            className="ArticleName"
            onClick={() => onClickCollectionByCid(article.collectionId)}
          >
            {article.articleName}
          </p>

          {/* <p className="ReleaseDate">
            {article.releaseDate.replaceAll("-", ". ")}
          </p> */}
        </div>

        <div className="PriceWrap">
          <p className="Price">
            {Number(article.price).toLocaleString("ko-KR", {
              maximumFractionDigits: 4,
            }) + " KRW"}
          </p>
        </div>
      </div>
    </CartArticleBlock>
  );
}
const CartArticleBlock = styled.div`
  height: 120px;
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 0px 0px 16px 0px;
  border-bottom: 1px solid #dddddd;
  .ImageWrap {
    width: 120px;
    height: 120px;
    img {
      border-radius: 8px;
      object-fit: cover; //
      cursor: pointer;
    }
  }
  .InfoWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 6px;
    .TextArea {
      display: flex;
      flex-direction: column;
      gap: 6px;
      .TextHeader {
        display: flex;
        justify-content: space-between;
        h2 {
          cursor: pointer;
        }
        svg {
          cursor: pointer;
        }
      }
      .ArticleName {
        width: fit-content;
        cursor: pointer;
      }
    }
    .PriceWrap {
      .Price {
        width: fit-content;
      }
    }
  }
`;
