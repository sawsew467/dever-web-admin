"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import bell from "@icon/components/sidebar/bell.svg";
import chevrondown from "@icon/components/sidebar/chevron-down.svg";
import usersgroup from "@icon/components/sidebar/users-group.svg";
import gridplus from "@icon/components/sidebar/grid-plus.svg";
import { useAppContext } from "@/app/context/AppContext";
import Link from "next/link";


function Slidebar() {

  const [isDropdownNotifications, setIsDropdownNotifications] = useState<boolean>(false);
  const [isDropdownMembers, setIsDropdownMembers] = useState<boolean>(false);
  const [isDropdownBlogs, setIsDropdownBlogs] = useState<boolean>(false);
  
  const [isViewNotification, setIsViewNotifiCation] = useState<boolean>(false);
  const [isCreateNotification, setIsCreateNotification] = useState<boolean>(false);
  
  const [isMemberList, setIsMemberList] = useState<boolean>(false);
  const [isProfile, setIsProfile] = useState<boolean>(false);
  const [isSetting, setIsSetting ] = useState<boolean>(false);

  const [isBlogList, setIsBlogList] = useState<boolean>(false);
  const [isYourBlog, setIsYourBlog] = useState<boolean>(false);
  const [isCreateBlog, setIsCreateBlog] = useState<boolean>(false);

  const handleDropdownNotifications = () => {
    setIsDropdownNotifications(!isDropdownNotifications);
  };
  const handleDropdownMembers = () => {
    setIsDropdownMembers(!isDropdownMembers);
  };
  const handleDropdownBlogs = () => {
    setIsDropdownBlogs(!isDropdownBlogs);
  };

  const handleViewNotification = () => {
    setIsViewNotifiCation(true);
    setIsCreateNotification(false);
    setIsMemberList(false);
    setIsProfile(false);
    setIsSetting(false);
    setIsBlogList(false);
    setIsYourBlog(false);
    setIsCreateBlog(false);
    
  }
  const handleCreateNotification = () => {
    setIsViewNotifiCation(false);
    setIsCreateNotification(true);
    setIsMemberList(false);
    setIsProfile(false);
    setIsSetting(false);
    setIsBlogList(false);
    setIsYourBlog(false);
    setIsCreateBlog(false);
  }
  const handleMemberList = () => {
    setIsViewNotifiCation(false)
    setIsCreateNotification(false);
    setIsMemberList(true);
    setIsProfile(false);
    setIsSetting(false);
    setIsBlogList(false);
    setIsYourBlog(false);
    setIsCreateBlog(false);
  }
  const handleProfile = () => {
    setIsViewNotifiCation(false)
    setIsCreateNotification(false);
    setIsMemberList(false);
    setIsProfile(true);
    setIsSetting(false);
    setIsBlogList(false);
    setIsYourBlog(false);
    setIsCreateBlog(false);
  }
  const handleSetting = () => {
    setIsViewNotifiCation(false);
    setIsCreateNotification(false);
    setIsMemberList(false);
    setIsProfile(false);
    setIsSetting(true);
    setIsBlogList(false);
    setIsYourBlog(false);
    setIsCreateBlog(false);
  }
  const handleBlogList = () => {
    setIsViewNotifiCation(false);
    setIsCreateNotification(false);
    setIsMemberList(false);
    setIsProfile(false);
    setIsSetting(false);
    setIsBlogList(true);
    setIsYourBlog(false);
    setIsCreateBlog(false);
  }
  const handleYourBlog = () => {
    setIsViewNotifiCation(false)
    setIsCreateNotification(false);
    setIsMemberList(false);
    setIsProfile(false);
    setIsSetting(false);
    setIsBlogList(false);
    setIsYourBlog(true);
    setIsCreateBlog(false);
  }
  const handleCreateBlog = () => {
    setIsViewNotifiCation(false)
    setIsCreateNotification(false);
    setIsMemberList(false);
    setIsProfile(false);
    setIsSetting(false);
    setIsBlogList(false);
    setIsYourBlog(false);
    setIsCreateBlog(true);
  }

  const {isOpenSlidebar,  isMouseVisit, setIsMouseVisit} = useAppContext();


  return (
    
    <>
      <aside
        id="default-sidebar"
        className="fixed top-[72px] left-0 z-40  h-screen transition-transform -translate-x-full sm:translate-x-0 border-r-2 select-none "
        aria-label="Sidebar"
      > <h1></h1>
        <div className="h-full bg-[#ffffff]"
        onMouseEnter={() => setIsMouseVisit(true)}
        onMouseLeave={() => setIsMouseVisit(false)}
        >
          <ul className="ml-[12px] mr-[12px] "
          style={{
            // width: isOpenSlidebar ? "40px" : "225px",
            width: isOpenSlidebar ? isMouseVisit ? "225px" : "40px" : "225px",
            transitionDuration: "0.3s"
          }}
          >
            <li className="pt-[16px]">
              <button
                type="button"
                onClick={handleDropdownNotifications}
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
                  <span className="pl-[12px] text-[16px]"
                  style={{
                    display: isOpenSlidebar ? isMouseVisit ? "" : "none" : "",
                  }}
                  >Notifications</span>
                </div>
                <div className={isDropdownNotifications ? "rotate-180" : ""}>
                  <Image
                    src={chevrondown}
                    alt="Picture of the author"
                    className="r-0"
                    width={20}
                    height={20}
                    style={{
                      display: isOpenSlidebar ? isMouseVisit ? "" : "none" : ""
                    }}
                  />
                </div>
              </button>
              <ul
                id="dropdown-Notifications"
                className={isDropdownNotifications ? "pt-[6px]" : "hidden"}
              >
                <li  className={`py-[6px] hover:bg-gray-100 rounded-md ${isViewNotification ? "bg-gray-100" : ""}`} onClick={handleViewNotification}>
                  <Link
                    href="/notifications/views/1"
                    className={`flex items-center w-full text-gray-900 transition duration-75 rounded-lg ${isOpenSlidebar ? isMouseVisit ? "pl-11" : "" : "pl-11"} group `}
                  >
                    <span
                      style={{
                        display: isOpenSlidebar ? isMouseVisit ? "" : "none" : "",
                      }}
                      className="whitespace-nowrap"
                    >View notifications</span>
                    <span
                      className="px-[14px]"
                      style={{
                        display: isOpenSlidebar ? isMouseVisit ? "none" : "" : "none"
                      }}
                    >V</span>
                  </Link>
                  
                </li>
                <li className={`py-[6px] mt-[6px] hover:bg-gray-100 rounded-md ${isCreateNotification ? "bg-gray-100" : ""}`} onClick={handleCreateNotification}>
                  <Link
                    href="/notifications/create"
                    className={`flex items-center w-full text-gray-900 transition duration-75 rounded-lg ${isOpenSlidebar ? isMouseVisit ? "pl-11" : "" : "pl-11"} group`}
                  >
                    <span
                      style={{
                        display: isOpenSlidebar ? isMouseVisit ? "" : "none" : "",
                      }}
                      className="whitespace-nowrap"
                    >Create notifications</span>
                    <span
                      className="px-[14px]"
                      style={{
                        display: isOpenSlidebar ? isMouseVisit ? "none" : "" : "none"
                      }}
                    >C</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="pt-[16px]">
              <button
                type="button"
                onClick={handleDropdownMembers}
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
                  <span className="pl-[12px] text-[16px] "
                  style={{
                    display: isOpenSlidebar ? isMouseVisit ? "" : "none" : "",
                  }}
                  >Members</span>
                </div>
                <div className={isDropdownMembers ? "rotate-180" : ""}>
                  <Image
                    src={chevrondown}
                    alt="Picture of the author"
                    className="r-0"
                    width={20}
                    height={20}
                    style={{
                      display: isOpenSlidebar ? isMouseVisit ? "" : "none" : ""
                    }}
                  />
                </div>
              </button>
              <ul
                id="dropdown-Notifications"
                className={isDropdownMembers ? "pt-[6px]" : "hidden"}
              >
                <li className={`py-[6px] hover:bg-gray-100 rounded-md ${isMemberList ? "bg-gray-100" : ""}`} onClick={handleMemberList}>
                  <Link
                    href="/members/list/1"
                    className={`flex items-center w-full  text-gray-900 transition duration-75 rounded-lg ${isOpenSlidebar ? isMouseVisit ? "pl-11" : "" : "pl-11"} group `}
                  >
                     <span
                      style={{
                        display: isOpenSlidebar ? isMouseVisit ? "" : "none" : "",
                      }}
                      className="whitespace-nowrap"
                    >Member List</span>
                    <span
                      className="px-[14px]"
                      style={{
                        display: isOpenSlidebar ? isMouseVisit ? "none" : "" : "none"
                      }}
                    >M</span>
                  </Link>
                </li>
                <li className={`py-[6px] mt-[6px] hover:bg-gray-100 rounded-md ${isProfile ? "bg-gray-100" : ""}`} onClick={handleProfile}>
                  <Link
                    href="/members/profile/"
                    className={`flex items-center w-full text-gray-900 transition duration-75 rounded-lg ${isOpenSlidebar ? isMouseVisit ? "pl-11" : "" : "pl-11"} group`}
                  >
                     <span
                      style={{
                        display: isOpenSlidebar ? isMouseVisit ? "" : "none" : "",
                      }}
                      className="whitespace-nowrap"
                    >Profile</span>
                    <span
                      className="px-[14px]"
                      style={{
                        display: isOpenSlidebar ? isMouseVisit ? "none" : "" : "none"
                      }}
                    >P</span>
                  </Link>
                </li>
                <li className={`py-[6px] mt-[6px] hover:bg-gray-100 rounded-md ${isSetting ? "bg-gray-100" : ""}`} onClick={handleSetting}>
                  <Link
                    href="/members/setting/"
                    className={`flex items-center w-full text-gray-900 transition duration-75 rounded-lg ${isOpenSlidebar ? isMouseVisit ? "pl-11" : "" : "pl-11"} group `}
                  >
                     <span
                      style={{
                        display: isOpenSlidebar ? isMouseVisit ? "" : "none" : "",
                      }}
                      className="whitespace-nowrap"
                    >Setting</span>
                    <span
                      className="px-[14px]"
                      style={{
                        display: isOpenSlidebar ? isMouseVisit ? "none" : "" : "none"
                      }}
                    >S</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="pt-[16px]">
              <button
                type="button"
                onClick={handleDropdownBlogs}
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
                  <span className="pl-[12px] text-[16px] "
                  style={{
                    display: isOpenSlidebar ? isMouseVisit ? "" : "none" : "",
                  }}
                  >Blogs</span>
                </div>
                <div className={isDropdownBlogs ? "rotate-180" : ""}>
                  <Image
                    src={chevrondown}
                    alt="Picture of the author"
                    className="r-0"
                    width={20}
                    height={20}
                    style={{
                      display: isOpenSlidebar ? isMouseVisit ? "" : "none" : ""
                    }}
                  />
                </div>
              </button>
              <ul
                id="dropdown-Notifications"
                className={isDropdownBlogs ? "pt-[6px]" : "hidden"}
              >
                <li className={`py-[6px] hover:bg-gray-100 rounded-md ${isBlogList ? "bg-gray-100" : ""}`} onClick={handleBlogList}> 
                  <Link
                    href="/blogs/list"
                    className={`flex items-center w-full  text-gray-900 transition duration-75 rounded-lg ${isOpenSlidebar ? isMouseVisit ? "pl-11" : "" : "pl-11"} group `}
                  >
                     <span
                      style={{
                        display: isOpenSlidebar ? isMouseVisit ? "" : "none" : "",
                      }}
                      className="whitespace-nowrap"
                    >Blog List</span>
                    <span
                      className="px-[14px]"
                      style={{
                        display: isOpenSlidebar ? isMouseVisit ? "none" : "" : "none"
                      }}
                    >B</span>
                  </Link>
                </li>
                <li className={`py-[6px] mt-[6px] hover:bg-gray-100 rounded-md ${isYourBlog ? "bg-gray-100" : ""}`} onClick={handleYourBlog}>
                  <Link
                    href="/blogs/detail/"
                    className={`flex items-center w-full  text-gray-900 transition duration-75 rounded-lg ${isOpenSlidebar ? isMouseVisit ? "pl-11" : "" : "pl-11"} group `}
                  >
                     <span
                      style={{
                        display: isOpenSlidebar ? isMouseVisit ? "" : "none" : "",
                      }}
                      className="whitespace-nowrap"
                    >Your blog</span>
                    <span
                      className="px-[14px]"
                      style={{
                        display: isOpenSlidebar ? isMouseVisit ? "none" : "" : "none"
                      }}
                    >Y</span>
                  </Link>
                </li>
                <li className={`py-[6px] mt-[6px] hover:bg-gray-100 rounded-md ${isCreateBlog ? "bg-gray-100" : ""}`} onClick={handleCreateBlog}>
                  <Link
                    href="/blogs/create"
                    className={`flex items-center w-full text-gray-900 transition duration-75 rounded-lg ${isOpenSlidebar ? isMouseVisit ? "pl-11" : "" : "pl-11"} group`}
                  >
                     <span
                      style={{
                        display: isOpenSlidebar ? isMouseVisit ? "" : "none" : "",
                      }}
                      className="whitespace-nowrap"
                    >Create blog</span>
                    <span
                      className="px-[14px]"
                      style={{
                        display: isOpenSlidebar ? isMouseVisit ? "none" : "" : "none"
                      }}
                    >C</span>
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
