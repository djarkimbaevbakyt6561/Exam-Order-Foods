import { createSlice } from "@reduxjs/toolkit";
import { IAdminModal } from "../../types/interfaces";
import { addFood } from "./admin.modal.thunk";
const initialState: IAdminModal = {
  open: false,
  title: "",
  description: "",
  price: "",
  isLoading: true,
};
export const adminModalSlice = createSlice({
  name: "adminModal",
  initialState,
  reducers: {
    toggleModalHandler: (state) => {
      state.open = !state.open;
    },
    getTitleValue: (state, action) => {
      state.title = action.payload;
    },
    getDescriptionValue: (state, action) => {
      state.description = action.payload;
    },
    getPriceValue: (state, action) => {
      state.price = action.payload;
    },
    resetHandler: (state) => {
      state.price = "";
      state.title = "";
      state.description = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addFood.pending, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addFood.fulfilled, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addFood.rejected, (state, action) => {
      state.isLoading = true;
    });
  },
});
export const adminModalReducer = adminModalSlice.reducer;
export const adminModalActions = adminModalSlice.actions;
