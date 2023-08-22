"use client";
import React from "react";
import { useAppContext } from "@/app/context/AppContext";
import Link from "next/link";
import Image from "next/image";

import notification from "../../../assets/images/notifications/notification.svg";
import search from "../../../assets/images/notifications/search-outline.svg";
import pencil from "../../../assets/images/notifications/pencil-alt.svg";
import clock from "../../../assets/images/notifications/clock.svg";
import arrow from "../../../assets/images/notifications/arrow-right.svg";

interface pageProps {
  params: { viewID: string };
}
function View({ params }: pageProps) {
  const data = [
    {
      img: notification,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
    {
      img: notification,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
    {
      img: notification,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
    {
      img: notification,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
    {
      img: notification,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
    {
      img: notification,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
    {
      img: notification,
      title: "Noteworthy technology acquisitions 2021",
      second_title:
        "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      time: "August 7th 2023, 6:25:59 am",
    },
  ];
  const { isOpenSlidebar, isMouseVisit } = useAppContext();

  return (
    <div
      className={`w-[100%] text-black ${
        isOpenSlidebar
          ? isMouseVisit
            ? "sm:w-[calc(100%-250px)]"
            : "sm:w-[calc(100%-65px)]"
          : "sm:w-[calc(100%-250px)]"
      } absolute right-0 top-[72px] bottom-0 h-fit duration-[0.3s] px-[17px]`}
    >
      <div>
        <p className="text-[24px] font-bold mt-[20px]">All notifications</p>
        <div className="h-[37px] my-[20px] flex w-full justify-between">
          <div className="flex h-[37px] border-[1px] w-[518px] rounded-lg">
            <select className="p-0 font-medium rounded-lg pl-[20px] border-none text-center  w-[84px] ">
              <option value="All" className="text-black ">
                All
              </option>
            </select>
            <input
              type="text"
              placeholder="Search notifications..."
              className="border-0 border-l-[1px] border-solid border-[#D1D5DB] w-full"
            ></input>
            <Image
              src={search}
              alt="Picture of the author"
              className="cursor-pointer bg-[#1A56DB] w-[42px] px-[11px] rounded-r-lg "
            />
          </div>
          <div className="bg-[#046C4E] h-[34px] w-[155px] mt-[1.5px] flex rounded-lg text-center px-[12px]">
            <Image
              src={pencil}
              alt="Picture of the author"
              className="cursor-pointer w-[16px] h-[16px] my-[8px] mr-[8px] "
            />
            <Link
              href={"/notifications/create"}
              className="text-[#fff] text-center text-[12px] font-medium pt-[8px] h-[18px]"
            >
              Create notification
            </Link>
          </div>
        </div>
        <div
          className={` grid grid-cols-2 gap-x-[20px] gap-y-[20px] text-black `}
        >
          {data.map((item) => (
            <div>
              <Image
                src={item.img}
                alt="Picture of the author"
                className="cursor-pointer w-full"
              />
              <div className="p-[20px] rounded-b-2xl border-[1px] border-[#D1D5DB]">
                <p className="text-[24px] font-bold">{item.title}</p>
                <p className="text-[16px] text-gray-500 py-[8px]">
                  {item.second_title}
                </p>
                <div className="flex">
                  <Image
                    src={clock}
                    alt="Picture of the author"
                    className="cursor-pointer mr-[10px]"
                  />
                  <p className="text-gray-500 text-[16px]">{item.time}</p>
                </div>
                <Link href={`/notifications/views/${item.title}`} >

                <button className="rounded-lg mt-[16px] py-[10.5px] w-fit px-[20px] flex text-[#fff] bg-[#1A56DB]">
                  <p>Read more</p>
                  <Image
                    src={arrow}
                    alt="Picture of the author"
                    className="cursor-pointer ml-[8px] "
                    />
                </button>
                    </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-[20px] mb-[20px]">
        <div className="  text-[14px] rounded-[4px]  border-[1px]  ">

          <button className="py-[6px] px-[12px]  ">Previous</button>
          <button className="py-[6px] px-[12px] border-l-[1px]">1</button>
          <button className="py-[6px] px-[12px] border-l-[1px]">2</button>
          <button className="py-[6px] px-[12px] border-l-[1px]">3</button>
          <button className="py-[6px] px-[12px] border-l-[1px]">Next</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default View;
