"use client";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Skills from "@/components/DataOrganizerElement/Skills";
import Hobbies from "@/components/DataOrganizerElement/Hobbies";
import Majors from "@/components/DataOrganizerElement/Majors";
import Department from "@/components/DataOrganizerElement/Department";
import Position from "@/components/DataOrganizerElement/Position";
import { closeSidebar } from "@/redux/slices/app";
import Platform from "@/components/DataOrganizerElement/Platform";

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
  const dispath = useDispatch();
  useEffect(() => {
    dispath(closeSidebar())
  }, [dispath])

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
         {
          userInfo.role === "admin" ? (
            <h3 className="text-blue-600 dark:text-[#0198ff] font-[700] text-[24px]">
            Data Organizer
          </h3>
          ) : null
         }
        </div>
        {userInfo.role !== "admin" ? (
          <div className="flex flex-col items-center justify-center mt-[100px]">
              <div className="text-[72px] font-bold text-sky-500 dark:text-sky-500">OPPS!</div>
              <p className="text-[32px] font-bold dark:text-white text-center">You do not have permission to access this page!</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-[16px]">
            <div className="w-full lg:w-[50%] flex flex-col gap-[20px]">
              <Skills />
              <Majors />
              <Department/>
            </div>
            <div className="w-full lg:w-[50%] flex flex-col gap-[20px]">
              <Hobbies />
              <Position/>
              <Platform/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingList;
