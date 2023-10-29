"use client";
import React, { useEffect, useState } from "react";
import BrowseFile from "@/components/BrowseImage";
import EditorLarge from "@/components/EditorLarge";
import BlogTag from "@/components/BlogTag";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { dropdownBlogs, openCreateBlog } from "@/redux/slices/sideBarControl";

function CreateBlog() {
  const isOpenSlidebar = useSelector((state: RootState) => state.app.isOpenSlidebar);
  const isMouseVisit = useSelector((state: RootState) => state.app.isMouseVisit);
  const [importedImage, setImportedImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>('');
  const [htmlString, setHtmlStringg] = useState<string>("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dropdownBlogs(true));
    dispatch(openCreateBlog(true));
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
            Create blog
          </h1>
        </div>

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[8px]">
            <h4 className="select-none font-[500]">Your title:</h4>
            <input
              type="text"
              placeholder="Write title here"
              className="border-2 border-gray-300 rounded-[12px] w-full"
            />
          </div>
          <div>
            <BrowseFile
              formTitle="Your thumbnail"
              fileStorage={importedImage}
              setFileStorage={setImportedImage}
              setFileURL={setImageURL}
              page = "create_blog"
            ></BrowseFile>
          </div>
          <div>
            <BlogTag
            ></BlogTag>
          </div>
          <div>
            <EditorLarge
              formTitle="Your content"
              htmlString={htmlString}
              setHtmlString={setHtmlStringg}
              pageName="Blog"
            ></EditorLarge>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
