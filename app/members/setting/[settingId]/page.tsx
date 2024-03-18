"use client";
import { getMemberInfo } from "@/apis/profile";
import Button from "@/components/Button";
import AboutUser from "@/components/SettingElement/AboutUser";
import AvatarChanging from "@/components/SettingElement/AvatarChanging";
import ContactInfomation from "@/components/SettingElement/ContactInfomation";
import GeneralInformation from "@/components/SettingElement/GeneralInformation";
import Hobbies from "@/components/SettingElement/Hobbies";
import Projects from "@/components/SettingElement/Projects";
import Skills from "@/components/SettingElement/Skills";
import SocialAccount from "@/components/SettingElement/SocialAccount";
import UnlinkButton from "@/components/UnlinkButton";
import {
  dropdownMembers,
  openMemberSetting,
} from "@/redux/slices/sideBarControl";
import { RootState } from "@/redux/store";
import { userInfo } from "@/ultils/types";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type pageProps = {
  params: { settingId: string };
};
type TSocialData = {
  id: string;
  name: string;
  url: string;
};

type TAppUserProject = {
  createdAt: string;
  demoUrl: string;
  description: string;
  projectId: string;
  projectUrl: string;
  thumbnailUrl: string;
  title: string;
  updatedAt: string;
};

function SettingUser({ params }: pageProps) {
  const route = useRouter();
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

        if (params) {
          const response = await getMemberInfo(params.settingId, access_token);
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
    // handleGetAllSocialAccounts();
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
        {!isFetchData && (
          <div className="flex flex-row justify-between">
            <h3 className="font-[700] text-[24px] select-none dark:text-white ">
              <span className="text-blue-500">
                {userData?.firstName.length == 0 ||
                userData?.lastName.length == 0
                  ? userData.email
                  : userData?.lastName.concat(" ", userData.firstName)}
                &apos;s
              </span>{" "}
              profile setting
            </h3>
            <UnlinkButton
              method={() => {
                route.back();
              }}
              icon="arrowLeft"
              backgroundColor="bg-blue-700"
              iconPosition="left"
              textContent="Back"
              tailwind="text-white dark:shadow-darkPrimaryBlue"
            ></UnlinkButton>
          </div>
        )}
        {isFetchData ? (
          <LinearProgress />
        ) : (
          <div className="flex flex-col lg:flex-row gap-[16px]">
            <div className="flex flex-col gap-[16px] w-full lg:w-[40%] h-fit select-none">
              <AvatarChanging
                avatarUrl={userData?.avatarUrl!}
                fullName={userData?.lastName.concat(" ", userData?.firstName!)}
                career={userData?.career!}
                refreshApi={handleGetUserProfile}
                userId={userData?.id!}
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
            </div>
            <div className="flex flex-col gap-[16px] w-full lg:w-[60%] h-fit">
              <AboutUser about={userData?.aboutMe!} userId={userData?.id!} />
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

export default SettingUser;
