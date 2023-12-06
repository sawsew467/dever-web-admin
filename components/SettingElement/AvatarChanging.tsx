import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Avatar from "@image/page/member/list/Fu-dever.png";
import UnlinkButton from "@component/UnlinkButton";

import axios from "axios";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import { updateAvatar } from "@/apis/setting";
import { Skeleton } from "@mui/material";
import { useDispatch } from "react-redux";
import { setIsBackdrop } from "@/redux/slices/app";
import { setUserAvatar } from "@/redux/slices/userInfor";

type TProps = {
  avatarUrl:string;
  fullName:string | undefined;
  career: string;
  userId: string;
  refreshApi: () => void
}

function AvatarChanging({avatarUrl, fullName, career, refreshApi, userId}:TProps): JSX.Element {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [imageState, setImageState] = useState<File | null>(null);
  const [imageSource, setImageSource] = useState<string | undefined | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  // console.log(imageSource);

  const handleBrowseImage = () => {
    document.getElementById("imageImporter")?.click();
  };
  const handleOnChangeSeleteImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file && isValidFileType(file)) {
      setIsUploading(true);
      setImageState(file);
    } else {
      setImageState(null);
      alert("Invalid file type!");
    }
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
  const handleUpdataProfileImage = async (avatarUrl:string) => {
    const avatar = {
      userId: userId!,
      avatarUrl: avatarUrl
    }
    try {
      const access_token = getCookie('accessToken');
      if(access_token) {
        dispatch(setIsBackdrop(true));
        await updateAvatar(access_token, avatar);
        refreshApi();
        dispatch(setUserAvatar(avatarUrl));
        dispatch(setIsBackdrop(false));
        toast.success("Update profile image successfully!");
      }
    } catch (error) {
      if(axios.isAxiosError(error)) {
        dispatch(setIsBackdrop(false));
        toast.error("Upload profile image failed!")
      }
    }
  }
  const handleGetImageUrl = async (
    file: File
  ): Promise<string | null | undefined> => {
    const CLOUD_NAME = "dy1uuo6ql";
    const UPLOAD_PRESET = "fu-dever-user-image";
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const responseData = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      const imageURL = responseData.data.secure_url;      
      setImageSource(imageURL);
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  };    
  useEffect(() => {
    if(imageState) {
      handleGetImageUrl(imageState);
    }
  },[imageState, setImageSource])

  return (
    <div className="flex flex-col xl:flex-row gap-[25px] p-[24px] shadow-primary dark:shadow-darkPrimary dark:text-white rounded-[10px]">
      <div className="w-[126px] h-[126px] rounded-[10px] overflow-hidden">
       {
        isUploading ? 
        <div>
          <Skeleton variant="rounded" height={126} className="dark:bg-[#3b3b3b]"></Skeleton>
        </div> :
        <Image
        src={imageState ? URL.createObjectURL(imageState) : avatarUrl == '' ? Avatar : avatarUrl}
        width={1200}
        height={800}
        alt="avt"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        ></Image>        
       }
      </div>
      <div className="flex flex-col gap-[16px]">
        <h3 className="font-[700] text-[24px]">{fullName == ' ' ? "Haven't set name yet" : fullName}</h3>
        <p className="font-[400] text-[16px]">{career == '' ? "Not set yet" : career}</p>
        <div>
          <input
            type="file"
            name="file"
            id="imageImporter"
            className="hidden"
            multiple
            ref={fileInputRef}
            onChange={(event) => handleOnChangeSeleteImage(event)}
            onSubmit={() => {
              console.log("Submit");
            }}
          />
          <div className="flex flex-row justify-between gap-[20px]">
            <UnlinkButton
              textContent={"Change Image"}
              icon={"upload"}
              iconPosition={"left"}
              backgroundColor={"bg-blue-700"}
              method={() => handleBrowseImage()}
              tailwind={"text-white dark:shadow-darkPrimaryBlue"}
            ></UnlinkButton>
            {imageState ? (
              <UnlinkButton
                textContent={"Save"}
                icon={""}
                iconPosition={"left"}
                backgroundColor={"bg-blue-700"}
                method={() => {handleUpdataProfileImage(imageSource!)}}
                tailwind={"text-white dark:shadow-darkPrimaryBlue"}
              ></UnlinkButton>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvatarChanging;
