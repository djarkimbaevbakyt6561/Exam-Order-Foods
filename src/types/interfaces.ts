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
      role: ROLES;
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

export interface IAdminModal {
  open: boolean;
  title: string;
  description: string;
  price: string;
  isLoading: boolean;
}
export interface IAuthState {
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
export interface IStructureItem {
  title: string;
  description: string;
  price: number;
}
export interface IPostAndPutItemResponse {
  data: {
    title: string;
    description: string;
    price: number;
  };
  message: string;
}
export interface IError {
  error: string;
  message: string;
  statusCode: string;
}
export interface IDeleteFood {
  message: string;
}

export interface IGetFoodId {
  data: {
    title: string;
    description: string;
    price: number;
    _id: string;
  };
}
export interface IUpdateFood {
  data: {
    title: string;
    description: string;
    price: number;
  };
  id: string;
}
export interface IFoodStructure {
  title: string;
  description: string;
  price: number;
  _id: string;
}
export interface IGetFoods {
  data: [];
}
export interface IFoodToBasket {
  id: string;
  amount: number;
}
export interface IBasketStructure {
  data: {
    items: [];
  };
}
export interface IBasketItem {
  amount: number;
  food: null;
  price: number;
  title: string;
  _id: string;
}
