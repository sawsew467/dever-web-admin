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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { TAppUserProject, userInfo } from "@/ultils/types";
import { getCookie } from "cookies-next";
import { getMemberInfo } from "@/apis/profile";
import axios from "axios";
import { LinearProgress } from "@mui/material";

import {
  dropdownMembers,
  openMemberSetting,
} from "@/redux/slices/sideBarControl";

type TSocialData = {
  id: string;
  name: string;
  url: string;
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
  const [userProjects, setUserProjects] = useState<TAppUserProject[]>([]);

  const [userData, setUserData] = useState<userInfo | null>(null);

  const handleGetUserProfile = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const userId = getCookie("userId");
        if (userId) {
          const response = await getMemberInfo(userId, access_token);
          const data = response.data.body;
          setUserData(data);
          setIsFetchData(false);
          setSocialMediaState(data.userPlatforms);
          setUserProjects(data.userProjects);
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dropdownMembers(true));
    dispatch(openMemberSetting(true));
  }, [dispatch]);

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
          <h3 className="font-[700] text-[24px] select-none dark:text-white ">
            <span className="text-blue-500">Your</span> profile setting
          </h3>
        </div>
        {isFetchData ? (
          <LinearProgress />
        ) : (
          <div className="flex flex-col lg:flex-row gap-[16px]">
            <div className="flex flex-col gap-[16px] w-full lg:w-[40%] h-fit select-none">
              <AvatarChanging
                userId={userData?.id!}
                avatarUrl={userData?.avatarUrl!}
                fullName={userData?.lastName.concat(" ", userData?.firstName!)}
                career={userData?.career!}
                refreshApi={handleGetUserProfile}
              />
              <ContactInfomation
                userData={userData!}
                refreshApi={handleGetUserProfile}
                setUserData={setUserData}
              />
              <SocialAccount
                socialMediaState={socialMediaState}
                refreshApi={handleGetUserProfile}
                userId={userData?.id!}
              />
              <Skills
                userSkills={userData?.userSkills!}
                userId={userData?.id!}
              />
              <Hobbies
                userHobbies={userData?.userHobbies!}
                userId={userData?.id!}
              />
              <ChangePassword />
            </div>
            <div className="flex flex-col gap-[16px] w-full lg:w-[60%] h-fit">
              <AboutUser about={userData?.aboutMe!} 
              userId={userData?.id!}/>
              <GeneralInformation
                  userData={userData!}
                  refreshApi={handleGetUserProfile}
                  userId={userData?.id!} 
                  setUserData={setUserData}
                  />
              <Projects
                userId={userData?.id!}
                refreshApi={handleGetUserProfile}
                userProjectList={userProjects}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingList;
