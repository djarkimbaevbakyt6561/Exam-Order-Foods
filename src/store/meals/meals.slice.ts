import { createSlice } from "@reduxjs/toolkit";
import { addItem, getMeals } from "./meals.thunk";

interface IMealsState {
  meals: [];
  isLoading: boolean;
}

const initialState: IMealsState = {
  meals: [],
  isLoading: false,
};

export const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMeals.fulfilled, (state, action) => {
      state.meals = action.payload;
      state.isLoading = true;
    });
    builder.addCase(getMeals.rejected, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addItem.pending, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addItem.fulfilled, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addItem.rejected, (state, action) => {
      state.isLoading = true;
    });
  },
});
export const mealsReducer = mealsSlice.reducer;
export const mealsActions = mealsSlice.actions;
