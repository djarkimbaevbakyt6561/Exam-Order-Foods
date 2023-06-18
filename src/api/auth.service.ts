import { axiosInstance } from "../config/axiosInstanse";
import { ISignIn, ISignUp, ISignUpResponse } from "../types/interfaces";

export const signInRequest = (data: ISignIn) => {
  return axiosInstance.post<ISignUpResponse>("auth/login", data);
};
export const signUpRequest = (data: ISignUp) => {
  return axiosInstance.post<ISignUpResponse>("auth/register", data);
};
