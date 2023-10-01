"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import bell from "@icon/components/sidebar/bell.svg";
import chevrondown from "@icon/components/sidebar/chevron-down.svg";
import usersgroup from "@icon/components/sidebar/users-group.svg";
import gridplus from "@icon/components/sidebar/grid-plus.svg";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { changeIsMouseVisit } from "@/redux/slices/app";
import {
  openBlogList,
  openBlogPending,
  openCreateBlog,
  openCreateNotification,
  openMemberList,
  openMemberProfile,
  openMemberSetting,
  openViewNotification,
  openYourBlog,
  toggleDropdownBlogs,
  toggleDropdownMembers,
  toggleDropdownNotifications,
} from "@/redux/slices/sideBarControl";

function Slidebar() {
  const dispatch = useDispatch();
  const isOpenSlidebar = useSelector(
    (state: RootState) => state.app.isOpenSlidebar
  );
  const isMouseVisit = useSelector(
    (state: RootState) => state.app.isMouseVisit
  );
  const isDropdownNotifications = useSelector(
    (state: RootState) =>
      state.sidebarControl.sidebarDropDown.isDropdownNotifications
  );
  const isDropdownMembers = useSelector(
    (state: RootState) => state.sidebarControl.sidebarDropDown.isDropdownMembers
  );
  const isDropdownBlogs = useSelector(
    (state: RootState) => state.sidebarControl.sidebarDropDown.isDropdownBlogs
  );
  const isViewNotification = useSelector(
    (state: RootState) =>
      state.sidebarControl.sidebarNavigation.isViewNotification
  );
  const isCreateNotification = useSelector(
    (state: RootState) =>
      state.sidebarControl.sidebarNavigation.isCreateNotification
  );
  const isMemberList = useSelector(
    (state: RootState) => state.sidebarControl.sidebarNavigation.isMemberList
  );
  const isMemberProfile = useSelector(
    (state: RootState) => state.sidebarControl.sidebarNavigation.isMemberProfile
  );
  const isMemberSetting = useSelector(
    (state: RootState) => state.sidebarControl.sidebarNavigation.isMemberSetting
  );
  const isBlogsList = useSelector(
    (state: RootState) => state.sidebarControl.sidebarNavigation.isBlogList
  );
  const isYourBlog = useSelector(
    (state: RootState) => state.sidebarControl.sidebarNavigation.isYourBlog
  );
  const isBlogPending = useSelector(
    (state: RootState) => state.sidebarControl.sidebarNavigation.isBlogPending
  );
  const isCreateBlog = useSelector(
    (state: RootState) => state.sidebarControl.sidebarNavigation.isCreateBlog
  );
  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-[72px] left-0 z-40  h-screen transition-transform -translate-x-full sm:translate-x-0 border-r-2 select-none "
        aria-label="Sidebar"
      >
        {" "}
        <h1></h1>
        <div
          className="h-full bg-[#ffffff]"
          onMouseEnter={() => dispatch(changeIsMouseVisit(true))}
          onMouseLeave={() => dispatch(changeIsMouseVisit(false))}
        >
          <ul
            className="ml-[12px] mr-[12px] "
            style={{
              // width: isOpenSlidebar ? "40px" : "225px",
              width: isOpenSlidebar
                ? isMouseVisit
                  ? "225px"
                  : "40px"
                : "225px",
              transitionDuration: "0.3s",
            }}
          >
            <li className="pt-[16px]">
              <button
                type="button"
                onClick={() => dispatch(toggleDropdownNotifications())}
                className={`flex px-[8px] py-[6px] w-[100%] text-gray-900 items-center transition justify-between hover:bg-gray-100 rounded-[8px]`}
              >
                <div className="flex items-center">
                  <Image
                    src={bell}
                    alt="Picture of the author"
                    width={100}
                    height={100}
                    className="w-[24px] h-[24px]"
                  />
                  <span
                    className="pl-[12px] text-[16px]"
                    style={{
                      display: isOpenSlidebar
                        ? isMouseVisit
                          ? ""
                          : "none"
                        : "",
                    }}
                  >
                    Notifications
                  </span>
                </div>
                <div className={isDropdownNotifications ? "rotate-180" : ""}>
                  <Image
                    src={chevrondown}
                    alt="Picture of the author"
                    className="r-0"
                    width={20}
                    height={20}
                    style={{
                      display: isOpenSlidebar
                        ? isMouseVisit
                          ? ""
                          : "none"
                        : "",
                    }}
                  />
                </div>
              </button>
              <ul
                id="dropdown-Notifications"
                className={isDropdownNotifications ? "pt-[6px]" : "hidden"}
              >
                <li
                  className={` hover:bg-gray-100 rounded-md ${
                    isViewNotification ? "bg-gray-100" : ""
                  }`}
                  onClick={() => dispatch(openViewNotification(true))}
                >
                  <Link
                    href="/notifications/views/1"
                    className={`py-[6px] flex items-center w-full text-gray-900 transition duration-75 rounded-lg ${
                      isOpenSlidebar ? (isMouseVisit ? "pl-11" : "") : "pl-11"
                    } group `}
                  >
                    <span
                      style={{
                        display: isOpenSlidebar
                          ? isMouseVisit
                            ? ""
                            : "none"
                          : "",
                      }}
                      className="whitespace-nowrap"
                    >
                      View notifications
                    </span>
                    <span
                      className="px-[14px]"
                      style={{
                        display: isOpenSlidebar
                          ? isMouseVisit
                            ? "none"
                            : ""
                          : "none",
                      }}
                    >
                      V
                    </span>
                  </Link>
                </li>
                <li
                  className={`mt-[6px] hover:bg-gray-100 rounded-md ${
                    isCreateNotification ? "bg-gray-100" : ""
                  }`}
                  onClick={() => dispatch(openCreateNotification(true))}
                >
                  <Link
                    href="/notifications/create"
                    className={`py-[6px] flex items-center w-full text-gray-900 transition duration-75 rounded-lg ${
                      isOpenSlidebar ? (isMouseVisit ? "pl-11" : "") : "pl-11"
                    } group`}
                  >
                    <span
                      style={{
                        display: isOpenSlidebar
                          ? isMouseVisit
                            ? ""
                            : "none"
                          : "",
                      }}
                      className="whitespace-nowrap"
                    >
                      Create notifications
                    </span>
                    <span
                      className="px-[14px]"
                      style={{
                        display: isOpenSlidebar
                          ? isMouseVisit
                            ? "none"
                            : ""
                          : "none",
                      }}
                    >
                      C
                    </span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="pt-[16px]">
              <button
                type="button"
                onClick={() => dispatch(toggleDropdownMembers())}
                className={`flex px-[8px] py-[6px] w-[100%] text-gray-900 items-center transition justify-between hover:bg-gray-100 rounded-[8px]`}
              >
                <div className="flex items-center">
                  <Image
                    src={usersgroup}
                    alt="Picture of the author"
                    width={100}
                    height={100}
                    className="w-[24px] h-[24px]"
                  />
                  <span
                    className="pl-[12px] text-[16px] "
                    style={{
                      display: isOpenSlidebar
                        ? isMouseVisit
                          ? ""
                          : "none"
                        : "",
                    }}
                  >
                    Members
                  </span>
                </div>
                <div className={isDropdownMembers ? "rotate-180" : ""}>
                  <Image
                    src={chevrondown}
                    alt="Picture of the author"
                    className="r-0"
                    width={20}
                    height={20}
                    style={{
                      display: isOpenSlidebar
                        ? isMouseVisit
                          ? ""
                          : "none"
                        : "",
                    }}
                  />
                </div>
              </button>
              <ul
                id="dropdown-Notifications"
                className={isDropdownMembers ? "pt-[6px]" : "hidden"}
              >
                <li
                  className={`hover:bg-gray-100 rounded-md ${
                    isMemberList ? "bg-gray-100" : ""
                  }`}
                  onClick={() => dispatch(openMemberList(true))}
                >
                  <Link
                    href="/members/list/1"
                    className={`py-[6px] flex items-center w-full  text-gray-900 transition duration-75 rounded-lg ${
                      isOpenSlidebar ? (isMouseVisit ? "pl-11" : "") : "pl-11"
                    } group `}
                  >
                    <span
                      style={{
                        display: isOpenSlidebar
                          ? isMouseVisit
                            ? ""
                            : "none"
                          : "",
                      }}
                      className="whitespace-nowrap"
                    >
                      Member List
                    </span>
                    <span
                      className="px-[14px]"
                      style={{
                        display: isOpenSlidebar
                          ? isMouseVisit
                            ? "none"
                            : ""
                          : "none",
                      }}
                    >
                      M
                    </span>
                  </Link>
                </li>
                <li
                  className={`mt-[6px] hover:bg-gray-100 rounded-md ${
                    isMemberProfile ? "bg-gray-100" : ""
                  }`}
                  onClick={() => dispatch(openMemberProfile(true))}
                >
                  <Link
                    href="/members/profile/"
                    className={`py-[6px] flex items-center w-full text-gray-900 transition duration-75 rounded-lg ${
                      isOpenSlidebar ? (isMouseVisit ? "pl-11" : "") : "pl-11"
                    } group`}
                  >
                    <span
                      style={{
                        display: isOpenSlidebar
                          ? isMouseVisit
                            ? ""
                            : "none"
                          : "",
                      }}
                      className="whitespace-nowrap"
                    >
                      Profile
                    </span>
                    <span
                      className="px-[14px]"
                      style={{
                        display: isOpenSlidebar
                          ? isMouseVisit
                            ? "none"
                            : ""
                          : "none",
                      }}
                    >
                      P
                    </span>
                  </Link>
                </li>
                <li
                  className={` mt-[6px] hover:bg-gray-100 rounded-md ${
                    isMemberSetting ? "bg-gray-100" : ""
                  }`}
                  onClick={() => dispatch(openMemberSetting(true))}
                >
                  <Link
                    href="/members/setting/"
                    className={`py-[6px] flex items-center w-full text-gray-900 transition duration-75 rounded-lg ${
                      isOpenSlidebar ? (isMouseVisit ? "pl-11" : "") : "pl-11"
                    } group `}
                  >
                    <span
                      style={{
                        display: isOpenSlidebar
                          ? isMouseVisit
                            ? ""
                            : "none"
                          : "",
                      }}
                      className="whitespace-nowrap"
                    >
                      Setting
                    </span>
                    <span
                      className="px-[14px]"
                      style={{
                        display: isOpenSlidebar
                          ? isMouseVisit
                            ? "none"
                            : ""
                          : "none",
                      }}
                    >
                      S
                    </span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="pt-[16px]">
              <button
                type="button"
                onClick={() => dispatch(toggleDropdownBlogs())}
                //  className='flex pt-[16px] px-[8px] w-[255px] text-gray-900 items-center justify-between'
                className={`flex px-[8px] py-[6px] w-[100%] text-gray-900 items-center justify-between hover:bg-gray-100 rounded-[8px] transition`}
              >
                <div className="flex items-center">
                  <Image
                    src={gridplus}
                    alt="Picture of the author"
                    className="w-[24px] h-[24px] "
                    width={100}
                    height={100}
                  />
                  <span
                    className="pl-[12px] text-[16px] "
                    style={{
                      display: isOpenSlidebar
                        ? isMouseVisit
                          ? ""
                          : "none"
                        : "",
                    }}
                  >
                    Blogs
                  </span>
                </div>
                <div className={isDropdownBlogs ? "rotate-180" : ""}>
                  <Image
                    src={chevrondown}
                    alt="Picture of the author"
                    className="r-0"
                    width={20}
                    height={20}
                    style={{
                      display: isOpenSlidebar
                        ? isMouseVisit
                          ? ""
                          : "none"
                        : "",
                    }}
                  />
                </div>
              </button>
              <ul
                id="dropdown-Notifications"
                className={isDropdownBlogs ? "pt-[6px]" : "hidden"}
              >
                <li
                  className={` hover:bg-gray-100 rounded-md ${
                    isBlogsList ? "bg-gray-100" : ""
                  }`}
                  onClick={() => dispatch(openBlogList(true))}
                >
                  <Link
                    href="/blogs/views/1"
                    className={`py-[6px] flex items-center w-full  text-gray-900 transition duration-75 rounded-lg ${
                      isOpenSlidebar ? (isMouseVisit ? "pl-11" : "") : "pl-11"
                    } group `}
                  >
                    <span
                      style={{
                        display: isOpenSlidebar
                          ? isMouseVisit
                            ? ""
                            : "none"
                          : "",
                      }}
                      className="whitespace-nowrap"
                    >
                      Blogs list
                    </span>
                    <span
                      className="px-[14px]"
                      style={{
                        display: isOpenSlidebar
                          ? isMouseVisit
                            ? "none"
                            : ""
                          : "none",
                      }}
                    >
                      B
                    </span>
                  </Link>
                </li>
                <li
                  className={`mt-[6px] hover:bg-gray-100 rounded-md ${
                    isYourBlog ? "bg-gray-100" : ""
                  }`}
                  onClick={() => dispatch(openYourBlog(true))}
                >
                  <Link
                    href="/blogs/your_blogs/1"
                    className={`py-[6px] flex items-center w-full  text-gray-900 transition duration-75 rounded-lg ${
                      isOpenSlidebar ? (isMouseVisit ? "pl-11" : "") : "pl-11"
                    } group `}
                  >
                    <span
                      style={{
                        display: isOpenSlidebar
                          ? isMouseVisit
                            ? ""
                            : "none"
                          : "",
                      }}
                      className="whitespace-nowrap"
                    >
                      Your blogs
                    </span>
                    <span
                      className="px-[14px]"
                      style={{
                        display: isOpenSlidebar
                          ? isMouseVisit
                            ? "none"
                            : ""
                          : "none",
                      }}
                    >
                      Y
                    </span>
                  </Link>
                </li>
                <li
                  className={` mt-[6px] hover:bg-gray-100 rounded-md ${
                    isBlogPending ? "bg-gray-100" : ""
                  }`}
                  onClick={() => dispatch(openBlogPending(true))}
                >
                  <Link
                    href="/blogs/blogs_pending/1"
                    className={`py-[6px] flex items-center w-full text-gray-900 transition duration-75 rounded-lg ${
                      isOpenSlidebar ? (isMouseVisit ? "pl-11" : "") : "pl-11"
                    } group`}
                  >
                    <span
                      style={{
                        display: isOpenSlidebar
                          ? isMouseVisit
                            ? ""
                            : "none"
                          : "",
                      }}
                      className="whitespace-nowrap"
                    >
                      Pending Blog
                    </span>
                    <span
                      className="px-[14px]"
                      style={{
                        display: isOpenSlidebar
                          ? isMouseVisit
                            ? "none"
                            : ""
                          : "none",
                      }}
                    >
                      P
                    </span>
                  </Link>
                </li>
                <li
                  className={` mt-[6px] hover:bg-gray-100 rounded-md ${
                    isCreateBlog ? "bg-gray-100" : ""
                  }`}
                  onClick={() => dispatch(openCreateBlog(true))}
                >
                  <Link
                    href="/blogs/create"
                    className={`py-[6px] flex items-center w-full text-gray-900 transition duration-75 rounded-lg ${
                      isOpenSlidebar ? (isMouseVisit ? "pl-11" : "") : "pl-11"
                    } group`}
                  >
                    <span
                      style={{
                        display: isOpenSlidebar
                          ? isMouseVisit
                            ? ""
                            : "none"
                          : "",
                      }}
                      className="whitespace-nowrap"
                    >
                      Create blog
                    </span>
                    <span
                      className="px-[14px]"
                      style={{
                        display: isOpenSlidebar
                          ? isMouseVisit
                            ? "none"
                            : ""
                          : "none",
                      }}
                    >
                      C
                    </span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
export default Slidebar;
