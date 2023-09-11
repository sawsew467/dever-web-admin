import axiosClient from "../../ultils/axiosClient/index";

export const END_POINT = {
  LOGIN: "/Auth/login",
  REGISTER: "/Auth/register",
  ME: "Auth/me",
};

type UserLogin = {
  email: string;
  password: string;
}

type LoginResponse = {
  accessToken: string,
  refreshToken: string,
  responseStatus : boolean,
  authErrors : [],
  returnTime : string
}

export const loginAccount = (payload: UserLogin) => {
  return axiosClient.post<LoginResponse>(END_POINT.LOGIN, {
    email: payload.email,
    password: payload.password,
  });
};
export const registerAccount = (payload: UserLogin) => {
  return axiosClient.post(END_POINT.REGISTER, {
    username: payload.email,
    password: payload.password,
  });
};

