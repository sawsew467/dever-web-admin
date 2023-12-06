"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import menu from "@icon/components/header/menu.svg";
import logo from "@icon/components/header/Dever_logo.png";
import moon from "@icon/components/header/moon.svg";
import avatar from "@icon/components/header/avatar.svg";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  closeSidebar,
  toggleIsDarkMode,
  toggleIsOpenSlidebar,
} from "@/redux/slices/app";
import { logout, setUserAvatar, setUserName } from "@/redux/slices/userInfor";
import { userInfo } from "@/ultils/types";
import { getCookie } from "cookies-next";
import { getMemberInfo } from "@/apis/profile";
import axios from "axios";
import { Skeleton } from "@mui/material";
import { AiFillSetting } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { BsDatabaseFillGear } from "react-icons/bs";
import { CgDarkMode } from "react-icons/cg";
import { closeAllRoute } from "@/redux/slices/sideBarControl";

function Header(): JSX.Element {
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);

  const isOpenSlidebar = useSelector(
    (state: RootState) => state.app.isOpenSlidebar
  );
  const userRole = useSelector(
    (state: RootState) => state.userInfor.currentUser.role
  );
  const [userData, setUserData] = useState<userInfo>();
  const [isFetchData, setIsFetchData] = useState<boolean>(true);
  const userAvatarUrl = useSelector((state: RootState) => state.userInfor.currentUser.avatarUrl);
  const userName = useSelector((state: RootState) => state.userInfor.currentUser.name);
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo  = useSelector((state: RootState) => state.userInfor.currentUser);

  const handleOpenMenu = () => {
    dispatch(toggleIsOpenSlidebar());
  };

  const handleSetDarkMode = () => {
    dispatch(toggleIsDarkMode());
    document.documentElement.classList.toggle("dark");
  };
  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/sign-in");
  };

  const handleGetUserProfile = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const userId = getCookie("userId");
        if (userId) {
          const response = await getMemberInfo(userId, access_token);
          const data = response.data.body;
          dispatch(setUserAvatar(data.avatarUrl));
          dispatch(setUserName(data.lastName.concat(' ', data.firstName).trim()));
          setUserData(data);
          setIsFetchData(false);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleGetUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [boxVisible, setBoxVisible] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutSideMenu = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setBoxVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutSideMenu);
    return (): void => {
      document.removeEventListener("click", handleClickOutSideMenu);
    };
  });

  return (
    <div className="left-0 right-0 top-0 fixed z-[1] bg-[#ffffff] dark:bg-dark backdrop-blur-sm">
      <div className="h-[72px] flex justify-between items-center px-[32px] border-b-2 dark:border-b-darkSemi">
        <div className="flex items-center">
          <Image
            src={menu}
            alt="Picture of the author"
            className="cursor-pointer w-[50px] h-[50px] p-2 rounded-md hover:bg-gray-100 dark:hover:bg-darkHover transition duration-200"
            onClick={handleOpenMenu}
          />
          <div
            className="flex flex-row items-center gap-[4px]"
            onClick={() => {
              router.push("/");
              dispatch(closeAllRoute());
            }}
          >
            <Image
              src={logo}
              alt="Picture of the author"
              className="ml-[40px] w-[46px] h-[46px]"
              width={2000}
              height={1600}
            />
            <h3 className="font-[900] text-[24px] text-[#0065a9] dark:text-[#0198ff] select-none">
              FU - DEVER
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-[10px] font-bold select-none dark:text-white">
          <div>
            <h3>{userName}</h3>
          </div>
          <div
            className="flex items-center justify-center transition duration-300 cursor-pointer w-[60px] h-[60px] rounded-[50%] hover:bg-slate-100 dark:hover:bg-darkHover object-fill relative"
            onClick={() => setBoxVisible(!boxVisible)}
          >
            {isFetchData ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : (
              <Image
                src={userData?.avatarUrl == "" ? avatar : userAvatarUrl}
                alt="Picture of the author"
                className="object-cover rounded-[50%] w-[48px] h-[48px]"
                width={1200}
                height={1200}
              />
            )}
            {boxVisible && (
              <div
                ref={menuRef}
                className="absolute select-none bg-white dark:bg-dark right-0 w-fit top-[66px] p-[16px] rounded-[10px] shadow-primary flex flex-col gap-[10px] "
              >
                <div
                  className="flex flex-row-reverse w-fit items-center gap-[20px] relative p-[10px] hover:bg-gray-100 hover:rounded-[10px] dark:hover:bg-darkHover"
                  onClick={() => {
                    router.push("/members/profile");
                  }}
                >
                  <div>
                    <h2 className="font-bold">
                      {userName}
                    </h2>
                    <h3 className="font-[400]">{userData?.email}</h3>
                  </div>
                  <div className="w-[48px]">
                    <Image
                      src={
                        userData?.avatarUrl == "" ? avatar : userAvatarUrl
                      }
                      alt="Picture of the author"
                      className="object-cover rounded-[50%] w-[48px] h-[48px]"
                      width={1200}
                      height={1200}
                    />
                  </div>
                </div>
                <div className="w-full h-[1px] px-[10px]">
                  <div className="bg-gray-300 w-full h-[1px]"></div>
                </div>
                <div>
                  {userRole === "admin" ? (
                    <div
                      className="flex flex-row items-center gap-[20px] hover:bg-gray-100 dark:hover:bg-darkHover p-[8px] rounded-[10px]"
                      onClick={() => {
                        router.push("/data-organizer");
                        dispatch(closeSidebar());
                        dispatch(closeAllRoute());
                      }}
                    >
                      <div className="p-[8px] bg-gray-200 dark:bg-darkSemi rounded-[50%]">
                        <BsDatabaseFillGear
                          className={"text-[24px] text-gray-60"}
                        />
                      </div>
                      <h3 className="font-semibold">Data management</h3>
                    </div>
                  ) : null}
                  <div
                    className="flex flex-row items-center gap-[20px] hover:bg-gray-100 dark:hover:bg-darkHover p-[8px] rounded-[10px]"
                    onClick={() => {
                      handleSetDarkMode();
                    }}
                  >
                    <div className="p-[8px] bg-gray-200 dark:bg-darkSemi rounded-[50%]">
                      <CgDarkMode className={"text-[24px] text-gray-60"} />
                    </div>
                    <h3 className="font-semibold">
                      {isDarkMode ? "Light" : "Dark"} mode
                    </h3>
                  </div>
                  <div
                    className="flex flex-row items-center gap-[20px] hover:bg-gray-100 dark:hover:bg-darkHover p-[8px] rounded-[10px]"
                    onClick={() => {
                      router.push("/members/setting");
                    }}
                  >
                    <div className="p-[8px] bg-gray-200 dark:bg-darkSemi rounded-[50%]">
                      <AiFillSetting className={"text-[24px] text-gray-60"} />
                    </div>
                    <h3 className="font-semibold">Setting</h3>
                  </div>
                  <div
                    className="flex flex-row items-center gap-[20px] hover:bg-gray-100 dark:hover:bg-darkHover p-[8px] rounded-[10px]"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    <div className="p-[8px] bg-gray-200 dark:bg-darkSemi rounded-[50%]">
                      <IoLogOut className={"text-[24px] text-gray-60"} />
                    </div>
                    <h3 className="font-semibold">Logout</h3>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <Image
            id="darkmodeToggle"
            src={moon}
            alt="Picture of the author"
            className="cursor-pointer w-[50px] h-[50px] p-2 rounded-md hover:bg-gray-100 transition duration-200"
            onClick={handleSetDarkMode}
            width={1200}
            height={600}
          /> */}
          {/* <div className="border-l-[1px] ml-[20px] border-[#E5E7EB] cursor-pointer select-none ">
            <p
              onClick={handleLogout}
              className=" ml-[16px] mr-[-4px] px-2 py-2 hover:bg-gray-100 transition duration-200 rounded-md font-[700] text-[#1C64F2]"
            >
              Log out
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
function setIsFetchData(arg0: boolean) {
  throw new Error("Function not implemented.");
}
