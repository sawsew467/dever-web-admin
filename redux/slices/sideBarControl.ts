"use client";
import { createSlice } from "@reduxjs/toolkit";

type sidebarDropdown = {
  isDropdownNotifications: boolean;
  isDropdownMembers: boolean;
  isDropdownBlogs: boolean;
  isDropdownResumes: boolean;
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
  isViewAllResumes: boolean;
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
    isDropdownResumes: false,
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
    isViewAllResumes: false
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
    toggleDropdownResumes: (state) => {
      state.sidebarDropDown.isDropdownResumes =
        !state.sidebarDropDown.isDropdownResumes;
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
    dropdownResumes: (state, action) => {
      state.sidebarDropDown.isDropdownResumes = action.payload;
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
      state.sidebarNavigation.isViewAllResumes = false;
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
      state.sidebarNavigation.isViewAllResumes = false;

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
      state.sidebarNavigation.isViewAllResumes = false;

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
      state.sidebarNavigation.isViewAllResumes = false;

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
      state.sidebarNavigation.isViewAllResumes = false;
      
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
      state.sidebarNavigation.isViewAllResumes = false;

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
      state.sidebarNavigation.isViewAllResumes = false;

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
      state.sidebarNavigation.isViewAllResumes = false;

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
      state.sidebarNavigation.isViewAllResumes = false;
    },
    openViewAllResumes: (state, action) => {
      state.sidebarNavigation.isViewNotification = false;
      state.sidebarNavigation.isCreateNotification = false;
      state.sidebarNavigation.isMemberList = false;
      state.sidebarNavigation.isMemberProfile = false;
      state.sidebarNavigation.isMemberSetting = false;
      state.sidebarNavigation.isBlogList = false;
      state.sidebarNavigation.isYourBlog = false;
      state.sidebarNavigation.isBlogPending = false;
      state.sidebarNavigation.isCreateBlog = false;
      state.sidebarNavigation.isViewAllResumes = action.payload;
    },
    closeAllRoute: (state) => {
      state.sidebarNavigation.isViewNotification = false;
      state.sidebarNavigation.isCreateNotification = false;
      state.sidebarNavigation.isMemberList = false;
      state.sidebarNavigation.isMemberProfile = false;
      state.sidebarNavigation.isMemberSetting = false;
      state.sidebarNavigation.isBlogList = false;
      state.sidebarNavigation.isYourBlog = false;
      state.sidebarNavigation.isBlogPending = false;
      state.sidebarNavigation.isCreateBlog = false;
      state.sidebarNavigation.isViewAllResumes = false;
      state.sidebarDropDown.isDropdownBlogs = false;
      state.sidebarDropDown.isDropdownMembers = false;
      state.sidebarDropDown.isDropdownNotifications = false;
      state.sidebarDropDown.isDropdownResumes = false;
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
  closeAllRoute,
  dropdownResumes,
  toggleDropdownResumes,
  openViewAllResumes
} = sidebarSlice.actions;
export default sidebarSlice.reducer;
