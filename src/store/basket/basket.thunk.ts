import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteBasketItemRequest,
  getBasketRequest,
  incrementAmountRequest,
} from "../../api/auth.service";
import { IFoodToBasket } from "../../types/interfaces";

export const getBasket = createAsyncThunk(
  "basket/getBasket",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await getBasketRequest();
      return response.data.data.items;
    } catch (error: any) {
      new Error(error);
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const incrementAmount = createAsyncThunk(
  "basket/incrementAmount",
  async ({ id, amount }: IFoodToBasket, { dispatch, rejectWithValue }) => {
    try {
      await incrementAmountRequest(id, amount);
      return id;
    } catch (error: any) {
      new Error(error);
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const decrementAmount = createAsyncThunk(
  "basket/decrementAmount",
  async ({ id, amount }: IFoodToBasket, { dispatch, rejectWithValue }) => {
    try {
      await incrementAmountRequest(id, amount);

      if (amount <= 1) {
        await deleteBasketItemRequest(id);
        await dispatch(getBasket());
      }
      return id;
    } catch (error: any) {
      new Error(error);
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
