"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Button from "@/components/Button";

import avatar from "@image/page/member/list/Fu-dever.png";
import briefcaseIcon from "@icon/page/member/profile/briefcase.svg";
import calendarIcon from "@icon/page/member/profile/calendar-month.svg";

import ProjectCard from "@/components/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getCookie } from "cookies-next";
import { getMemberInfo } from "@/apis/profile";
import axios from "axios";
import { LinearProgress } from "@mui/material";
import { formatDateToMMDDYYYY } from "@/ultils/dateFormat";
import { userInfo } from "@/ultils/types";
import {
  dropdownMembers,
  openMemberProfile,
} from "@/redux/slices/sideBarControl";

import {
  BsFacebook,
  BsGithub,
  BsYoutube,
  BsLinkedin,
  BsDiscord,
} from "react-icons/bs";
import { FaSquareXTwitter, FaCalendarDays } from "react-icons/fa6";
import { PiTiktokLogoFill, PiBagSimpleFill } from "react-icons/pi";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { GrUbuntu } from "react-icons/gr";

type pageProps = {
  params: { profileID: string };
};

type objectItemOne = {
  value: string;
};
type TSocialData = {
  id: string;
  name: string;
  url: string;
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

  const renderHtmlString = (htmlString: string) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
  };

  const handleGetUserProfile = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        if (params.profileID) {
          const response = await getMemberInfo(params.profileID, access_token);
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

  const returnSocialIcon = (item: TSocialData) => {
    switch (item.name.toLowerCase()) {
      case "facebook":
        return <BsFacebook className="text-[20px]" />;
      case "github":
        return <BsGithub className="text-[20px]" />;
      case "youtube":
        return <BsYoutube className="text-[20px]" />;
      case "instagram":
        return <BiLogoInstagramAlt className="text-[20px]" />;
      case "discord":
        return <BsDiscord className="text-[20px]" />;
      case "linkedin":
        return <BsLinkedin className="text-[18px]" />;
      case "tiktok":
        return <PiTiktokLogoFill className="text-[20px]" />;
      case "twitter":
        return <FaSquareXTwitter className="text-[20px]" />;
      default:
        return <GrUbuntu className="text-[20px]" />;
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
      {isFetchData ? (
        <LinearProgress />
      ) : (
        <div className=" py-[20px] px-[16px] flex gap-[20px] flex-col select-none">
          <div>
            <h2 className="text-[24px] font-[700] dark:text-white">
              <span className="text-blue-500 dark:text-[#0198ff]">
                {(userData?.firstName?.trim() || userData?.lastName.trim()) ===
                ""
                  ? "Unnamed"
                  : userData?.lastName?.concat(" ", userData?.firstName)}
                &apos;s
              </span>{" "}
              Profile
            </h2>
          </div>
          <div className="flex w-[100%] flex-col gap-[16px] lg:flex-row">
            <div className="w-full lg:w-[32%] flex flex-col gap-[16px]">
              <div className="w-[100%] shadow-primary dark:shadow-darkPrimary rounded-[16px] p-[32px] flex flex-col gap-[16px] dark:text-white">
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
                    <PiBagSimpleFill className="text-[23px]" />
                    <span className="font-[400] text-[16px]">
                      {userData?.career == "" ? (
                        <p className="italic">Not set yet</p>
                      ) : (
                        userData?.career
                      )}
                    </span>
                  </div>
                  <div className="flex flex-row gap-[12px]">
                    <FaCalendarDays className="text-[20px]" />
                    <span className="font-[400] text-[16px]">
                      {userData?.birthDay == "0001-01-01T00:00:00" ? (
                        <p className="italic">Not set yet</p>
                      ) : (
                        formatDateToMMDDYYYY(userData?.birthDay!)
                      )}
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
                      {userData?.email == "" ? (
                        <p className="italic">Not set yet</p>
                      ) : (
                        userData?.email
                      )}
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
                      {userData?.homeAddress == "" ? (
                        <p className="italic">Not set yet</p>
                      ) : (
                        userData?.homeAddress
                      )}
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
                      {userData?.phoneNumber == "" ? (
                        <p className="italic">Not set yet</p>
                      ) : (
                        userData?.phoneNumber
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <div className="flex flex-row">
                    <span className="font-[700] text-[20px]">
                      Social media:
                    </span>
                  </div>
                  <div className="flex flex-row gap-[8px]">
                    {userData?.userPlatforms?.length == 0 ? (
                      <p className="font-bold italic">Not set yet</p>
                    ) : (
                      userData?.userPlatforms.map(
                        (item: TSocialData, index: number) => {
                          return (
                            <a href={item.url} key={index}>
                              {returnSocialIcon(item)}
                            </a>
                          );
                        }
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="w-[100%] shadow-primary dark:shadow-darkPrimary dark:text-white rounded-[16px] p-[32px] flex flex-col gap-[20px]">
                <div>
                  <h3 className="font-[700] text-[24px]">Skills</h3>
                </div>
                <div className="flex flex-wrap gap-[8px]">
                  {userData!.userSkills.length > 0 ? (
                    userData?.userSkills.map((item, index) => (
                      <p
                        key={index}
                        className="py-[2px] px-[12px] bg-green-100  dark:bg-green-800 dark:text-green-100 text-green-800 rounded-[8px] text-[14px] font-[600]"
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
              <div className="w-[100%] shadow-primary dark:shadow-darkPrimary dark:text-white rounded-[16px] p-[32px] flex flex-col gap-[20px]">
                <div>
                  <h3 className="font-[700] text-[24px]">Hobbies</h3>
                </div>
                <div className="flex flex-wrap gap-[8px]">
                  {userData!.userHobbies.length > 0 ? (
                    userData?.userHobbies.map((item, index) => (
                      <p
                        key={index}
                        className="py-[2px] px-[12px] bg-purple-100  dark:bg-purple-700 dark:text-purple-100 text-purple-800 rounded-[8px] text-[14px] font-[600]"
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
              <div className="w-[100%] shadow-primary dark:shadow-darkPrimary dark:text-white rounded-[16px] p-[32px] flex flex-col gap-[20px]">
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
                          {userData?.positionName == "" ? (
                            <p className="italic">Not set yet</p>
                          ) : (
                            userData?.positionName
                          )}
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
                          {userData?.departmentName == "" ? (
                            <p className="italic">Not set yet</p>
                          ) : (
                            userData?.departmentName
                          )}
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
                          {userData?.educationPlaceNames == "" ? (
                            <p className="italic">Not set yet</p>
                          ) : (
                            userData?.educationPlaceNames
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-row">
                        <span className="font-[400] text-[16px]">Major</span>
                      </div>
                      <div className="flex flex-row">
                        <span className="font-[700] text-[16px]">
                          {userData?.majorName == "" ? (
                            <p className="italic">Not set yet</p>
                          ) : (
                            userData?.majorName
                          )}
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
                          {userData?.workplaces == "" ? (
                            <p className="italic">Not set yet</p>
                          ) : (
                            userData?.workplaces
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[100%] shadow-primary  dark:shadow-darkPrimary dark:text-white rounded-[16px] p-[32px] flex flex-col gap-[20px]">
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
