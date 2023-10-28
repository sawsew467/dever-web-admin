import { createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "cookies-next";

const initialState = {
  isOpenSlidebar: false,
  isMouseVisit: false,
  isDarkMode: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleIsOpenSlidebar: (state) => {
      state.isOpenSlidebar = !state.isOpenSlidebar;
    },
    closeSidebar: (state) => {
      state.isOpenSlidebar = true
    },
    openSidebar: (state) => {
      state.isOpenSlidebar = false;
    },
    changeIsMouseVisit: (state, action) => {
      state.isMouseVisit = action.payload;
    },
    toggleIsDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setIsDarkMode: (state,action) =>{
      state.isDarkMode = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { toggleIsOpenSlidebar, changeIsMouseVisit, toggleIsDarkMode, closeSidebar, openSidebar, setIsDarkMode } =
  appSlice.actions;

export default appSlice.reducer;
