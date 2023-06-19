import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Button } from "@mui/material";
import { AppDispatch, RootState } from "../../store";
import { authActions } from "../../store/auth/auth.slice";
import { resetUser } from "../../utils/constants";
import Toggle from "../../components/UI/toggle/Toggle";

export const AdminHeader = () => {
  const { lightMode } = useSelector((state: RootState) => state.lightMode);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  function logOutHandler() {
    dispatch(authActions.logOutHandler());
    navigate("/signin");
    localStorage.setItem("AuthLogin", JSON.stringify(resetUser()));
  }
  return (
    <StyledHeder lightMode={lightMode}>
      <HeaderNavigation>
        <h1>Meals</h1>
        <Toggle />
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
      </HeaderNavigation>
    </StyledHeder>
  );
};

const StyledHeder = styled("header")<{ lightMode: boolean }>`
  position: fixed;
  width: 100%;
  height: 101px;
  background: ${(props) => (props.lightMode ? "#75d4f9" : "#8a2b06")};
  padding: 22px 120px;
  color: ${(props) => (props.lightMode ? "black" : "white")};
  top: 0;
  z-index: 998;
`;

const HeaderNavigation = styled("nav")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  font-size: 1.4rem;
`;
