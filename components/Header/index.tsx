"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import menu from "@icon/components/header/menu.svg";
import logo from "@icon/components/header/logo.svg";
import moon from "@icon/components/header/moon.svg";
import avatar from "@icon/components/header/avatar.svg";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleIsDarkMode, toggleIsOpenSlidebar } from "@/redux/slices/app";
import { logout } from "@/redux/slices/userInfor";
import { userInfo } from "@/ultils/types";
import { getCookie } from "cookies-next";
import { getMemberInfo } from "@/apis/profile";
import axios from "axios";
import { Skeleton } from "@mui/material";

function Header() {
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);
  const isOpenSlidebar = useSelector(
    (state: RootState) => state.app.isOpenSlidebar
  );
  const [userData, setUserData] = useState<userInfo>();
  const [isFetchData, setIsFetchData] = useState<boolean>(true);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleOpenMenu = () => {
    dispatch(toggleIsOpenSlidebar());
  };

  const handleSetDarkMode = () => {
    dispatch(toggleIsDarkMode());
    const html = document.documentElement;
    html.classList.toggle("dark");
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
          const data = response.data;
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

  return (
    <div className="left-0 right-0 top-0 fixed z-[1] bg-[#ffffff] backdrop-blur-sm">
      <div className="h-[72px] flex justify-between items-center px-[32px] border-b-2">
        <div className="flex items-center">
          <Image
            src={menu}
            alt="Picture of the author"
            className="cursor-pointer w-[50px] h-[50px] p-2 rounded-md hover:bg-gray-100 transition duration-200"
            onClick={handleOpenMenu}
          />
          <div>
            <Link href={"/"}>
              <Image
                src={logo}
                alt="Picture of the author"
                className="ml-[40px]"
              />
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <Image
            id="darkmodeToggle"
            src={moon}
            alt="Picture of the author"
            className="cursor-pointer w-[50px] h-[50px] p-2 rounded-md hover:bg-gray-100 transition duration-200"
            onClick={handleSetDarkMode}
            width={1200}
            height={600}
          />
          <div className="ml-[20px] mr-[-4px] flex items-center justify-center transition duration-300 cursor-pointer w-[60px] h-[60px] rounded-[50%] hover:bg-slate-100 object-fill">
            {
              isFetchData ? <Skeleton variant="circular" width={40} height={40}/> :
              <Image
              src={userData?.avatarUrl == "" ? avatar : userData?.avatarUrl}
              alt="Picture of the author"
              className="object-cover rounded-[50%] w-[48px] h-[48px]"
              width={1200}
              height={1200}
            />
            }
          </div>
          <div className="border-l-[1px] ml-[20px] border-[#E5E7EB] cursor-pointer select-none ">
            <p
              onClick={handleLogout}
              className=" ml-[16px] mr-[-4px] px-2 py-2 hover:bg-gray-100 transition duration-200 rounded-md font-[700] text-[#1C64F2]"
            >
              Log out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
function setIsFetchData(arg0: boolean) {
  throw new Error("Function not implemented.");
}
