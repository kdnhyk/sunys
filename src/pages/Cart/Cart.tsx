import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import CartArticle from "./components/CartArticle";

interface IsCart {}

export default function Cart({}: IsCart) {
  const { user } = useAuth();
  const [total, setTotal] = useState(0);

  const onCheckout = () => {
    alert("현장에서만 구매 가능합니다");
  };

  useEffect(() => {
    // window.scrollTo(0, 0);
    // document.body.style.overflow = "hidden";

    let result = 0;
    user.cart.map((item) => {
      result += Number(item.price);
    });
    setTotal(result);

    return () => {
      // document.body.style.overflow = "unset";
    };
  }, [user.cart]);

  return (
    <CartBlock>
      {user.cart.length !== 0 ? (
        <>
          <div className="CartMain">
            {user.cart.map((article, i) => {
              return <CartArticle key={i} article={article} />;
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
            {/* <Button onClick={onCheckout}>Check out</Button> */}
          </div>
        </>
      ) : (
        <div className="EmptyTextWrap">
          <p>Your cart is currently empty.</p>
        </div>
      )}
    </CartBlock>
  );
}

const CartBlock = styled.div`
  padding: 40px 16px 24px 16px;
  display: flex;
  flex-direction: column;

  .CartMain {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: auto;
    max-height: calc(100% - 112px);
    overflow-y: auto;
    margin-bottom: 16px;
  }
  .CartFooter {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    .TotalPrice {
      display: flex;
      justify-content: space-between;
      font-weight: 500;
    }
  }
  .EmptyTextWrap {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    p {
      font-weight: 500;
    }
  }
`;
