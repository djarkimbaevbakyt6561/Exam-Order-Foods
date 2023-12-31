import { Button } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import OrderBasket from "../../components/UI/basket/OrderBasket";
import Toggle from "../../components/UI/toggle/Toggle";
import { AppDispatch, RootState } from "../../store";
import { authActions } from "../../store/auth/auth.slice";
import { basketActions } from "../../store/basket/basket.slice";
import { getBasket } from "../../store/basket/basket.thunk";
import { resetUser } from "../../utils/constants";
import classes from "./UserHeader.module.css";
export const UserHeader = () => {
  const { lightMode } = useSelector((state: RootState) => state.lightMode);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  function navigateToSignIn() {
    navigate("/signin");
  }
  function logOutHandler() {
    dispatch(authActions.logOutHandler());
    navigate("/signin");
    localStorage.setItem("AuthLogin", JSON.stringify(resetUser()));
  }
  const [btnIsHighlighted, setBtnIsHishlighted] = useState<boolean>(false);
  const { items, totalAmount } = useSelector(
    (state: RootState) => state.basket
  );
  const btnClasses = `${btnIsHighlighted ? classes.bump : undefined}`;
  useEffect(() => {
    dispatch(basketActions.getTotalAmount());
    setBtnIsHishlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHishlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  function openModal() {
    dispatch(basketActions.toggleModalHandler());
  }
  useEffect(() => {
    dispatch(getBasket());
  }, []);
  return (
    <Container lightMode={lightMode}>
      <h1>ReactMeals</h1>
      <OrderBasket
        onToggle={openModal}
        btnClasses={btnClasses}
        totalAmount={totalAmount}
      >
        Your Cart
      </OrderBasket>
      <Toggle />
      {auth.isAuthorization ? (
        <Button
          variant="contained"
          sx={{
            borderRadius: "30px",
            width: "160px",
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
          onClick={logOutHandler}
        >
          LogOut{" "}
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{
            borderRadius: "30px",
            width: "160px",
            height: "59px",
            background: lightMode ? "#5a1f08" : "#a3e5fe",
            color: lightMode ? "white" : "black",
            fontSize: "20px",
            textTransform: "none",
            "&:active": {
              background: lightMode ? "#4d1601" : "#b2e9fe",
              border: "none",
            },
            "&:hover": {
              background: lightMode ? "#4d1601" : "#b2e9fe",
              border: "none",
            },
          }}
          onClick={navigateToSignIn}
        >
          Sign In{" "}
        </Button>
      )}
    </Container>
  );
};

const Container = styled.header<{ lightMode: boolean }>`
  height: 101px;
  background: ${(props) => (props.lightMode ? "#75d4f9" : "#8a2b06")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 120px;
  font-family: "Poppins";
  color: ${(props) => (props.lightMode ? "black " : "white")};
`;
