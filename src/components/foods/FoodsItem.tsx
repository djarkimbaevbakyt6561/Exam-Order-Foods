import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import deleteIcon from "../../assets/icons/delete-icon.png";
import editIcon from "../../assets/icons/edit.png";
import { AppDispatch, RootState } from "../../store";
import { foodsActions } from "../../store/foods/foods.slice";
import { deleteFood, getFoodWithId } from "../../store/foods/foods.thunk";
import { snackBarActions } from "../../store/snack.bar";
export interface FoodsItemStructure {
  title: string;
  description: string;
  price: number;
  key: string;
  id: string;
}
const FoodsItem = ({
  title,
  description,
  price,
  key,
  id,
}: FoodsItemStructure) => {
  const { lightMode } = useSelector((state: RootState) => state.lightMode);
  const dispatch = useDispatch<AppDispatch>();
  async function deleteHandler() {
    try {
      await dispatch(deleteFood(id)).unwrap();
      dispatch(snackBarActions.successHandler("Successfully deleted"));
    } catch (error) {
      dispatch(snackBarActions.errorHandler(error));
    }
  }
  async function openModal() {
    try {
      dispatch(foodsActions.toggleModalHandler());
      await dispatch(getFoodWithId(id)).unwrap();
      dispatch(snackBarActions.successHandler("Successfully get food"));
    } catch (error) {
      dispatch(snackBarActions.errorHandler(error));
    }
  }
  return (
    <ListItem lightMode={lightMode} key={key}>
      <Container lightMode={lightMode}>
        <p>
          Title: <span>{title}</span>
        </p>
        <p>
          Description: <span>{description}</span>
        </p>
        <p>
          Price: <span>${price}</span>
        </p>
      </Container>
      <ImageContainer>
        <img src={deleteIcon} alt={deleteIcon} onClick={deleteHandler} />
        <img src={editIcon} alt={editIcon} onClick={openModal} />
      </ImageContainer>
    </ListItem>
  );
};
export default FoodsItem;
const ListItem = styled.li<{ lightMode: boolean }>`
  list-style: none;
  width: 100%;
  margin-top: 20px;
  color: ${(props) => (props.lightMode ? "white" : "black")};
  font-size: 20px;
  border-radius: 10px;
  background: ${(props) =>
    props.lightMode ? "rgb(138, 43, 6)" : "rgb(117, 212, 249)"};
  display: flex;
  justify-content: space-between;
`;
const Container = styled.div<{ lightMode: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  margin-top: 10px;
  margin-left: 20px;
  width: 50%;
  p {
    margin: 0;
    margin-bottom: 10px;
    span {
      color: ${(props) =>
        props.lightMode ? "antiquewhite" : "rgb(5, 20, 40)."};

      font-weight: 600;
    }
  }
`;
const ImageContainer = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  margin-right: 20px;
  justify-content: space-around;
  img {
    width: 40px;
    cursor: pointer;
  }
`;
