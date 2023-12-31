import styled from "@emotion/styled";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getMeals } from "../../store/meals/meals.thunk";
import { snackBarActions } from "../../store/snack.bar";
import { IFoodStructure } from "../../types/interfaces";
import { Loading } from "../UI/loading/Loading";
import { MealsItem } from "./MealsItem";

export const Meals = () => {
  const { meals, isLoading } = useSelector((state: RootState) => state.meals);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getMeals())
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
      {isLoading ? null : <Loading />}
      {meals?.map((el: IFoodStructure) => {
        return (
          <MealsItem
            price={el.price}
            title={el.title}
            description={el.description}
            key={el._id}
            id={el._id}
          />
        );
      })}
    </Container>
  );
};

const Container = styled("div")`
  background-color: #fff;
  margin: 180px 20%;
  padding: 16px 40px 16px 40px;
  border-radius: 16px;
  main {
    border-bottom: 1px solid #d6d6d6;
    &:last-child {
      border-bottom: none;
    }
  }
`;
