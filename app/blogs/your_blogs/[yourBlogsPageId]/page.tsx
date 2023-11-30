"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import thumbnail from "@image/page/notification/list/thumbnail.png";
import searchIcon from "@icon/page/notification/list/search-outline.svg";
import clockIcon from "@icon/page/notification/list/clock.svg";

import Button from "@/components/Button";
import Pagination from "@/components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IoPersonCircleSharp } from "react-icons/io5";
import UnlinkButton from "@/components/UnlinkButton";
import { dropdownBlogs, openYourBlog } from "@/redux/slices/sideBarControl";
import { GoClockFill } from "react-icons/go";

type pageProps = {
  params: { yourBlogsPageId: string };
};

function YourBlog({ params }: pageProps) {
  const isOpenSlidebar = useSelector(
    (state: RootState) => state.app.isOpenSlidebar
  );
  const isMouseVisit = useSelector(
    (state: RootState) => state.app.isMouseVisit
  );
  const blogsList = [
    {
      id: 0,
      img: thumbnail,
      title: "Noteworthy technology acquisitions 2021",
      cutContent:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      createAt: "August 7th 2023, 6:25:59 am",
      authorName: "Tran Van Bao Thang",
      status: "Pending",
    },
    {
      id: 1,
      img: thumbnail,
      title: "Noteworthy technology acquisitions 2021",
      cutContent:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      createAt: "August 7th 2023, 6:25:59 am",
      authorName: "Tran Van Bao Thang",
      status: "Active",
    },
    {
      id: 2,
      img: thumbnail,
      title: "Noteworthy technology acquisitions 2021",
      cutContent:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      createAt: "August 7th 2023, 6:25:59 am",
      authorName: "Tran Van Bao Thang",
      status: "Pending",
    },
    {
      id: 3,
      img: thumbnail,
      title: "Noteworthy technology acquisitions 2021",
      cutContent:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      createAt: "August 7th 2023, 6:25:59 am",
      authorName: "Tran Van Bao Thang",
      status: "Active",
    },
    {
      id: 4,
      img: thumbnail,
      title: "Noteworthy technology acquisitions 2021",
      cutContent:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      createAt: "August 7th 2023, 6:25:59 am",
      authorName: "Tran Van Bao Thang",
      status: "Reject",
    },
    {
      id: 5,
      img: thumbnail,
      title: "Noteworthy technology acquisitions 2021",
      cutContent:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      createAt: "August 7th 2023, 6:25:59 am",
      authorName: "Tran Van Bao Thang",
      status: "Expired",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dropdownBlogs(true));
    dispatch(openYourBlog(true));
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
      <div className="py-[20px] px-[16px] flex flex-col gap-[20px] select-none">
        <div>
          <h1 className="font-bold text-[24px] select-none dark:text-white">
            Your blogs
          </h1>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-[16px]">
            <div className="flex w-fit h-[38px] rounded-[10px] overflow-hidden">
              <select className="w-[84px] leading-4 px-[20px] rounded-tl-[10px] rounded-bl-[10px] border-2 outline-none dark:bg-dark dark:border-darkHover dark:text-white border-slate-200 bg-gray-100 select-none ">
                <option value="All" className="">
                  All
                </option>
                <option value="All" className="">
                  All
                </option>
                <option value="All" className="">
                  All
                </option>
              </select>
              <input
                type="search"
                className="w-[392px] border-y-2 border-r   border-l-none dark:bg-dark dark:border-darkHover dark:text-white border-slate-200 select-none outline-none"
              />
              <div className="w-[42px] h-[38px] bg-primaryBlue flex items-cent    justify-center cursor-pointer">
                <Image
                  src={searchIcon}
                  alt="searchIcon"
                  className="w-[24px] h-[38px]"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-[12px]">
            <Button
              textContent={"Create blog"}
              icon={"edit"}
              iconPosition={"left"}
              backgroundColor={"bg-green-700"}
              href={"/blogs/create"}
              method={() => {}}
              tailwind={"text-white dark:shadow-darkPrimaryGreen"}
            ></Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-[20px] gap-y-[20px]">
          {blogsList.map((item, index) => (
            <div
              key={index}
              className="rounded-[16px] overflow-hidden shadow-primary dark:shadow-darkPrimary"
            >
              <div className="w-[100%] h-[192px]">
                <Image
                  src={item.img}
                  alt=""
                  className="w-[100%] h-[100%] object-cover"
                />
              </div>
              <div className="p-[20px] flex flex-col gap-[12px]">
                <div className="flex flex-col gap-[8px]">
                  <h3 className="font-[700] text-[24px] dark:text-white">
                    {item.title}
                  </h3>
                  <p className="font-[400] text-[16px] h-[48px] overflow-hidden dark:text-gray-200">
                    {item.cutContent}
                  </p>
                  <p className="flex gap-[8px] dark:text-white">
                    <GoClockFill className="text-[22px] dark:text-white text-[#1f2a37]" />
                    {item.createAt}
                  </p>
                  <p className="flex gap-[8px] dark:text-white">
                    <IoPersonCircleSharp className="text-[24px] text-[#1f2a37] dark:text-white" />
                    You
                  </p>
                </div>
                <div className="flex justify-between">
                  <Button
                    textContent={"Preview"}
                    icon={"arrowRight"}
                    iconPosition={"right"}
                    backgroundColor={"bg-blue-700"}
                    href={`/blogs/views/detail/${item.id}`}
                    method={() => {}}
                    tailwind={"text-white dark:shadow-darkPrimaryBlue"}
                  ></Button>
                  <UnlinkButton
                    textContent={`${item.status}`}
                    icon={""}
                    iconPosition={"left"}
                    backgroundColor={`${
                      item.status === "Active"
                        ? "bg-primaryGreenBland"
                        : item.status === "Pending"
                        ? "bg-primaryYellowBland"
                        : "bg-primaryRedBland"
                    }`}
                    method={() => {}}
                    tailwind={`${
                      item.status === "Active"
                        ? "text-primaryGreen"
                        : item.status === "Pending"
                        ? "text-primaryYellow"
                        : "text-primaryRed"
                    } font-[500]`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 
        <Pagination
          paramID={params.viewID}
          route={"/notifications/views/"}
          countNumberOfPage={countNotificationPage}
          increaseIndex={increaseIndex}
          sliceSetData={setNotitications}
          data={notificationList}
        ></Pagination> */}
      </div>
    </div>
  );
}

export default YourBlog;
