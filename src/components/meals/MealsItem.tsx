import { PayloadAction } from "@reduxjs/toolkit";
import React, { useCallback, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppDispatch, RootState } from "../../store";
import { addItem } from "../../store/meals/meals.thunk";
import { snackBarActions } from "../../store/snack.bar";
import { IFoodStructure } from "../../types/interfaces";
import { Button } from "../UI/button/Button";

interface ItemType {
  title: string;
  description: string;
  price: number;
  key: string;
  id: string;
}
interface IInputState {
  inputState: string;
}

export const MealsItem = ({ title, price, key, id, description }: ItemType) => {
  const { lightMode } = useSelector((state: RootState) => state.lightMode);
  const [input, setInput] = useState<string>("1");
  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const dispatch = useDispatch<AppDispatch>();

  async function addItemHandler(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      await dispatch(addItem({ id: id, amount: +input })).unwrap();
      dispatch(snackBarActions.successHandler("Successfully added"));
    } catch (error) {
      dispatch(snackBarActions.errorHandler(error));
    }
  }
  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Price lightMode={lightMode}>${price}</Price>
      </TitleContainer>
      <Form onSubmit={addItemHandler}>
        <InputContainer>
          <label htmlFor="amount">Amount</label>
          <input
            onChange={getInputValue}
            name="amount"
            type="number"
            value={input}
          />
        </InputContainer>
        <Button type="submit" firstButton={true}>
          Add
        </Button>
      </Form>
    </Container>
  );
};
const Container = styled.li`
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin-top: 24px;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Title = styled.h3`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  line-height: 27px;
  margin: 0;
  color: #222222;
  margin-bottom: 4px;
`;
const Description = styled.p`
  font-family: "Poppins";
  font-style: italic;
  font-weight: 400;
  line-height: 24px;
  color: #222222;
  margin: 0;
  margin-bottom: 4px;
`;
const Price = styled.p<{ lightMode: boolean }>`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  color: ${(props) => (props.lightMode ? " #ad5502" : "#52aafd")};
  margin: 0;
  margin-bottom: 20px;
`;
const InputContainer = styled.div`
  display: flex;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  label {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: #222222;
    margin-right: 20px;
  }
  input {
    width: 44px;
    height: 29px;
    border: 1px solid #d6d6d6;
    border-radius: 6px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #222222;
    padding: 0;
    padding-left: 12px;
    margin-bottom: 12px;
  }
`;
