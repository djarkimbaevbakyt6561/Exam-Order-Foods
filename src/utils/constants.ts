import { IAuthState } from "../types/interfaces";

export const STORAGE_KEY = "key";
// export const USER_ROLE = {
//   ADMIN: "ADMIN",
//   USER: "USER",
//   GUEST: "GUEST",
// };

export enum ROLES {
  ADMIN = "ADMIN",
  USER = "USER",
  GUEST = "GUEST",
}
export function resetUser(): IAuthState {
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
