"use client";
import React, { useState, useRef, useEffect } from "react";
import AvatarChanging from "@component/SettingElement/AvatarChanging";
import AboutUser from "@component/SettingElement/AboutUser";
import ContactInfomation from "@/components/SettingElement/ContactInfomation";
import GeneralInformation from "@/components/SettingElement/GeneralInformation";
import SocialAccount from "@/components/SettingElement/SocialAccount";
import Skills from "@/components/SettingElement/Skills";
import Hobbies from "@/components/SettingElement/Hobbies";
import ChangePassword from "@/components/SettingElement/ChangePassword";
import Projects from "@/components/SettingElement/Projects";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { userInfo } from "@/ultils/types";
import { getCookie } from "cookies-next";
import { getMemberInfo } from "@/apis/profile";
import axios from "axios";
import { LinearProgress } from "@mui/material";
import { getAllAccountsByUserId } from "@/apis/setting";

type TSocialData = {
  id: string;
  memberId: string;
  platform: string;
  platformId: string;
  value: string;
};

function SettingList() {
  const isOpenSlidebar = useSelector(
    (state: RootState) => state.app.isOpenSlidebar
  );
  const isMouseVisit = useSelector(
    (state: RootState) => state.app.isMouseVisit
  );
  const [isFetchData, setIsFetchData] = useState<boolean>(true);
  const [socialMediaState, setSocialMediaState] = useState<TSocialData[]>([]);

  const [userData, setUserData] = useState<userInfo>();
    
  const handleGetUserProfile = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const userId = getCookie("userId");
        if (userId) {
          const response = await getMemberInfo(userId, access_token);
          const data = response.data;
          console.log(data);
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

  const handleGetAllSocialAccounts = async () => {
    try {
      const userId = getCookie("userId");
      const access_token = getCookie("accessToken");
      if (userId && access_token) {
        const response = await getAllAccountsByUserId(access_token, userId);
        const data = response.data;
        setSocialMediaState(data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleGetUserProfile();
    handleGetAllSocialAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`w-[100%] ${
        isOpenSlidebar
          ? isMouseVisit
            ? "sm:w-[calc(100%-250px)]"
            : "sm:w-[calc(100%-65px)]"
          : "sm:w-[calc(100%-250px)]"
      } absolute right-0 top-[72px] bottom-0 h-fit duration-[0.3s]`}
    >
      <div className="py-[20px] px-[16px] flex flex-col gap-[20px]">
        <div className="">
          <h3 className="font-[700] text-[24px] ">
            <span className="text-blue-500">Your</span> profile setting
          </h3>
        </div>
        {isFetchData ? (
          <LinearProgress />
        ) : (
          <div className="flex flex-col lg:flex-row gap-[16px]">
            <div className="flex flex-col gap-[16px] w-full lg:w-[40%] h-fit select-none">
              <AvatarChanging
                avatarUrl={userData?.avatarUrl!}
                fullName={userData?.fullName!}
                career={userData?.career!}
                refreshApi={handleGetUserProfile}
              />
              <ContactInfomation />
              <SocialAccount 
                socialMediaState={socialMediaState}
                refreshApi = {handleGetAllSocialAccounts}
              />
              <Skills />
              <Hobbies />
              <ChangePassword />
            </div>
            <div className="flex flex-col gap-[16px] w-full lg:w-[60%] h-fit">
              <AboutUser 
                about = {userData?.aboutMe!}
              />
              <GeneralInformation
                userData={userData!}
                refreshApi={handleGetUserProfile}
              />
              <Projects />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingList;
