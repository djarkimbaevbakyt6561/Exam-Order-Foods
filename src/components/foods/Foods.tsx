import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppDispatch, RootState } from "../../store";
import { getFoodsForAdmins } from "../../store/foods/foods.thunk";
import { snackBarActions } from "../../store/snack.bar";
import { IFoodStructure } from "../../types/interfaces";
import { Loading } from "../UI/loading/Loading";
import FoodsItem from "./FoodsItem";

const Foods = () => {
  const foods = useSelector((state: RootState) => state.foods);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getFoodsForAdmins())
      .unwrap()
      .then(() => {
        dispatch(snackBarActions.successHandler("Successfully received foods"));
      })
      .catch((error) => {
        dispatch(snackBarActions.errorHandler(error));
      });
  }, []);

  return (
    <Container>
      {foods.isLoading ? null : <Loading />}

      {foods.foods.map((el: IFoodStructure) => {
        return (
          <FoodsItem
            title={el.title}
            description={el.description}
            key={el._id}
            id={el._id}
            price={el.price}
          />
        );
      })}
    </Container>
  );
};
export default Foods;
const Container = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 94%;
  padding: 0;
  margin: 0;
  margin-bottom: 20px;
`;
