"use client";
import React, { ReactNode, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/Button";

import avatar from "@image/page/member/profile/Thang.png";
import briefcaseIcon from "@icon/page/member/profile/briefcase.svg";
import calendarIcon from "@icon/page/member/profile/calendar-month.svg";
import facebookIcon from "@icon/page/member/profile/facebook.svg";
import githubIcon from "@icon/page/member/profile/github.svg";
import youtubeIcon from "@icon/page/member/profile/youtube.svg";
import ProjectCard from "@/components/ProjectCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getMemberInfo } from "@/apis/profile";
import axios from "axios";

function Profile() {
  const isOpenSlidebar = useSelector(
    (state: RootState) => state.app.isOpenSlidebar
  );
  const isMouseVisit = useSelector(
    (state: RootState) => state.app.isMouseVisit
  );

  const userData = {
    id: 0,
    firstName: "Tran Van",
    lastName: "Bao Thang",
    about:
      "<p>Dedicated, passionate, and accomplished Full Stack Developer with 9+ years of progressive experience working as an Independent Contractor for Google and developing and growing my educational social network that helps others learn programming, web design, game development, networking.<br/><br/>Aside from my job, I like to create and contribute to open source projects. That helps me to learn a ton of new stuff, grow as a developer and support other open source projects.</p>",
    birthday: "19-02-2002",
    homeAddress: "Trieu Son, Trieu Phong, Quang Tri",
    position: "President",
    role: "Front-End developer",
    major: "Software Engineering",
    education: "FPT University",
    workHistory: "NAPA Global, Google , Facebook",
    deparment: "Board of Directors",
    email: "thangtvbde170145@fpt.edu.vn",
    phone: "0828 828 497",
    joinDate: "12-09-2021",
    socialMedia: [
      {
        platform: "facebook",
        link: "#",
      },
      {
        platform: "github",
        link: "#",
      },
      {
        platform: "youtube",
        link: "#",
      },
    ],
    skills: [
      "#HTML5",
      "#CSS3",
      "#Javascript",
      "#ReactJS",
      "#NextJS",
      "#ExpressJS",
      "#MongoDB",
    ],
    hobbies: [
      "#Soccer",
      "#Coding",
      "#Foods",
      "#Travel",
      "#Books",
      "#Chess",
      "#Game",
    ],
    project: [
      {
        id: 0,
        img: "https://res.cloudinary.com/dy1uuo6ql/image/upload/v1694281714/FU_DEVER_ADMIN/project_image/y81w3mxwnrgmf967l7tw.jpg",
        title: "Noteworthy technology acquisitions 2021",
        desc: "<p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>",
        link: "github.com/sawsew467/dever-web-frontend",
      },
      {
        id: 1,
        img: "https://res.cloudinary.com/dy1uuo6ql/image/upload/v1694281714/FU_DEVER_ADMIN/project_image/y81w3mxwnrgmf967l7tw.jpg",
        title: "Noteworthy technology acquisitions 2021",
        desc: "<p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>",
        link: "github.com/sawsew467/dever-web-frontend",
      },
      {
        id: 2,
        img: "https://res.cloudinary.com/dy1uuo6ql/image/upload/v1694281714/FU_DEVER_ADMIN/project_image/y81w3mxwnrgmf967l7tw.jpg",
        title: "Noteworthy technology acquisitions 2021",
        desc: "<p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>",
        link: "github.com/sawsew467/dever-web-frontend",
      },
    ],
  };

  const renderHtmlString = (htmlString: string) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
  };

  const handleGetUserProfile = async () => {
    try {
      const access_token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNWQ4N2ZiMC1iNjIzLTRmNTEtYTRmNi1mYzljNjZlM2QxNmEiLCJpYXQiOjE2OTUwMTg4NTIsInN1YiI6IjI5NTc3ODRkLTYxNTktNDY3OC1hZWZmLWUyN2Y5ZjY2MDMwZCIsImVtYWlsIjoidnV2bzA3MDQwM0BnbWFpbC5jb20iLCJVc2VyUm9sZSI6ImFkbWluIiwicmVtZW1iZXItbWUiOiJUcnVlIiwibmJmIjoxNjk1MDE4ODUyLCJleHAiOjE2OTUwMjI0NTIsImlzcyI6Imh0dHBzOi8vZnVkZXZlcmFwaS5ic2l0ZS5uZXQvIiwiYXVkIjoiaHR0cDovL2Z1LWRldmVyLmNvbS8ifQ.Kg75_8lBCopL0ZQcWrqVBZTyXWc5xFmIN5p1pnAtSww";
      if (access_token) {
        const response = await getMemberInfo(
          "2957784d-6159-4678-aeff-e27f9f66030d",
          access_token
        );
        const data = response.data;
        console.log(data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleGetUserProfile();
  },[])

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
            <span className="text-blue-500">Your&apos;s</span> Profile
          </h2>
        </div>
        <div className="flex w-[100%] flex-col gap-[16px] lg:flex-row">
          <div className="w-full lg:w-[32%] flex flex-col gap-[16px]">
            <div className="w-[100%] shadow-primary rounded-[16px] p-[32px] flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[8px]">
                <div className="w-[120px] h-[120px] object-cover overflow-hidden rounded-[16px]">
                  <Image src={avatar} alt="avatar" />
                </div>
                <h1 className="text-[24px] font-[700]">Tran Van Bao Thang</h1>
              </div>
              <div className="flex flex-col gap-[8px] ">
                <div className="flex flex-row gap-[12px]">
                  <Image src={briefcaseIcon} alt="briefcaseIcon" />
                  <span className="font-[400] text-[16px]">
                    Front-End Developer
                  </span>
                </div>
                <div className="flex flex-row gap-[12px]">
                  <Image src={calendarIcon} alt="calendarIcon" />
                  <span className="font-[400] text-[16px]">19-02-2002</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <span className="font-[400] text-[16px]">Email address:</span>
                </div>
                <div className="flex flex-row">
                  <span className="font-[700] text-[16px]">
                    {userData.email}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <span className="font-[400] text-[16px]">Home address:</span>
                </div>
                <div className="flex flex-row">
                  <span className="font-[700] text-[16px]">
                    {userData.homeAddress}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <span className="font-[400] text-[16px]">Phone number:</span>
                </div>
                <div className="flex flex-row">
                  <span className="font-[700] text-[16px]">
                    {userData.phone}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <span className="font-[700] text-[20px]">Social media:</span>
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
                {userData?.skills.map((item, index) => (
                  <p
                    key={index}
                    className="py-[2px] px-[12px] bg-green-100 text-green-800 rounded-[8px] text-[14px] font-[600]"
                  >
                    {item.replace("#", "")}
                  </p>
                ))}
              </div>
            </div>
            <div className="w-[100%] shadow-primary rounded-[16px] p-[32px] flex flex-col gap-[20px]">
              <div>
                <h3 className="font-[700] text-[24px]">Hobbies</h3>
              </div>
              <div className="flex flex-wrap gap-[8px]">
                {userData?.hobbies.map((item, index) => (
                  <p
                    key={index}
                    className="py-[2px] px-[12px] bg-purple-100 text-purple-800 rounded-[8px] text-[14px] font-[600]"
                  >
                    {item.replace("#", "")}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[67%] flex flex-col gap-[16px]">
            <div className="w-[100%] shadow-primary rounded-[16px] p-[32px] flex flex-col gap-[20px]">
              <div>
                <h3 className="font-[700] text-[24px]">General information</h3>
              </div>
              <div className="flex flex-col gap-[8px]">
                <h4 className="font-[600] text-[20px]">About me</h4>
                <div className="font-[400] text-[16px]" id="aboutMember">
                  {renderHtmlString(userData.about)}
                </div>
              </div>
              <div className="flex flex-row gap-[80px]">
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <span className="font-[400] text-[16px]">Join date:</span>
                    </div>
                    <div className="flex flex-row">
                      <span className="font-[700] text-[16px]">
                        {userData.joinDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <span className="font-[400] text-[16px]">Position</span>
                    </div>
                    <div className="flex flex-row">
                      <span className="font-[700] text-[16px]">
                        {userData.position}
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
                        {userData.deparment}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <span className="font-[400] text-[16px]">Education:</span>
                    </div>
                    <div className="flex flex-row">
                      <span className="font-[700] text-[16px]">
                        {userData.education}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <span className="font-[400] text-[16px]">Major</span>
                    </div>
                    <div className="flex flex-row">
                      <span className="font-[700] text-[16px]">
                        {userData.major}
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
                        {userData.workHistory}
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
                {userData?.project.map((item, index) => {
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
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
