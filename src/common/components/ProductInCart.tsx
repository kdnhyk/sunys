import styled from "styled-components";
import useCart from "../../hooks/useCart";
import { IsArticle } from "../../types/article";
import QuantityButton from "./QuantityButton";
import { useState } from "react";

interface IsProductInCart {
  article: IsArticle;
}

export default function ProductInCart({ article }: IsProductInCart) {
  const { removeItem } = useCart();
  const [currentQuantity, setcurrnetQuantity] = useState(1);

  return (
    <ProductInCartBlock>
      <div className="ImageWrap">
        <img alt={""} src={article.images[0]} />
      </div>
      <div className="InfoWrapper">
        <div className="TextArea">
          <h3>{article.articleName}</h3>
          <div className="Size">
            <p>size: {article.size}</p>
          </div>
        </div>
        <div className="QuantityAndPrice">
          <QuantityButton
            maxQuantity={1}
            removeItem={() => removeItem(article.id || "")}
            quantity={1}
            setQuantity={setcurrnetQuantity}
          />
          <p className="Price">
            {Number(article.price).toLocaleString("ko-KR", {
              maximumFractionDigits: 4,
            }) + " KRW"}
          </p>
        </div>
      </div>
    </ProductInCartBlock>
  );
}
const ProductInCartBlock = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  padding: 0px 0px 15px 0px;
  border-bottom: 1px solid white;
  .ImageWrap {
    width: 80px;
    height: 80px;
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      cursor: pointer;
    }
  }
  .InfoWrapper {
    width: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 6px;
    .TextArea {
      h3 {
        font-size: 14px;
        /* cursor: pointer; */
      }
      .Size {
        margin-top: 2px;
        font-size: 14px;
      }
    }

    .QuantityAndPrice {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      .Price {
      }
    }
  }
`;
