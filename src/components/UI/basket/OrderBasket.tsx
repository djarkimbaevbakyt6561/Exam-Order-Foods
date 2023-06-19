import { ReactComponent as BasketIcon } from "../../../assets/icons/basket-icon.svg";
import { ReactComponent as BasketIconBlack } from "../../../assets/icons/BasketIconBlack.svg";

import { ReactNode } from "react";
import { Button } from "@mui/material";

import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
interface OrderBasketProps {
  onToggle?: () => void;
  children?: ReactNode;
  totalAmount?: number;
  btnClasses: string;
}

const OrderBasket = ({
  children,
  onToggle,
  totalAmount,
  btnClasses,
}: OrderBasketProps) => {
  const { lightMode } = useSelector((state: RootState) => state.lightMode);
  return (
    <Button
      variant="contained"
      sx={{
        borderRadius: "30px",
        width: "249px",
        height: "59px",
        background: lightMode ? "rgb(138, 43, 6)" : "rgb(117, 212, 249)",
        color: lightMode ? "white" : "black",
        fontSize: "20px",
        textTransform: "none",
        "&:active": {
          background: lightMode ? "rgb(90, 31, 8)" : "#a3e5fe",
          border: "none",
        },
        "&:hover": {
          background: lightMode ? "rgb(90, 31, 8)" : "#a3e5fe",
          border: "none",
        },
      }}
      onClick={onToggle}
      className={btnClasses}
    >
      {lightMode ? <BasketIcon /> : <BasketIconBlack />}
      <OrderBasketTitle lightMode={lightMode}>{children}</OrderBasketTitle>
      <OrderBasketCount lightMode={lightMode}>{totalAmount}</OrderBasketCount>
    </Button>
  );
};

const OrderBasketTitle = styled.span<{ lightMode: boolean }>`
  color: ${(props) => (props.lightMode ? "white" : "black")};
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-left: 13px;
`;

const OrderBasketCount = styled.span<{ lightMode: boolean }>`
  width: 51px;
  height: 35px;
  background: ${(props) => (props.lightMode ? "#5a1f08" : "#a3e5fe")};
  border-radius: 30px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
  color: ${(props) => (props.lightMode ? "#ffffff" : "black")};
  margin-left: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default OrderBasket;
