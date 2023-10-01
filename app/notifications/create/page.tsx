"use client";
import React, { useEffect, useState } from "react";

import BrowseFile from "@/components/BrowseImage";
import EditorLarge from "@/components/EditorLarge";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { dropdownNotifications, openCreateNotification } from "@/redux/slices/sideBarControl";
function CreateNotification() {
  const isOpenSlidebar = useSelector((state: RootState) => state.app.isOpenSlidebar);
  const isMouseVisit = useSelector((state: RootState) => state.app.isMouseVisit);
  const [importedImage, setImportedImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>('');
  const [htmlString, setHtmlStringg] = useState<string>("");
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dropdownNotifications(true));
    dispatch(openCreateNotification(true));
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
      <div className="py-[20px] px-[16px] flex flex-col gap-[20px]">
        <div>
          <h1 className="font-[700] text-[24px] select-none">
            Create notification
          </h1>
        </div>

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[8px]">
            <h4 className="select-none font-[500]">Notification title:</h4>
            <input
              type="text"
              placeholder="Write title here"
              className="border-2 border-gray-300 rounded-[12px] w-full"
            />
          </div>
          <div>
            <BrowseFile
              formTitle="Notification thumbnail"
              fileStorage={importedImage}
              setFileStorage={setImportedImage}
              setFileURL={setImageURL}
              page="create_notification"
            ></BrowseFile>
          </div>
          <div>
            <EditorLarge
              formTitle="Notification content"
              htmlString={htmlString}
              setHtmlString={setHtmlStringg}
              pageName="create_notification"
            ></EditorLarge>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNotification;
