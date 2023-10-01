"use client";
import { createSlice } from "@reduxjs/toolkit";

type sidebarDropdown = {
  isDropdownNotifications: boolean;
  isDropdownMembers: boolean;
  isDropdownBlogs: boolean;
};
type sidebarNavigation = {
  isViewNotification: boolean;
  isCreateNotification: boolean;
  isMemberList: boolean;
  isMemberProfile: boolean;
  isMemberSetting: boolean;
  isBlogList: boolean;
  isYourBlog: boolean;
  isBlogPending: boolean;
  isCreateBlog: boolean;
};
type SidebarState = {
  sidebarDropDown: sidebarDropdown;
  sidebarNavigation: sidebarNavigation;
};
const initialState: SidebarState = {
  sidebarDropDown: {
    isDropdownNotifications: false,
    isDropdownMembers: false,
    isDropdownBlogs: false,
  },
  sidebarNavigation: {
    isViewNotification: false,
    isCreateNotification: false,
    isMemberList: false,
    isMemberProfile: false,
    isMemberSetting: false,
    isBlogList: false,
    isYourBlog: false,
    isBlogPending: false,
    isCreateBlog: false,
  },
};

export const sidebarSlice = createSlice({
  name: "sidebarControl",
  initialState,
  reducers: {
    toggleDropdownNotifications: (state) => {
      state.sidebarDropDown.isDropdownNotifications =
        !state.sidebarDropDown.isDropdownNotifications;
    },
    toggleDropdownMembers: (state) => {
      state.sidebarDropDown.isDropdownMembers =
        !state.sidebarDropDown.isDropdownMembers;
    },
    toggleDropdownBlogs: (state) => {
      state.sidebarDropDown.isDropdownBlogs =
        !state.sidebarDropDown.isDropdownBlogs;
    },
    dropdownNotifications: (state, action) => {
        state.sidebarDropDown.isDropdownNotifications = action.payload;
    },
    dropdownMembers: (state, action) => {
        state.sidebarDropDown.isDropdownMembers = action.payload;
    },
    dropdownBlogs: (state, action) => {
        state.sidebarDropDown.isDropdownBlogs = action.payload;
    },
    openViewNotification: (state, action) => {
      state.sidebarNavigation.isViewNotification = action.payload;
      state.sidebarNavigation.isCreateNotification = false;
      state.sidebarNavigation.isMemberList = false;
      state.sidebarNavigation.isMemberProfile = false;
      state.sidebarNavigation.isMemberSetting = false;
      state.sidebarNavigation.isBlogList = false;
      state.sidebarNavigation.isYourBlog = false;
      state.sidebarNavigation.isBlogPending = false;
      state.sidebarNavigation.isCreateBlog = false;
    },
    openCreateNotification: (state, action) => {
      state.sidebarNavigation.isViewNotification = false;
      state.sidebarNavigation.isCreateNotification = action.payload;
      state.sidebarNavigation.isMemberList = false;
      state.sidebarNavigation.isMemberProfile = false;
      state.sidebarNavigation.isMemberSetting = false;
      state.sidebarNavigation.isBlogList = false;
      state.sidebarNavigation.isYourBlog = false;
      state.sidebarNavigation.isBlogPending = false;
      state.sidebarNavigation.isCreateBlog = false;
    },
    openMemberList: (state, action) => {
      state.sidebarNavigation.isViewNotification = false;
      state.sidebarNavigation.isCreateNotification = false;
      state.sidebarNavigation.isMemberList = action.payload;
      state.sidebarNavigation.isMemberProfile = false;
      state.sidebarNavigation.isMemberSetting = false;
      state.sidebarNavigation.isBlogList = false;
      state.sidebarNavigation.isYourBlog = false;
      state.sidebarNavigation.isBlogPending = false;
      state.sidebarNavigation.isCreateBlog = false;
    },
    openMemberProfile: (state, action) => {
      state.sidebarNavigation.isViewNotification = false;
      state.sidebarNavigation.isCreateNotification = false;
      state.sidebarNavigation.isMemberList = false;
      state.sidebarNavigation.isMemberProfile = action.payload;
      state.sidebarNavigation.isMemberSetting = false;
      state.sidebarNavigation.isBlogList = false;
      state.sidebarNavigation.isYourBlog = false;
      state.sidebarNavigation.isBlogPending = false;
      state.sidebarNavigation.isCreateBlog = false;
    },
    openMemberSetting: (state, action) => {
      state.sidebarNavigation.isViewNotification = false;
      state.sidebarNavigation.isCreateNotification = false;
      state.sidebarNavigation.isMemberList = false;
      state.sidebarNavigation.isMemberProfile = false;
      state.sidebarNavigation.isMemberSetting = action.payload;
      state.sidebarNavigation.isBlogList = false;
      state.sidebarNavigation.isYourBlog = false;
      state.sidebarNavigation.isBlogPending = false;
      state.sidebarNavigation.isCreateBlog = false;
    },
    openBlogList: (state, action) => {
      state.sidebarNavigation.isViewNotification = false;
      state.sidebarNavigation.isCreateNotification = false;
      state.sidebarNavigation.isMemberList = false;
      state.sidebarNavigation.isMemberProfile = false;
      state.sidebarNavigation.isMemberSetting = false;
      state.sidebarNavigation.isBlogList = action.payload;
      state.sidebarNavigation.isYourBlog = false;
      state.sidebarNavigation.isBlogPending = false;
      state.sidebarNavigation.isCreateBlog = false;
    },
    openYourBlog: (state, action) => {
      state.sidebarNavigation.isViewNotification = false;
      state.sidebarNavigation.isCreateNotification = false;
      state.sidebarNavigation.isMemberList = false;
      state.sidebarNavigation.isMemberProfile = false;
      state.sidebarNavigation.isMemberSetting = false;
      state.sidebarNavigation.isBlogList = false;
      state.sidebarNavigation.isYourBlog = action.payload;
      state.sidebarNavigation.isBlogPending = false;
      state.sidebarNavigation.isCreateBlog = false;
    },
    openBlogPending: (state, action) => {
      state.sidebarNavigation.isViewNotification = false;
      state.sidebarNavigation.isCreateNotification = false;
      state.sidebarNavigation.isMemberList = false;
      state.sidebarNavigation.isMemberProfile = false;
      state.sidebarNavigation.isMemberSetting = false;
      state.sidebarNavigation.isBlogList = false;
      state.sidebarNavigation.isYourBlog = false;
      state.sidebarNavigation.isBlogPending = action.payload;
      state.sidebarNavigation.isCreateBlog = false;
    },
    openCreateBlog: (state, action) => {
      state.sidebarNavigation.isViewNotification = false;
      state.sidebarNavigation.isCreateNotification = false;
      state.sidebarNavigation.isMemberList = false;
      state.sidebarNavigation.isMemberProfile = false;
      state.sidebarNavigation.isMemberSetting = false;
      state.sidebarNavigation.isBlogList = false;
      state.sidebarNavigation.isYourBlog = false;
      state.sidebarNavigation.isBlogPending = false;
      state.sidebarNavigation.isCreateBlog = action.payload;
    },
  },
});

export const {
  toggleDropdownNotifications,
  toggleDropdownBlogs,
  toggleDropdownMembers,
  dropdownBlogs,
  dropdownMembers,
  dropdownNotifications,
  openBlogList,
  openBlogPending,
  openCreateBlog,
  openCreateNotification,
  openMemberList,
  openMemberProfile,
  openMemberSetting,
  openViewNotification,
  openYourBlog,
} = sidebarSlice.actions;
export default sidebarSlice.reducer;
