import { ROLES } from "../utils/constants";

export interface ISignUp {
  name: string;
  email: string;
  password: string;
  role: ROLES;
}
export interface ISignIn extends Omit<ISignUp, "name" | "role"> {}
export interface ISignUpResponse {
  data: {
    token: string;
    user: {
      email: string;
      name: string;
      role: string;
    };
  };
}
export interface ISnackbarState {
  open: boolean;
  onClose?: () => void;
  severity: "success" | "info" | "warning" | "error";
  children?: string;
  message?: string;
}
