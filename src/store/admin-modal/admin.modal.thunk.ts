import { createAsyncThunk } from "@reduxjs/toolkit";
import { addFoodRequest } from "../../api/auth.service";
import { IStructureItem } from "../../types/interfaces";
import { getFoodsForAdmins } from "../foods/foods.thunk";

export const addFood = createAsyncThunk(
  "admin/addItem",
  async (data: IStructureItem, { dispatch, rejectWithValue }) => {
    try {
      await addFoodRequest(data);
      await dispatch(getFoodsForAdmins());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
