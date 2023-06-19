import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import OrderBasket from "../../components/UI/basket/OrderBasket";
import Toggle from "../../components/UI/toggle/Toggle";
import { AppDispatch, RootState } from "../../store";
import { authActions } from "../../store/auth/auth.slice";
import { resetUser } from "../../utils/constants";

export const AppHeader = () => {
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
  return (
    <Container lightMode={lightMode}>
      <h1>ReactMeals</h1>
      <Toggle />
      {auth.isAuthorization ? (
        <Button
          variant="contained"
          sx={{
            borderRadius: "30px",
            width: "160px",
            height: "59px",
            background: "rgb(90, 31, 8)",
            color: "white",
            fontSize: "20px",
            textTransform: "none",
            "&:active": {
              background: "#4d1601",
              color: "white",
              border: "none",
            },
            "&:hover": {
              background: "#4d1601",
              color: "white",
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
  padding: 0 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => (props.lightMode ? "black" : "white")};
`;
