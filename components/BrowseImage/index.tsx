import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import uploadIcon from "@icon/components/BrowseFile/upload.svg";

import Button from "@component/Button";
import UnlinkButton from "@component/UnlinkButton";
import axios from "axios";
import { Skeleton } from "@mui/material";

interface IPros {
  formTitle: string;
  fileStorage: File | null;
  setFileStorage: React.Dispatch<React.SetStateAction<File | null>>;
  setFileURL: React.Dispatch<React.SetStateAction<string>>;
  page: string;
}

function BrowseImage({
  formTitle,
  fileStorage,
  setFileStorage,
  setFileURL,
  page
}: IPros) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(true);
  console.log(isUploading);

  const fileInputRef = useRef(null);

  const handleBrowseFile = () => {
    document.getElementById("fileImporter")?.click();
  };

  const handleOnChangeSeleteFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsUploading(true);
    const file = event.target.files && event.target.files[0];
    if (file && isValidFileType(file)) {
      setFileStorage(file);
    } else {
      setFileStorage(null);
      alert("Invalid file type!");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDrogFile = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);

    const file = event.dataTransfer.files[0];

    if (file && isValidFileType(file)) {
      setFileStorage(file);
    } else {
      setFileStorage(null);
      alert("Invalid file type!");
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const isValidFileType = (file: File) => {
    const acceptedTypes = [
      "image/png",
      "image/jpeg",
      "image/gif",
      "image/jpg",
      "image/webp",
    ];
    return acceptedTypes.includes(file.type);
  };

  useEffect(() => {
    const handleGetImageURL = async (
      file: File
    ): Promise<string | null | undefined> => {
      const CLOUD_NAME = "dy1uuo6ql";
      const UPLOAD_PRESET = page === "create_notification" ? "fu-dever-notification-image" : page === "create_blog" ? "fu-dever-blog-image" : '';
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        const responseData = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData
        );
        if (responseData) {
          setIsUploading(false);
        }
        setFileURL(responseData.data.secure_url);
      } catch (error) {
        console.error("Error uploading image: ", error);
        return null;
      }
    };

    if (fileStorage) {
      console.log("Oke");

      handleGetImageURL(fileStorage);
    }
  }, [fileStorage, page, setFileURL]);

  return (
    <div className="flex flex-col gap-[8px]">
      <div>
        <h4 className="select-none font-[500]">{formTitle}:</h4>
      </div>
      <div
        className="h-fit w-full border-2 border-dashed rounded-[8px] gap-[16px]"
        onDrop={(event: React.DragEvent<HTMLDivElement>) =>
          handleDrogFile(event)
        }
        onDragLeave={(event: React.DragEvent<HTMLDivElement>) =>
          handleDragLeave(event)
        }
        onDragOver={(event: React.DragEvent<HTMLDivElement>) =>
          handleDragOver(event)
        }
      >
        {fileStorage ? (
          <>
            <div className="flex flex-row">
              <div className="w-[60%] m-[8px] select-none rounded-[10px] overflow-hidden">
                {
                  isUploading ? <>
                    <div className="relative">
                      <Skeleton variant="rounded" height={200}></Skeleton>
                      <p className="absolute top-[50%] left-[50%] translate-x-[-50%]
                      translate-y-[-50%] font-[700]"> Uploading image...</p>
                    </div>
                  </> :     <Image
                  src={URL.createObjectURL(fileStorage)}
                  alt="imageFromFile"
                  width={6000}
                  height={4000}
                  className="w-[100%] h-[100%] object-fill"
                ></Image>
                }
              </div>
              <div className="w-[40%] m-[8px] rounded-[10px] border-2 border-dashed p-[10px] flex flex-col gap-[20px]">
                <div>
                  <h2 className="text-[14px] font-[500]">
                    File name:{" "}
                    <span className="ml-[8px] font-[400]">
                      {fileStorage.name}
                    </span>
                  </h2>
                  <h2 className="text-[14px] font-[500]">
                    File type:{" "}
                    <span className="ml-[8px] font-[400]">
                      {fileStorage.type}
                    </span>
                  </h2>
                  <h2 className="text-[14px] font-[500]">
                    File size:{" "}
                    <span className="ml-[8px] font-[400]">
                      {Math.round(fileStorage.size * Math.pow(2, -20) * 100) /
                        100}{" "}
                      MB
                    </span>
                  </h2>
                </div>
                <div>
                  <input
                    type="file"
                    name="file"
                    id="fileImporter"
                    className="hidden"
                    multiple
                    ref={fileInputRef}
                    onChange={handleOnChangeSeleteFile}
                  />
                  <UnlinkButton
                    textContent={"Browse another File"}
                    icon={"search"}
                    iconPosition={"left"}
                    backgroundColor={"bg-blue-700"}
                    method={() => handleBrowseFile()}
                    tailwind={"text-white"}
                  ></UnlinkButton>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center gap-[16px] py-[40px]">
              <div className="flex flex-col gap-[8px] select-none text-center items-center justify-center text-gray-500">
                <Image src={uploadIcon} alt="upload"></Image>
                <p className="text-[14px]">
                  <span className="font-[600]">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-[12px] font-[600]">Max. File size: 30MB</p>
                <p className="text-[12px]">Support type: JPEG, JPG,PNG, GIF.</p>
              </div>

              <div className="">
                <input
                  type="file"
                  name="file"
                  id="fileImporter"
                  className="hidden"
                  multiple
                  ref={fileInputRef}
                  onChange={handleOnChangeSeleteFile}
                />
                <label htmlFor="file">
                  <UnlinkButton
                    textContent={"Browse File"}
                    icon={"search"}
                    iconPosition={"left"}
                    backgroundColor={"bg-blue-700"}
                    method={() => handleBrowseFile()}
                    tailwind={"text-white"}
                  ></UnlinkButton>
                </label>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BrowseImage;
