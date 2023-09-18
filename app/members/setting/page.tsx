"use client";
import React, { useState, useRef } from "react";
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
import withAuth from "@/ultils/hoc";
function SettingList() {
  const isOpenSlidebar = useSelector((state: RootState) => state.app.isOpenSlidebar);
  const isMouseVisit = useSelector((state: RootState) => state.app.isMouseVisit);

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
            <span className="text-blue-500">Your&apos;s</span> profile setting
          </h3>
        </div>
        <div className="flex flex-col lg:flex-row gap-[16px]">
          <div className="flex flex-col gap-[16px] w-full lg:w-[40%] h-fit select-none">
            <AvatarChanging />
            <ContactInfomation />
            <SocialAccount/>
            <Skills/>
            <Hobbies/>
            <ChangePassword/>
          </div>
          <div className="flex flex-col gap-[16px] w-full lg:w-[60%] h-fit">
            <AboutUser />
            <GeneralInformation />
            <Projects/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(SettingList);
