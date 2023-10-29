"use-client";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

import FacebookIcon from "@assets/icon/page/member/profile/facebook.png";
import GithubIcon from "@assets/icon/page/member/profile/github.png";
import YoutubeIcon from "@assets/icon/page/member/profile/youtube.png";
import InstagramIcon from "@assets/icon/page/member/profile/instagram.png";
import DiscordIcon from "@assets/icon/page/member/profile/discord.png";
import LinkedinIcon from "@assets/icon/page/member/profile/linkedin.png";
import TiktokIcon from "@assets/icon/page/member/profile/tik-tok.png";
import TwitterIcon from "@assets/icon/page/member/profile/twitter.png";
import UndefineIcon from "@assets/icon/page/member/profile/undefine.png";

import EditIconAnimate from "@icon/components/Button/edit.gif";
import EditIconPause from "@icon/components/Button/edit_pause.png";

import UnlinkButton from "../UnlinkButton";
import AddButton from "./AddButton";
import Selection from "./Selection";
import Input from "./Input";
import Alert from "@mui/material/Alert";
import { Collapse } from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
import {
  deleteSocialAccount,
  getAllAccountsByUserId,
  getAllPlatform,
  postSocialAccount,
} from "@/apis/setting";
import { toast } from "react-toastify";

type TSocialData = {
  id: string;
  name: string;
  url: string;
};

function SocialAccount({
  socialMediaState,
  refreshApi,
}: {
  socialMediaState: TSocialData[];
  refreshApi: () => void;
}): JSX.Element {

  const platforms = [
    "Facebook",
    "Github",
    "Youtube",
    "Instagram",
    "Discord",
    "Linkedin",
    "Tiktok",
    "Twitter",
  ];
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [platformList, setPlatformList] = useState<
    { id: string; name: string }[]
  >([]);

  const [selectPlatform, setSelectPlatform] = useState<string>(
    platformList[0]?.id
  );
  const [linkState, setLinkState] = useState<string>("");

  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isWarning, setIsWarning] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [selectedPlatformName, setSelectedPlatformName] = useState<string>("");

  const handleOnChangePlatform = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectPlatform(event.target.value);
    platformList.forEach((item) => {
      if (item.id == event.target.value) {
        setSelectedPlatformName(item.name);
      }
    });
  };
  const handleOnChangeInputLink = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLinkState(event.target.value);
  };

  const returnSocialIcon = (item: TSocialData): StaticImageData => {
    switch (item.name.toLowerCase()) {
      case "facebook":
        return FacebookIcon;
      case "github":
        return GithubIcon;
      case "youtube":
        return YoutubeIcon;
      case "instagram":
        return InstagramIcon;
      case "discord":
        return DiscordIcon;
      case "linkedin":
        return LinkedinIcon;
      case "tiktok":
        return TiktokIcon;
      case "twitter":
        return TwitterIcon;
      default:
        return UndefineIcon;
    }
  };
  const addHttpsIfMissing = (link: string): string => {
    if (link && typeof link === "string") {
      if (!link.startsWith("http://") && !link.startsWith("https://")) {
        return "https://" + link;
      }
    }
    return link;
  };
  const removeHttps = (link: string): string => {
    if (link && typeof link === "string") {
      if (link.startsWith("http://")) {
        return link.slice(7);
      } else if (link.startsWith("https://")) {
        return link.slice(8);
      }
    }
    return link;
  };

  const checkExist = (inputLink: string, selectPlatform: string): boolean => {
    const linkExists = socialMediaState.some(
      (item: TSocialData) => item.url === addHttpsIfMissing(inputLink)
    );

    if (linkExists) {
      setIsAlert(true);
      setTimeout(() => {
        setIsAlert(false);
      }, 4000);
      setAlertMessage("This url already exists!");
      return true;
    }

    if (inputLink.length == 0) {
      setIsAlert(true);
      setTimeout(() => {
        setIsAlert(false);
      }, 4000);
      setAlertMessage("Can't add account without link!");
      return true;
    }
    return false;
  };

  const checkIsValidLink = (inputLink: string): boolean => {
    const linkRegex =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(:[0-9]{1,5})?(\/[^\s]*)?$/;
    if (!linkRegex.test(inputLink)) {
      setIsWarning(true);
      setTimeout(() => {
        setIsWarning(false);
      }, 4000);
      setWarningMessage("The input is not a link! ");
      return true;
    }

    return false;
  };

  const handleSubmit = async () => {
    if (checkExist(removeHttps(linkState), selectPlatform)) {
      return;
    } else if (checkIsValidLink(linkState)) return;
    else {
      handlePostSocialAccount();
    }
  };

  const handleGetPlatforms = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await getAllPlatform(access_token);
        const data = response.data.body;
        const platFormFilted = data
          .filter(
            (item: { id: string; name: string }) => item.name !== "default"
          )
          .filter((item: { id: string; name: string }) => item.name !== "");
        setPlatformList(platFormFilted);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    handleGetPlatforms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePostSocialAccount = async () => {
    try {
      const userId = getCookie("userId");
      const access_token = getCookie("accessToken");
      if (access_token && userId) {
        const postValue = {
          userId: userId,
          platformId: selectPlatform,
          url: linkState,
        };
        await postSocialAccount(access_token, postValue);
        toast.success(`Post ${selectedPlatformName} account successfully!`);
        setIsEdit(false);
        setLinkState('');
        setSelectPlatform('');
        refreshApi();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Post ${selectedPlatformName} account failed`);
      }
    }
  };
  const handleDeleteAccount = async (platformId: string) => {
    try {
      const access_token = getCookie("accessToken");
      const userId = getCookie("userId");
      if (access_token && userId) {
        const req = {
          userId: userId,
          platformId: platformId,
        };
        await deleteSocialAccount(access_token, req);
        
        toast.success(`Deleting successfully!`);
        refreshApi();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Deleting failed!`);
      }
    }
  };
  return (
    <div className="flex flex-col gap-[20px] p-[24px] shadow-primary dark:shadow-darkPrimary dark:text-white rounded-[10px]">
      <div className="flex flex-row justify-between">
        <h3 className="font-[700] text-[24px]">Social accounts</h3>
        <button
          className="w-[28px] h-[28px] flex items-center justify-center hover:scale-125 rounded-[50%] hover:border-[1px] hover:border-blue-700 cursor-pointer transition"
          onClick={() => {
            setIsEdit(!isEdit);
            if (isEdit == false) setIsAdd(false);
          }}
        >
          <Image
            src={isEdit ? EditIconAnimate : EditIconPause}
            alt="Edit"
            width={18}
            height={18}
          ></Image>
        </button>
      </div>
      <div>
        <ul className="list-none flex flex-col gap-[10px]">
          {socialMediaState.length == 0 ? (
            <p
              className="font-[500] text-[14px] text-blue-700 cursor-pointer dark:text-white"
              onClick={() => {
                setIsAdd(true);
                setIsEdit(true);
              }}
            >
              You haven&apos;t added any social accounts yet!
            </p>
          ) : (
            socialMediaState.map((item: TSocialData, index: number) => (
              <li
                className="flex flex-row border-b-2 dark:border-darkHover pb-[10px] justify-between"
                key={index}
              >
                <div className="flex flex-row gap-[10px]">
                  <div className="flex items-center justify-center w-[34px] h-[34px] dark:bg-white rounded-[50%]">
                    <Image
                      src={returnSocialIcon(item)}
                      alt={item.name}
                      width={26}
                      height={26}
                    ></Image>
                  </div>
                  <div className="max-w-[300px]">
                    <p className="font-[600] text-[14px]">
                      {item.name}
                    </p>
                    <a
                      href={addHttpsIfMissing(item.url)}
                      target="_blank"
                      className="font-[300] text-[14px] text-blue-500 whitespace-nowrap truncate dark:font-semibold"
                    >
                      <p className="truncate">{removeHttps(item.url)}</p>
                    </a>
                  </div>
                </div>
                {isEdit ? (
                  <div>
                    <UnlinkButton
                      textContent={"Delete"}
                      icon={""}
                      iconPosition={"left"}
                      backgroundColor={"dark:bg-dark dark:hover:bg-blue-500 hover:bg-blue-700"}
                      method={() => {
                        handleDeleteAccount(item.id);
                      }}
                      tailwind={
                        "text-blue-700 dark:text-blue-500 dark:font-bold border-[1px] font-[500] dark:hover:text-white border-blue-500 hover:text-white transition dark:shadow-darkPrimaryBlue"
                      }
                    ></UnlinkButton>
                  </div>
                ) : null}
              </li>
            ))
          )}
        </ul>
      </div>

      {isEdit ? (
        <AddButton
          text={socialMediaState.length == 0 ? "Add" : "Add more"}
          isAdd={isAdd}
          setIsAdd={setIsAdd}
        />
      ) : null}

      {isAdd && isEdit ? (
        <>
          <div className="flex flex-col gap-[20px]">
            <Selection
              title={"Select platform"}
              options={platformList}
              value={selectPlatform}
              isEdit={isAdd}
              onChange={(e) => handleOnChangePlatform(e)}
            />
            <Input
              title={`${selectedPlatformName} profile link`}
              value={linkState}
              onChange={(e) => handleOnChangeInputLink(e)}
              isValidDataType={true}
              type={"text"}
              isEdit={isAdd}
            />
          </div>
        </>
      ) : null}
      {isAdd && isEdit ? (
        <div
          className={`flex flex-col ${
            isAlert || isWarning ? "gap-[20px]" : ""
          }`}
        >
          <div id="alert">
            <Collapse in={isAlert}>
              <Alert severity="error" onClose={() => setIsAlert(false)}>
                {alertMessage}
              </Alert>
            </Collapse>
            <Collapse in={isWarning}>
              <Alert severity="warning" onClose={() => setIsWarning(false)}>
                {warningMessage}
              </Alert>
            </Collapse>
          </div>
          <div className="">
            {" "}
            <UnlinkButton
              textContent={"Save"}
              icon={""}
              iconPosition={"left"}
              backgroundColor={"bg-blue-700"}
              method={handleSubmit}
              tailwind={
                "text-white border-[1px] dark:border-0 dark:shadow-darkPrimaryBlue font-[500] border-blue-500 transition"
              }
            ></UnlinkButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SocialAccount;
