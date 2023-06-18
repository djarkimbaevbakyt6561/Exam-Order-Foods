import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInRequest, signUpRequest } from "../../api/auth.service";
import { ISignIn, ISignUp } from "../../types/interfaces";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (payload: ISignUp, { dispatch, rejectWithValue }) => {
    try {
      const response = await signUpRequest(payload);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload: ISignIn, { dispatch, rejectWithValue }) => {
    try {
      const response = await signInRequest(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
