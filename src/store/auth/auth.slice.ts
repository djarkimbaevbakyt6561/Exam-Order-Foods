import { createSlice } from "@reduxjs/toolkit";
import { signInRequest } from "../../api/auth.service";
import { ROLES } from "../../utils/constants";
import { signIn } from "./auth.thunk";

interface AuthState {
  isAuthorization: boolean;
  isLoading: boolean;
  token: string;

  user: {
    name: string;
    email: string;
    role: ROLES;
    id?: string;
  };
}
const getInitialState = () => {
  const json = localStorage.getItem("AuthLogin");
  if (json) {
    const userData = JSON.parse(json) as Omit<AuthState, "isAuthorization">;
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

const initialState: AuthState = getInitialState();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const authActions = authSlice.actions;
