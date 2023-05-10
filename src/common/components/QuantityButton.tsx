import { SetStateAction } from "react";
import styled from "styled-components";

interface IsQuantityButton {
  maxQuantity: number;
  removeItem: () => void;
  quantity: number;
  setQuantity: React.Dispatch<SetStateAction<number>>;
}
export default function QuantityButton({
  maxQuantity,
  removeItem,
  quantity,
  setQuantity,
}: IsQuantityButton) {
  const onDecrease = () => {
    if (quantity <= 1) {
      removeItem();
    }
    setQuantity((prev) => prev - 1);
  };
  const onIncrease = () => {
    if (quantity >= maxQuantity) return;
    setQuantity((prev) => prev + 1);
  };
  return (
    <QuantityButtonBlock>
      <button onClick={onDecrease}>−</button>
      <span>{quantity}</span>
      <button onClick={onIncrease}>+</button>
    </QuantityButtonBlock>
  );
}

const QuantityButtonBlock = styled.div`
  display: flex;
  align-items: center;
  width: 74px;
  height: 26px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  button {
    height: 24px;
    width: 24px;
    font-size: 12px;
    background-color: inherit;
    color: white;
    cursor: pointer;
  }
  span {
    text-align: center;
    font-size: 12px;
    width: 24px;
  }
`;
