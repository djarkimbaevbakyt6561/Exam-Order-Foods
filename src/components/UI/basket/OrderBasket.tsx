import styled from "styled-components";
import { ReactComponent as BasketIcon } from "../../../assets/icons/basket-icon.svg";
import { ReactNode } from "react";

interface OrderBasketProps {
  onToggle?: () => void;
  children?: ReactNode;
  totalAmount?: number;
}

const OrderBasket = ({ children, onToggle, totalAmount }: OrderBasketProps) => {
  return (
    <Button onClick={onToggle}>
      <BasketIcon /> <OrderBasketTitle>{children}</OrderBasketTitle>
      <OrderBasketCount>{totalAmount}</OrderBasketCount>
    </Button>
  );
};

const Button = styled.button`
  width: 249px;
  height: 59px;
  background: #5a1f08;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #4d1601;
  }
`;
const OrderBasketTitle = styled.span`
  color: white;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-left: 13px;
`;

const OrderBasketCount = styled.span`
  width: 51px;
  height: 35px;
  background: #8a2b06;
  border-radius: 30px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
  color: #ffffff;
  margin-left: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default OrderBasket;
