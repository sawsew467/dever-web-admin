"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";

import avatar from "@image/page/member/list/Fu-dever.png";
import briefcaseIcon from "@icon/page/member/profile/briefcase.svg";
import calendarIcon from "@icon/page/member/profile/calendar-month.svg";
import facebookIcon from "@icon/page/member/profile/facebook.svg";
import githubIcon from "@icon/page/member/profile/github.svg";
import youtubeIcon from "@icon/page/member/profile/youtube.svg";
import ProjectCard from "@/components/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getCookie } from "cookies-next";
import { getMemberInfo } from "@/apis/profile";
import axios from "axios";
import { LinearProgress } from "@mui/material";
import { formatDateToMMDDYYYY } from "@/ultils/dateFormat";
import { userInfo } from "@/ultils/types";
import { dropdownMembers, openMemberProfile } from "@/redux/slices/sideBarControl";

type pageProps = {
  params: { profileID: string };
};

type objectItemOne = {
  value: string;
};


function Profile({ params }: pageProps) {
  const isOpenSlidebar = useSelector(
    (state: RootState) => state.app.isOpenSlidebar
  );
  const isMouseVisit = useSelector(
    (state: RootState) => state.app.isMouseVisit
  );
  const [isFetchData, setIsFetchData] = useState<boolean>(true);
  const [userData, setUserData] = useState<userInfo>();
  console.log(userData);

  const renderHtmlString = (htmlString: string) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
  };

  const handleGetUserProfile = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        if (params.profileID) {
          const response = await getMemberInfo(params.profileID, access_token);
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dropdownMembers(true));
    dispatch(openMemberProfile(true));
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
      {isFetchData ? (
        <LinearProgress />
      ) : (
        <div className=" py-[20px] px-[16px] flex gap-[20px] flex-col select-none">
          <div>
            <h2 className="text-[24px] font-[700]">
              <span className="text-blue-500">
                {userData?.fullName == "" ? "Unname" : userData?.fullName}
                &apos;s
              </span>{" "}
              Profile
            </h2>
          </div>
          <div className="flex w-[100%] flex-col gap-[16px] lg:flex-row">
            <div className="w-full lg:w-[32%] flex flex-col gap-[16px]">
              <div className="w-[100%] shadow-primary rounded-[16px] p-[32px] flex flex-col gap-[16px]">
                <div className="flex flex-col gap-[8px]">
                  <div className="w-[120px] h-[120px] object-cover overflow-hidden rounded-[16px]">
                    <Image
                      src={
                        userData?.avatarUrl === ""
                          ? avatar
                          : userData?.avatarUrl!
                      }
                      alt="avatar"
                      width={1200}
                      height={800}
                    />
                  </div>
                  <h1 className="text-[24px] font-[700]">
                    {userData?.fullName == "" ? "Unnamed" : userData?.fullName}
                  </h1>
                </div>
                <div className="flex flex-col gap-[8px] ">
                  <div className="flex flex-row gap-[12px]">
                    <Image src={briefcaseIcon} alt="briefcaseIcon" />
                    <span className="font-[400] text-[16px]">
                      {userData?.career == ""
                        ? "Not set yet"
                        : userData?.career}
                    </span>
                  </div>
                  <div className="flex flex-row gap-[12px]">
                    <Image src={calendarIcon} alt="calendarIcon" />
                    <span className="font-[400] text-[16px]">
                      {userData?.birthday == "0001-01-01T00:00:00"
                        ? "Not set yet"
                        : formatDateToMMDDYYYY(userData?.birthday!)}
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
                      {userData?.email == "" ? "Not set yet" : userData?.email}
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
                        ? "Not set yet"
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
                        ? "Not set yet"
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
                  <div className="flex flex-row gap-[16px]">
                    <Image src={facebookIcon} alt="facebookIcon"></Image>
                    <Image src={githubIcon} alt="githubIcon"></Image>
                    <Image src={youtubeIcon} alt="youtubeIcon"></Image>
                  </div>
                </div>
              </div>

              <div className="w-[100%] shadow-primary rounded-[16px] p-[32px] flex flex-col gap-[20px]">
                <div>
                  <h3 className="font-[700] text-[24px]">Skills</h3>
                </div>
                <div className="flex flex-wrap gap-[8px]">
                  {userData?.memberSkills.map((item, index) => (
                    <p
                      key={index}
                      className="py-[2px] px-[12px] bg-green-100 text-green-800 rounded-[8px] text-[14px] font-[600]"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
              <div className="w-[100%] shadow-primary rounded-[16px] p-[32px] flex flex-col gap-[20px]">
                <div>
                  <h3 className="font-[700] text-[24px]">Hobbies</h3>
                </div>
                <div className="flex flex-wrap gap-[8px]">
                  {userData?.memberHobbies.map((item, index) => (
                    <p
                      key={index}
                      className="py-[2px] px-[12px] bg-purple-100 text-purple-800 rounded-[8px] text-[14px] font-[600]"
                    >
                      {item}
                    </p>
                  ))}
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
                            ? "Not set yet"
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
                            ? "Not set yet"
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
                          {userData?.educationPlaceName == ""
                            ? "Not set yet"
                            : userData?.educationPlaceName}
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
                            ? "Not set yet"
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
                        {userData?.workHistory == ""
                            ? "Not set yet"
                            : userData?.workHistory}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[100%] shadow-primary rounded-[16px] p-[32px] flex flex-col gap-[20px]">
                <div>
                  <h3 className="font-[700] text-[24px] ">Projects</h3>
                </div>
                <div className=" flex flex-col gap-[20px]">
                <h3>Haven&apos;t no implement yet!</h3>

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
        </div>
      )}
    </div>
  );
}

export default Profile;
