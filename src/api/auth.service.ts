import { axiosInstance } from "../config/axiosInstanse";
import {
  IDeleteFood,
  IGetFoodId,
  IStructureItem,
  IPostAndPutItemResponse,
  ISignIn,
  ISignUp,
  ISignUpResponse,
  IGetFoods,
  IBasketStructure,
} from "../types/interfaces";

export const signInRequest = (data: ISignIn) => {
  return axiosInstance.post<ISignUpResponse>("auth/login", data);
};
export const signUpRequest = (data: ISignUp) => {
  return axiosInstance.post<ISignUpResponse>("auth/register", data);
};
export const addFoodRequest = (data: IStructureItem) => {
  return axiosInstance.post<IPostAndPutItemResponse>("foods", data);
};
export const getFoodsRequest = () => {
  return axiosInstance.get<IGetFoods>("foods");
};
export const deleteFoodForAdmin = (id: string) => {
  return axiosInstance.delete<IDeleteFood>(`foods/${id}`);
};
export const getFoodWithIdRequest = (id: string) => {
  return axiosInstance.get<IGetFoodId>(`foods/${id}`);
};
export const updateFoodRequest = (data: IStructureItem, id: string) => {
  return axiosInstance.put<IPostAndPutItemResponse>(`foods/${id}`, data);
};
export const addFoodToBasket = (id: string, amount: number) => {
  return axiosInstance.post<IGetFoods>(`/foods/${id}/addToBasket`, { amount });
};
export const getBasketRequest = () => {
  return axiosInstance.get<IBasketStructure>("basket");
};
export const decrementAmountRequest = (id: string, amount: number) => {
  return axiosInstance.put<IBasketStructure>(`/basketItem/${id}/update`, {
    amount: amount - 1,
  });
};
export const incrementAmountRequest = (id: string, amount: number) => {
  return axiosInstance.put<IBasketStructure>(`/basketItem/${id}/update`, {
    amount: amount + 1,
  });
};
export const deleteBasketItemRequest = (id: string) => {
  return axiosInstance.delete<IBasketStructure>(`/basketItem/${id}/delete`);
};
