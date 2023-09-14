"use client";
import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";

type User = {
  email: string;
  sub: string;
  UserRole: string;
  remember: boolean;
};
type AppState = {
  currentUser: User;
};

const initialState: AppState = {
  currentUser: {
    email: "",
    sub: "",
    UserRole: "",
    remember: false,
  },
};

export const counterSlice = createSlice({
  name: "userInfor",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload.user;
      setCookie("accessToken", action.payload.token.accessToken, {
        maxAge: 3600,
      });
      if (!action.payload.user.remember) {
        setCookie("refreshToken", action.payload.token.refreshToken, {
          maxAge: 7200,
        });
      } else {
        setCookie("refreshToken", action.payload.token.refreshToken, {
          maxAge: 302400,
        });
      }
    },
    logout: (state) => {
      state.currentUser = initialState.currentUser;
      setCookie("accessToken", "", { maxAge: 0 });
      setCookie("refreshToken", "", { maxAge: 0 });
    },
  },
});

// Action creators được tạo ra cho mỗi hàm reducer
export const { login, logout } = counterSlice.actions;

export default counterSlice.reducer;
