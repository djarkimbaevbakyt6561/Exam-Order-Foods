import React from "react";
import { Button } from "@mui/material";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { adminModalActions } from "../../store/admin-modal/admin.modal.slice";
import Foods from "../foods/Foods";
import { RootState } from "../../store";

export const AdminMeals = () => {
  const { lightMode } = useSelector((state: RootState) => state.lightMode);
  const dispatch = useDispatch();
  function openModal() {
    dispatch(adminModalActions.toggleModalHandler());
  }
  return (
    <Container>
      <Button
        variant="contained"
        sx={{
          borderRadius: "30px",
          width: "160px",
          height: "59px",
          marginTop: "20px",
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
        onClick={openModal}
      >
        Add Item
      </Button>
      <Foods />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  background-color: white;
  width: 40%;
  border-radius: 10px;
  margin-bottom: 20px;
`;
