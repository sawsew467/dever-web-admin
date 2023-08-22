"use client";
import React from "react";
import Image from "next/image";
import { useAppContext } from "@/app/context/AppContext";
import pencil from "../../../../assets/images/notifications/pencil-alt.svg";
import clock from "../../../../assets/images/notifications/clock.svg";
import arrowleft from "../../../../assets/images/notifications/arrow-narrow-left.svg";
import notification from "../../../../assets/images/notifications/notification.svg";

import Link from "next/link";

interface pageProps {
  params: { notifyID: string };
}

function DetailNotification({ params }: pageProps) {
  const { isOpenSlidebar, isMouseVisit } = useAppContext();
  const data = {
    title: "Noteworthy technology acquisitions 2021",
    time: "August 7th 2023, 6:25:59 am",
    img: notification,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt ultrices tempus. Sed quis arcu nec nibh faucibus feugiat non et nunc. Proin bibendum turpis consequat tellus dapibus, eget commodo ligula mattis. Nullam finibus, odio at tincidunt tincidunt, ante nisl maximus justo, in lobortis metus felis faucibus est. Mauris ultrices tincidunt vehicula. Suspendisse scelerisque urna sapien, ac varius ex luctus quis. Nullam luctus sollicitudin tortor vitae auctor. In non arcu metus. Nam venenatis dignissim felis, non pharetra urna blandit eget. Fusce pulvinar magna in nunc dignissim molestie. Suspendisse sollicitudin nulla orci, vel hendrerit dui consequat nec. Aenean magna odio, tempus ut tempor vel, volutpat a augue. Suspendisse potenti. Integer imperdiet aliquet sapien et auctor.",
  };

  return (
    <div
      className={`w-[100%] ${
        isOpenSlidebar
          ? isMouseVisit
            ? "sm:w-[calc(100%-250px)]"
            : "sm:w-[calc(100%-65px)]"
          : "sm:w-[calc(100%-250px)]"
      } absolute right-0 top-[72px] bottom-0 h-fit duration-[0.3s] px-[16px] pb-[50px]`}
    >
      <div className="">
        {/* This is: {params.notifyID} detail notification page</h1> */}
        <div className="flex justify-between mt-[20px] mb-[30px]">
          <p className="text-[24px] font-bold ">Notifications Details</p>
          <div className="flex">
            <button className="bg-[#046C4E] h-[34px] w-[155px] mt-[1.5px] flex rounded-lg text-center px-[12px]">
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
            </button>
            <button className="bg-[#1A56DB] h-[34px] ml-[20px] mt-[1.5px] flex rounded-lg text-center px-[12px]">
              <Image
                src={arrowleft}
                alt="Picture of the author"
                className="cursor-pointer w-[16px] h-[16px] my-[8px] mr-[8px] "
              />
              <Link
                href={"/notifications/create"}
                className="text-[#fff] text-center text-[12px] font-medium pt-[8px] h-[18px]"
              >
                Notifications
              </Link>
            </button>

          </div>
        </div>
        <div className="px-[30px] border-[1px] pt-[31px] pb-[33px] rounded-[10px]">
          <p className="text-[36px] font-bold ">{data.title}</p>
          <div className="flex pt-[30px]">
            <Image
              src={clock}
              alt="Picture of the author"
              className="cursor-pointer mr-[8px]"
            />
            <p className="text-[#6B7280]">{data.time}</p>
          </div>
          <Image
            src={data.img}
            alt="Picture of the author"
            className="cursor-pointer w-full mt-[30px]"
          />
          <p className="pt-[30px] font-medium text-[20px]">{data.content}</p>
          <Link href={"/notifications/create"}></Link>
        </div>
      </div>
    </div>
  );
}

export default DetailNotification;
