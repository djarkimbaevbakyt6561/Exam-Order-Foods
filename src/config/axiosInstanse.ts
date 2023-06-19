import axios from "axios";
import { store } from "../store";
const BASE_ULR =
  "http://ec2-18-197-107-37.eu-central-1.compute.amazonaws.com:5500/api/v1";
export const axiosInstance = axios.create({
  baseURL: BASE_ULR,
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers.set("Authorization", store.getState().auth.token);
    return config;
  },
  function (error) {
    throw error.response.data;
  }
);
axiosInstance.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    if (error.response.status === 401) {
      //   store.dispatch(signOut());
    }
    throw error.response.data;
  }
);
