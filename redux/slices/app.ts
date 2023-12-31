import { createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "cookies-next";

const initialState = {
  isOpenSlidebar: false,
  isMouseVisit: false,
  isDarkMode: false,
  isBackdrop: false,
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
      if(!state.isDarkMode) {
        localStorage.setItem('theme', JSON.stringify("light"));
        setCookie('theme', 'light');
      } else {
        localStorage.removeItem('theme');
        setCookie('theme', '', {maxAge:0})
      } 

    },
    setIsDarkMode: (state,action) =>{
      state.isDarkMode = action.payload;
    },
    setIsBackdrop: (state, action) => {
      state.isBackdrop = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { toggleIsOpenSlidebar, changeIsMouseVisit, toggleIsDarkMode, closeSidebar, openSidebar, setIsDarkMode, setIsBackdrop } =
  appSlice.actions;

export default appSlice.reducer;
