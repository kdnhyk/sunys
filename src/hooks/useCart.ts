import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { cartSelector } from "../store/cart";
import { IsArticle } from "../types/article";

export default function useCart() {
  const [cart, setCart] = useRecoilState<IsArticle[]>(cartSelector);
  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (localCart === null) return;
    setCart(JSON.parse(localCart));
  }, []);

  const addItem = (newValue: IsArticle) => {
    const newCart = [...cart, newValue];
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };
  const removeItem = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };
  const updateQuantity = (id: string, newValue: number) => {
    const newCart = cart.map((product) =>
      product.id === id ? { ...product, quantity: newValue } : product
    );
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
  };
}
