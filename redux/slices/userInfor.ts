"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
      setCookie("userId", action.payload.user.sub, {
        maxAge:3600,
      })
    },
    logout: (state) => {
      state.currentUser = initialState.currentUser;
      setCookie("accessToken", "", { maxAge: 0 });
      setCookie("refreshToken", "", { maxAge: 0 });
      setCookie("userId", "", {maxAge:0})
    },
    refreshUserInfoFromStorage: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
});

// Action creators được tạo ra cho mỗi hàm reducer
export const { login, logout, refreshUserInfoFromStorage } = counterSlice.actions;

export default counterSlice.reducer;
