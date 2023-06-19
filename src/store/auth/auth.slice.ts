import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signInRequest } from "../../api/auth.service";
import { IAuthState } from "../../types/interfaces";
import { ROLES } from "../../utils/constants";
import { signIn, signUp } from "./auth.thunk";

const getInitialState = () => {
  const json = localStorage.getItem("AuthLogin");
  if (json) {
    const userData = JSON.parse(json) as Omit<IAuthState, "isAuthorization">;
    if (userData.user.role === ROLES.GUEST) {
      return {
        isAuthorization: false,
        isLoading: true,
        token: "",
        user: {
          name: "",
          email: "",
          role: ROLES.GUEST,
        },
      };
    }
    return {
      isAuthorization: true,
      isLoading: true,
      token: userData.token,
      user: {
        name: userData.user.name,
        email: userData.user.email,
        role: userData.user.role,
      },
    };
  }
  return {
    isAuthorization: false,
    isLoading: true,
    token: "",
    user: {
      name: "",
      email: "",
      role: ROLES.GUEST,
    },
  };
};

const initialState: IAuthState = getInitialState();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOutHandler: (state) => {
      state.isAuthorization = false;
      state.user.role = ROLES.GUEST;
    },
  },
  extraReducers(builder) {
    builder.addCase(signIn.pending, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isAuthorization = true;
      state.isLoading = true;
      state.token = action.payload.token;
      state.user = {
        name: action.payload.user.name,
        email: action.payload.user.email,
        role: action.payload.user.role,
      };
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.pending, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signUp.fulfilled, (state, action: any) => {
      state.token = action.payload.token;
      state.isLoading = true;
      state.user = {
        name: action.payload.user.name,
        email: action.payload.user.email,
        role: action.payload.user.role,
      };
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const authActions = authSlice.actions;
