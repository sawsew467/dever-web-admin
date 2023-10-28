"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Skills from "@/components/DataOrganizerElement/Skills";
import Hobbies from "@/components/DataOrganizerElement/Hobbies";
import Majors from "@/components/DataOrganizerElement/Majors";
import Department from "@/components/DataOrganizerElement/Department";
import Position from "@/components/DataOrganizerElement/Position";

function SettingList() {
  const isOpenSlidebar = useSelector(
    (state: RootState) => state.app.isOpenSlidebar
  );
  const isMouseVisit = useSelector(
    (state: RootState) => state.app.isMouseVisit
  );
  const userInfo = useSelector(
    (state: RootState) => state.userInfor.currentUser
  );

  return (
    <div
      className={`w-[100%] ${
        isOpenSlidebar
          ? isMouseVisit
            ? "sm:w-[calc(100%-250px)]"
            : "sm:w-[calc(100%-65px)]"
          : "sm:w-[calc(100%-250px)]"
      } absolute right-0 top-[72px] bottom-0 h-fit duration-[0.3s] select-none`}
    >
      <div className="py-[20px] px-[16px] flex flex-col gap-[20px]">
        <div>
          <h3 className="text-blue-600 dark:text-[#0198ff] font-[700] text-[24px]">
            Data Organizer
          </h3>
        </div>
        {userInfo.role !== "admin" ? (
          <div className="font-[600] text-[20px]">
            You do not have permission to view information on this page...
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-[16px]">
            <div className="w-full lg:w-[50%] flex flex-col gap-[20px]">
              <Skills />
              {/* <Majors />
              <Position/> */}
            </div>
            <div className="w-full lg:w-[50%] flex flex-col gap-[20px]">
              {/* <Hobbies />
              <Department/> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingList;
