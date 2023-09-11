import { createSlice } from "@reduxjs/toolkit";

type User = {
  email: string,
  sub: string,
  UserRole : string,
};

type Token = {
    accessToken : string;
    refreshToken : string;
};


type AppState = {
  currentUser: User;
  keyToken : Token
};

const initialState: AppState = {
  currentUser: {
    email: "",
    sub: "",
    UserRole : "",
  },
  keyToken : {
    accessToken:"",
    refreshToken:""
  }
};

export const counterSlice = createSlice({
  name: "userInfor",
  initialState,
  reducers: {
    login: (state, action) => {     
      console.log("hiiiiiiiiii");
      
      state.currentUser = action.payload.user;
      state.keyToken = action.payload.token;
    },
    logout: (state) => {
      state.currentUser = initialState.currentUser;
    },
  },
});

// Action creators được tạo ra cho mỗi hàm reducer
export const { login, logout} = counterSlice.actions;

export default counterSlice.reducer;
