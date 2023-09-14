import axiosClient from "../../ultils/axiosClient/index";
import { ValidationError } from "yup";
import {toast} from "react-toastify"
import axios from "axios";

export const END_POINT = {
  LOGIN: "/Auth/login",
  REGISTER: "/Auth/register",
  ME: "Auth/me",
  TOKEN: "/Auth/refresh-token",
};

type UserLogin = {
  email: string;
  password: string;
  remember : boolean
};
type Token = {
  AccessToken: string;
  RefreshToken: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  responseStatus: boolean;
  authErrors: [];
  returnTime: string;
};

export const loginAccount = (payload: UserLogin) => {
  return axiosClient.post<LoginResponse>(END_POINT.LOGIN, {
    email: payload.email,
    password: payload.password,
    RememberMe : payload.remember
  });
};
export const registerAccount = (payload: UserLogin) => {
  return axiosClient.post(END_POINT.REGISTER, {
    username: payload.email,
    password: payload.password,
  });
};

export const refreshAccessToken = (payload: Token) => {
 try {
  if(!payload.RefreshToken) return Error();
  return axiosClient.post(END_POINT.TOKEN, {
    AccessToken: payload.AccessToken,
    RefreshToken: payload.RefreshToken,
  });
 }
  catch (error: unknown) {
    if (error instanceof ValidationError) {
      if (error?.name === "ValidationError") {
        toast.error(error.errors[0]);
      }
      return Error();
    }
    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === 401 ||
        error.response?.status === 404 ||
        error.response?.status === 400
      ) {
        toast.error("Please re-login");
      }
      return Error();
    }
}
};
