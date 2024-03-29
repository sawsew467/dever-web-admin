"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";

type User = {
  id: string;
  name:string;
  email: string;
  avatarUrl: string;
  role: string;
  remember: boolean | null;
};
type AppState = {
  currentUser: User;
};

const initialState: AppState = {
  currentUser: {
    id: "",
    name: "",
    email: "",
    avatarUrl: "",
    role: "",
    remember: null,
  },
};

export const counterSlice = createSlice({
  name: "userInfor",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload.userInfo;
      if (!action.payload.userInfo.remember) {
        setCookie("accessToken", action.payload.token.accessToken);
        setCookie("refreshToken", action.payload.token.refreshToken);
        setCookie("userId", action.payload.userInfo.id);
        setCookie("rememer? ", action.payload.userInfo.remember);
      } else {
        setCookie("accessToken", action.payload.token.accessToken, {
          maxAge: 604800,
        });
        setCookie("refreshToken", action.payload.token.refreshToken, {
          maxAge: 604800,
        });
        setCookie("userId", action.payload.userInfo.id, {
          maxAge: 604800,
        });
        setCookie("rememer? ", action.payload.userInfo.remember, {
          maxAge: 604800,
        });
        setCookie("expiredInTime?", Date.now() + 7 * 24 * 60 * 60 * 1000, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
      }
    },
    logout: (state) => {
      state.currentUser = initialState.currentUser;
      setCookie("accessToken", "", { maxAge: 0 });
      setCookie("refreshToken", "", { maxAge: 0 });
      setCookie("userId", "", { maxAge: 0 });
      setCookie("rememer?", "", { maxAge: 0 });
      setCookie("expiredInTime?", "", {
        expires: new Date(0),
      });
    },
    refreshUserInfoFromStorage: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setUserAvatar: (state, action) => {
      state.currentUser.avatarUrl = action.payload;
    },
    setUserName: (state, action) => {
      state.currentUser.name = action.payload;
    } ,
    setUserEmail: (state, action) => {
      state.currentUser.email = action.payload;
    }
  },
});

export const { login, logout, refreshUserInfoFromStorage, setUserAvatar, setUserName, setUserEmail } = counterSlice.actions;

export default counterSlice.reducer;
