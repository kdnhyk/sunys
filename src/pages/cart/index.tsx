import { useEffect, useState } from "react";
import styled from "styled-components";
import CartArticle from "@/containers/cart/CartArticle";
import Head from "next/head";
import Footer from "@/components/common/Footer";
import useUser from "@/api/user/useUser";

export default function Cart() {
  const { user } = useUser();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // window.scrollTo(0, 0);
    // document.body.style.overflow = "hidden";

    let result = 0;
    user?.cart.map((item) => {
      result += Number(item.price);
    });

    setTotal(result);

    return () => {
      // document.body.style.overflow = "unset";
    };
  }, [user?.cart]);

  return (
    <>
      <Head>
        <title>SUNYS | 카트</title>
        <meta name="description" content="상품 장바구니, 위시리스트" />

        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/sunys-1dcf2.appspot.com/o/og_image.png?alt=media&token=adaa046e-ec2d-466a-9e40-828afe0bee71"
        />
        <meta property="og:title" content="SUNYS" />
        <meta
          property="og:description"
          content="서니즈 | 브랜드 아카이브 매거진"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://sunys.co.kr" />
      </Head>
      <CartBlock>
        {user && user.cart.length !== 0 ? (
          <>
            <div className="CartMain">
              {[...user.cart].reverse().map((article, i) => {
                return <CartArticle key={i} article={article} />;
              })}
            </div>

            <div className="CartFooter">
              <p className="TotalPrice">
                <span>Total</span>
                <span>
                  {total.toLocaleString("ko-KR", {
                    maximumFractionDigits: 4,
                  }) +
                    // " + α" +
                    " KRW"}
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
        <Footer />
      </CartBlock>
    </>
  );
}

const CartBlock = styled.div`
  padding: 16px;
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
