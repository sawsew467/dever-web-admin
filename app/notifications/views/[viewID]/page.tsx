"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import thumbnail from "@image/page/notification/list/thumbnail.png";
import searchIcon from "@icon/page/notification/list/search-outline.svg";

import Button from "@/components/Button";
import Pagination from "@/components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  dropdownNotifications,
  openViewNotification,
} from "@/redux/slices/sideBarControl";
import { GoClockFill } from "react-icons/go";

interface pageProps {
  params: { viewID: string };
}
function View({ params }: pageProps) {
  const isOpenSlidebar = useSelector(
    (state: RootState) => state.app.isOpenSlidebar
  );
  const isMouseVisit = useSelector(
    (state: RootState) => state.app.isMouseVisit
  );

  const notificationList = [
    {
      id: 0,
      img: thumbnail,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
    {
      id: 1,
      img: thumbnail,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
    {
      id: 2,
      img: thumbnail,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
    {
      id: 3,
      img: thumbnail,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
    {
      id: 4,
      img: thumbnail,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
    {
      id: 5,
      img: thumbnail,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
    {
      id: 7,
      img: thumbnail,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
    {
      id: 8,
      img: thumbnail,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
    {
      id: 9,
      img: thumbnail,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
    {
      id: 10,
      img: thumbnail,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
    {
      id: 11,
      img: thumbnail,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
    {
      id: 12,
      img: thumbnail,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
    {
      id: 13,
      img: thumbnail,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
    {
      id: 14,
      img: thumbnail,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
  ];

  const increaseIndex = 5;
  const [notifications, setNotitications] = useState(
    notificationList.slice(0, increaseIndex + 1)
  );
  const [countNotificationPage, setCountNotificationPage] = useState(
    Math.ceil(notificationList.length / increaseIndex)
  );
  const pages: { param: string; startIndex: number; endIndex: number }[] = [];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dropdownNotifications(true));
    dispatch(openViewNotification(true));
  }, [dispatch]);

  return (
    <div
      className={`w-[100%] text-black ${
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
            All notifications
          </h1>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-[16px]">
            <div className="flex w-fit h-[38px] rounded-[10px] overflow-hidden">
              <select className="w-[84px] leading-4 px-[20px] rounded-tl-[10px] rounded-bl-[10px] border-2 outline-none border-slate-200 dark:border-darkHover bg-gray-100 dark:bg-dark dark:text-white select-none ">
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
                className="w-[392px] border-y-2 border-r border-l-none border-slate-200 dark:border-darkHover dark:bg-dark dark:text-white select-none outline-none"
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
              textContent={"Create notification"}
              icon={"edit"}
              iconPosition={"left"}
              backgroundColor={"bg-green-700"}
              href={"/notifications/create"}
              method={() => {}}
              tailwind={"text-white dark:shadow-darkPrimaryGreen"}
            ></Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-[20px] gap-y-[20px]">
          {notifications.map((item, index) => (
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
                  <h3 className="font-[700] text-[24px] dark:text-white">{item.title}</h3>
                  <p className="font-[400] text-[16px] h-[48px] overflow-hidden dark:text-slate-200">
                    {item.second_title}
                  </p>
                  <p className="flex gap-[8px] dark:text-slate-300 items-center">
                    <GoClockFill className = {"text-[20px]"}/>
                    {item.time}
                  </p>
                </div>
                <div>
                  <Button
                    textContent={"Read more"}
                    icon={"arrowRight"}
                    iconPosition={"right"}
                    backgroundColor={"bg-blue-700"}
                    href={`/notifications/views/${params.viewID}/detail/${item.id}`}
                    method={() => {}}
                    tailwind={"text-white dark:shadow-darkPrimaryBlue"}
                  ></Button>
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

export default View;
