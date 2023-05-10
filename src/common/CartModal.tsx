import { MouseEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";
import ProductInCart from "./components/ProductInCart";
import Button from "./components/Button";

interface IsCartModal {
  closeCart: () => void;
}

export default function CartModal({ closeCart }: IsCartModal) {
  const { cart } = useCart();
  const [total, setTotal] = useState(0);

  const onCheckout = () => {
    alert("현장에서만 구매 가능합니다");
  };

  useEffect(() => {
    let result = 0;
    cart.map((item) => {
      result += Number(item.price);
    });
    setTotal(result);
  }, [cart]);

  return (
    <CartModalBlock>
      <div className="Header">
        <h2>CART</h2>
        <div className="XBtnWrap">
          <p onClick={closeCart}>×</p>
        </div>
      </div>
      <div className="Cart">
        {cart.length !== 0 ? (
          <>
            <div className="CartMain">
              {cart.map((article, i) => {
                return <ProductInCart key={i} article={article} />;
              })}
            </div>

            <div className="CartFooter">
              <p className="TotalPrice">
                <span>Total</span>
                <span>
                  {total.toLocaleString("ko-KR", {
                    maximumFractionDigits: 4,
                  }) + " KRW"}
                </span>
              </p>
              <Button onClick={onCheckout}>Check out</Button>
            </div>
          </>
        ) : (
          <span className="EmptyText">Your cart is currently empty.</span>
        )}
      </div>
    </CartModalBlock>
  );
}

const CartModalBlock = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  .Header {
    position: relative;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: 1px solid white; */
    h2 {
      font-size: 24px;
      font-weight: 1000;
      font-style: italic;
    }
    .XBtnWrap {
      position: absolute;
      right: 6px;
      display: flex;
      justify-content: end;
      align-items: center;
      p {
        width: 40px;
        height: 40px;
        text-align: center;
        font-size: 36px;
        cursor: pointer;
      }
    }
  }

  .Cart {
    height: 100%;
    position: relative;
    padding: 15px 15px 0px 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    .CartMain {
      display: flex;
      flex-direction: column;
      gap: 15px;
      height: auto;
      max-height: calc(100% - 112px);
      overflow-y: auto;
    }
    .CartFooter {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
      .TotalPrice {
        display: flex;
        justify-content: space-between;
      }
      .CheckOutButton {
        height: 32px;
        width: 100%;
        background-color: white;
        color: white;
        border: 1px solid white;
        cursor: pointer;
        &:hover {
          background-color: white;
          color: white;
        }
      }
    }

    .EmptyText {
      padding-top: 15px;
      border-top: 1px solid white;
    }
  }
`;
