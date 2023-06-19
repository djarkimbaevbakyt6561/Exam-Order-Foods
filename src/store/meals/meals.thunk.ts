import { createAsyncThunk } from "@reduxjs/toolkit";
import { addFoodToBasket, getFoodsRequest } from "../../api/auth.service";
import { IFoodToBasket } from "../../types/interfaces";
import { getBasket } from "../basket/basket.thunk";

export const getMeals = createAsyncThunk(
  "meals/getMeals",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await getFoodsRequest();
      console.log(response);
      return response.data.data;
    } catch (error: any) {
      new Error(error);
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const addItem = createAsyncThunk(
  "meals/addItem",
  async ({ id, amount }: IFoodToBasket, { dispatch, rejectWithValue }) => {
    try {
      await addFoodToBasket(id, amount);
      dispatch(getBasket());
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
