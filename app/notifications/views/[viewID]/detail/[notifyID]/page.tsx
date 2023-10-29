"use client";
import React, { ReactNode, useEffect } from "react";
import Image from "next/image";

import thumbnail from "@image/page/notification/list/thumbnail.png";
import Button from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { dropdownNotifications, openViewNotification } from "@/redux/slices/sideBarControl";
import { GoClockFill } from "react-icons/go";


interface pageProps {
  params: { notifyID: string };
}

function DetailNotification({ params }: pageProps) {
  const isOpenSlidebar = useSelector((state: RootState) => state.app.isOpenSlidebar);
  const isMouseVisit = useSelector((state: RootState) => state.app.isMouseVisit);
  const data = {
    id: 0,
    title: "Noteworthy technology acquisitions 2021",
    time: "August 7th 2023, 6:25:59 am",
    img: thumbnail,
    content:
      "<p style='font-size:14px; font-weight: bold;'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt ultrices tempus. Sed quis arcu nec nibh faucibus feugiat non et nunc. Proin bibendum turpis consequat tellus dapibus, eget commodo ligula mattis. Nullam finibus, odio at tincidunt tincidunt, ante nisl maximus justo, in lobortis metus felis faucibus est. Mauris ultrices tincidunt vehicula. Suspendisse scelerisque urna sapien, ac varius ex luctus quis. Nullam luctus sollicitudin tortor vitae auctor. In non arcu metus. Nam venenatis dignissim felis, non pharetra urna blandit eget. Fusce pulvinar magna in nunc dignissim molestie. Suspendisse sollicitudin nulla orci, vel hendrerit dui consequat nec. Aenean magna odio, tempus ut tempor vel, volutpat a augue. Suspendisse potenti. Integer imperdiet aliquet sapien et auctor.</p><br/><a href='#' style='color:blue; font-size:12px;'>Link text reuse anchor component</a>",
  };

  const renderHtmlString = (htmlString: string) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dropdownNotifications(true));
    dispatch(openViewNotification(true));
  }, [dispatch])
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
      <div className="py-[20px] px-[16px] flex flex-col gap-[30px]">
        <div className="flex justify-between">
          <div>
            <h1 className="font-[700] text-[24px] dark:text-white">Notifications Details</h1>
          </div>
          <div className="flex flex-row gap-[20px]">
            <Button
              textContent={"Create notification"}
              icon={"edit"}
              iconPosition={"left"}
              backgroundColor={"bg-green-700"}
              href={"/notifications/create"}
              method={() => {}}
              tailwind={"text-white dark:shadow-darkPrimaryGreen"}
            ></Button>
            <Button
              textContent={"Notification"}
              icon={"arrowLeft"}
              iconPosition={"left"}
              backgroundColor={"bg-blue-700"}
              href={"/notifications/views/1"}
              method={() => {}}
              tailwind={"text-white dark:shadow-darkPrimaryBlue"}
            ></Button>
          </div>
        </div>
        <div className="p-[30px] shadow-primary rounded-[10px] flex flex-col gap-[30px] dark:shadow-darkPrimary">
          <div>
            <h3 className="font-[700] text-[36px] dark:text-white">{data.title}</h3>
          </div>
          <div>
            <p className="flex gap-[8px] items-center dark:text-gray-200">
              <GoClockFill className="text-[20px]"/>
              {data.time}
            </p>
          </div>
          <div className="h-[480px] overflow-hidden rounded-[10px]">
            <Image
              src={thumbnail}
              alt="thumbnail"
              className="w-[100%] h-[100%] object-cover"
            ></Image>
          </div>
          <div id="notificationContent" className="dark:text-white">{renderHtmlString(data.content)}</div>
        </div>
      </div>
    </div>
  );
}

export default DetailNotification;
