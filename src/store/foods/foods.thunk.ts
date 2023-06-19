import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteFoodForAdmin,
  getFoodsRequest,
  getFoodWithIdRequest,
  updateFoodRequest,
} from "../../api/auth.service";
import { IUpdateFood } from "../../types/interfaces";

export const getFoodsForAdmins = createAsyncThunk(
  "foods/getFoods",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await getFoodsRequest();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteFood = createAsyncThunk(
  "foods/deleteFood",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      await deleteFoodForAdmin(id);
      await dispatch(getFoodsForAdmins());
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const getFoodWithId = createAsyncThunk(
  "foods/getFood",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await getFoodWithIdRequest(id);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateFood = createAsyncThunk(
  "food/updateFood",
  async ({ data, id }: IUpdateFood, { dispatch, rejectWithValue }) => {
    try {
      await updateFoodRequest(data, id);
      await dispatch(getFoodsForAdmins());
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
