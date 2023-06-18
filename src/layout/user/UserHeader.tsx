import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import OrderBasket from "../../components/UI/basket/OrderBasket";
import { RootState } from "../../store";
interface UserHeaderProps {
  onToggle: () => void;
}

export const UserHeader = ({ onToggle }: UserHeaderProps) => {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  function navigateToSignIn() {
    navigate("/signin");
  }
  return (
    <Container>
      <h1>ReactMeals</h1>
      <OrderBasket onToggle={onToggle} totalAmount={12}>
        Your Cart
      </OrderBasket>
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
              background: "white",
              color: "black",
              border: "none",
            },
            "&:hover": {
              background: "rgb(138, 43, 6)",
              color: "white",
              border: "none",
            },
          }}
          // onClick={logOutHandler}
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
          onClick={navigateToSignIn}
        >
          Sign In{" "}
        </Button>
      )}
    </Container>
  );
};

const Container = styled.header`
  height: 101px;
  background: #8a2b06;
  padding: 0 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
`;
