import { createSlice } from "@reduxjs/toolkit";
import { ISnackbarState } from "../types/interfaces";
const initialState: ISnackbarState = {
  open: false,
  severity: "error",
  message: "",
};

export const snackBarSlice = createSlice({
  name: "snackBar",
  initialState,
  reducers: {
    successHandler: (state, action) => {
      state.open = true;
      state.message = action.payload;
      state.severity = "success";
    },
    errorHandler: (state, action) => {
      state.open = true;
      state.message = action.payload;
      state.severity = "error";
    },
    closeHandler: (state) => {
      state.open = false;
    },
  },
});

export const snackBarActions = snackBarSlice.actions;
