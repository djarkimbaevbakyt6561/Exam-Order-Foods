import { createSlice } from "@reduxjs/toolkit";
import { IBasketItem } from "../../types/interfaces";
import { decrementAmount, getBasket, incrementAmount } from "./basket.thunk";
interface IBasketState {
  items: IBasketItem[];
  totalAmount: number;
  isLoading: boolean;
  open: boolean;
}
const initialState: IBasketState = {
  items: [],
  totalAmount: 0,
  isLoading: false,
  open: false,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    getTotalAmount: (state) => {
      state.totalAmount = state.items.reduce(
        (prev, current) => prev + current.amount,
        0
      );
    },
    toggleModalHandler: (state) => {
      state.open = !state.open;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBasket.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = true;
    });
    builder.addCase(getBasket.pending, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getBasket.rejected, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(incrementAmount.pending, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(incrementAmount.fulfilled, (state, action) => {
      const updatedItemsIncrement = state.items.map((el) => {
        if (el._id === action.payload) {
          return { ...el, amount: el.amount + 1 };
        }
        return el;
      });
      state.items = updatedItemsIncrement;
      state.isLoading = true;
    });
    builder.addCase(incrementAmount.rejected, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(decrementAmount.pending, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(decrementAmount.fulfilled, (state, action) => {
      const updatedItemsDecrement = state.items.map((el) => {
        if (el._id === action.payload) {
          return { ...el, amount: el.amount - 1 };
        }
        return el;
      });
      state.items = updatedItemsDecrement;
      state.isLoading = true;
    });
    builder.addCase(decrementAmount.rejected, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const basketReducer = basketSlice.reducer;
export const basketActions = basketSlice.actions;
