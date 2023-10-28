"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Button from "@/components/Button";

import avatar from "@image/page/member/list/Fu-dever.png";
import briefcaseIcon from "@icon/page/member/profile/briefcase.svg";
import calendarIcon from "@icon/page/member/profile/calendar-month.svg";

import facebookIcon from "@icon/page/member/profile/facebook.svg";
import githubIcon from "@icon/page/member/profile/github.svg";
import youtubeIcon from "@icon/page/member/profile/youtube.svg";
import instagramIcon from "@icon/page/member/profile/instagram.svg";
import discordIcon from "@icon/page/member/profile/discord.svg";
import twitterIcon from "@icon/page/member/profile/twitter.svg";
import tiktokIcon from "@icon/page/member/profile/tiktok.svg";
import linkedinIcon from "@icon/page/member/profile/linkedin.svg";
import ubuntuIcon from "@icon/page/member/profile/unbuntu.svg";

import ProjectCard from "@/components/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getMemberInfo } from "@/apis/profile";
import axios from "axios";
import { getCookie } from "cookies-next";
import { LinearProgress } from "@mui/material";
import { formatDateToMMDDYYYY } from "@/ultils/dateFormat";
import { userInfo } from "@/ultils/types";
import {
  dropdownMembers,
  openMemberProfile,
} from "@/redux/slices/sideBarControl";

type TSocialData = {
  id: string;
  name: string;
  url: string;
};

function Profile() {
  const isOpenSlidebar = useSelector(
    (state: RootState) => state.app.isOpenSlidebar
  );
  const isMouseVisit = useSelector(
    (state: RootState) => state.app.isMouseVisit
  );
  const [isFetchData, setIsFetchData] = useState<boolean>(true);

  const renderHtmlString = (htmlString: string) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
  };
  const [userData, setUserData] = useState<userInfo>();

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
    dispatch(openMemberProfile(true));
  }, [dispatch]);

  const returnSocialIcon = (item: TSocialData): StaticImageData => {
    switch (item.name.toLowerCase()) {
      case "facebook":
        return facebookIcon;
      case "github":
        return githubIcon;
      case "youtube":
        return youtubeIcon;
      case "instagram":
        return instagramIcon;
      case "discord":
        return discordIcon;
      case "linkedin":
        return linkedinIcon;
      case "tiktok":
        return tiktokIcon;
      case "twitter":
        return twitterIcon;
      default:
        return ubuntuIcon;
    }
  };

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
      <div className=" py-[20px] px-[16px] flex gap-[20px] flex-col select-none">
        <div>
          <h2 className="text-[24px] font-[700]">
            <span className="text-blue-500">Your</span> Profile
          </h2>
        </div>
        {isFetchData ? (
          <LinearProgress />
        ) : (
          <div className="flex w-[100%] flex-col gap-[16px] lg:flex-row">
            <div className="w-full lg:w-[32%] flex flex-col gap-[16px]">
              <div className="w-[100%] shadow-primary rounded-[16px] p-[32px] flex flex-col gap-[16px]">
                <div className="flex flex-col gap-[8px]">
                  <div className="w-[180px] h-[180px] object-cover overflow-hidden rounded-[16px]">
                    <Image
                      src={
                        userData?.avatarUrl === ""
                          ? avatar
                          : userData?.avatarUrl!
                      }
                      alt="avatar"
                      width={1200}
                      height={800}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h1 className="text-[24px] font-[700]">
                    {(userData?.firstName?.trim() ||
                      userData?.lastName.trim()) === ""
                      ? "Unnamed"
                      : userData?.lastName?.concat(" ", userData?.firstName)}
                  </h1>
                </div>
                <div className="flex flex-col gap-[8px] ">
                  <div className="flex flex-row gap-[12px]">
                    <Image src={briefcaseIcon} alt="briefcaseIcon" />
                    <span className="font-[400] text-[16px]">
                      {userData?.career == ""
                        ? <p className="italic">Not set yet</p>
                        : userData?.career}
                    </span>
                  </div>
                  <div className="flex flex-row gap-[12px]">
                    <Image src={calendarIcon} alt="calendarIcon" />
                    <span className="font-[400] text-[16px]">
                      {userData?.birthDay == "0001-01-01T00:00:00"
                        ? <p className="italic">Not set yet</p>
                        : formatDateToMMDDYYYY(userData?.birthDay!)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <span className="font-[400] text-[16px]">
                      Email address:
                    </span>
                  </div>
                  <div className="flex flex-row">
                    <span className="font-[700] text-[16px]">
                      {userData?.email == "" ? <p className="italic">Not set yet</p> : userData?.email}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <span className="font-[400] text-[16px]">
                      Home address:
                    </span>
                  </div>
                  <div className="flex flex-row">
                    <span className="font-[700] text-[16px]">
                      {userData?.homeAddress == ""
                        ? <p className="italic">Not set yet</p>
                        : userData?.homeAddress}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <span className="font-[400] text-[16px]">
                      Phone number:
                    </span>
                  </div>
                  <div className="flex flex-row">
                    <span className="font-[700] text-[16px]">
                      {userData?.phoneNumber == ""
                        ? <p className="italic">Not set yet</p>
                        : userData?.phoneNumber}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <span className="font-[700] text-[20px]">
                      Social media:
                    </span>
                  </div>
                  <div className="flex flex-row gap-[8px]">
                    {userData?.userPlatforms?.length == 0 ? 
                     (<p className="font-bold italic">Not set yet</p>) :  userData?.userPlatforms.map(
                      (item: TSocialData, index: number) => {
                        return (
                          <a href={item.url} key={index}>
                            <Image
                              src={returnSocialIcon(item)}
                              alt={item.name}
                              width={24}
                              height={24}
                              className="hover:bg-slate-200 rounded-md transition"
                            ></Image>
                          </a>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>

              <div className="w-[100%] shadow-primary rounded-[16px] p-[32px] flex flex-col gap-[20px]">
                <div>
                  <h3 className="font-[700] text-[24px]">Skills</h3>
                </div>
                <div className="flex flex-wrap gap-[8px]">
                  {userData!.userSkills.length > 0 ? (
                    userData?.userSkills.map((item, index) => (
                      <p
                        key={index}
                        className="py-[2px] px-[12px] bg-green-100 text-green-800 rounded-[8px] text-[14px] font-[600]"
                      >
                        {item}
                      </p>
                    ))
                  ) : (
                    <p className="italic">
                      Haven&apos;t updated any skills yet!
                    </p>
                  )}
                </div>
              </div>
              <div className="w-[100%] shadow-primary rounded-[16px] p-[32px] flex flex-col gap-[20px]">
                <div>
                  <h3 className="font-[700] text-[24px]">Hobbies</h3>
                </div>
                <div className="flex flex-wrap gap-[8px]">
                  {userData!.userHobbies.length > 0 ? (
                    userData?.userHobbies.map((item, index) => (
                      <p
                        key={index}
                        className="py-[2px] px-[12px] bg-purple-100 text-purple-800 rounded-[8px] text-[14px] font-[600]"
                      >
                        {item}
                      </p>
                    ))
                  ) : (
                    <p className="italic">
                      Haven&apos;t updated any hobbies yet!
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[67%] flex flex-col gap-[16px]">
              <div className="w-[100%] shadow-primary rounded-[16px] p-[32px] flex flex-col gap-[20px]">
                <div>
                  <h3 className="font-[700] text-[24px]">
                    General information
                  </h3>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <h4 className="font-[600] text-[20px]">About me</h4>
                  <div className="font-[400] text-[16px]" id="aboutMember">
                    {renderHtmlString(userData?.aboutMe!)}
                  </div>
                </div>
                <div className="flex flex-row gap-[80px]">
                  <div className="flex flex-col gap-[20px]">
                    <div className="flex flex-col">
                      <div className="flex flex-row">
                        <span className="font-[400] text-[16px]">
                          Join date:
                        </span>
                      </div>
                      <div className="flex flex-row">
                        <span className="font-[700] text-[16px]">
                          {formatDateToMMDDYYYY(userData?.joinDate!)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-row">
                        <span className="font-[400] text-[16px]">Position</span>
                      </div>
                      <div className="flex flex-row">
                        <span className="font-[700] text-[16px]">
                          {userData?.positionName == ""
                            ? <p className="italic">Not set yet</p>
                            : userData?.positionName}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-row">
                        <span className="font-[400] text-[16px]">
                          Department:
                        </span>
                      </div>
                      <div className="flex flex-row">
                        <span className="font-[700] text-[16px]">
                          {userData?.departmentName == ""
                            ? <p className="italic">Not set yet</p>
                            : userData?.departmentName}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[20px]">
                    <div className="flex flex-col">
                      <div className="flex flex-row">
                        <span className="font-[400] text-[16px]">
                          Education:
                        </span>
                      </div>
                      <div className="flex flex-row">
                        <span className="font-[700] text-[16px]">
                          {userData?.educationPlaceNames == ""
                            ? <p className="italic">Not set yet</p>
                            : userData?.educationPlaceNames}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-row">
                        <span className="font-[400] text-[16px]">Major</span>
                      </div>
                      <div className="flex flex-row">
                        <span className="font-[700] text-[16px]">
                          {userData?.majorName == ""
                            ? <p className="italic">Not set yet</p>
                            : userData?.majorName}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-row">
                        <span className="font-[400] text-[16px]">
                          Work history:
                        </span>
                      </div>
                      <div className="flex flex-row">
                        <span className="font-[700] text-[16px]">
                          {userData?.workplaces == ""
                            ? <p className="italic">Not set yet</p>
                            : userData?.workplaces}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[100%] shadow-primary rounded-[16px] p-[32px] flex flex-col gap-[20px]">
                <div>
                  <h3 className="font-[700] text-[24px] ">My projects</h3>
                </div>
                <div className=" flex flex-col gap-[20px]">
                  <p className="italic">Haven&apos;t no implement yet!</p>
                  {/* {userData?.project.map((item, index) => {
                return (
                  <ProjectCard
                    key={index}
                    img={item.img}
                    title={item.title}
                    desc={item.desc}
                    link={item.link}
                    canEdit={false}
                    method={() => {}}
                    isEdit={false}
                  />
                );
              })} */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
