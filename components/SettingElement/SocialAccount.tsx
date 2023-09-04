import React, { useState } from "react";
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

type TSocical = {
  platform: string;
  link: string;
};

function SocialAccount() {
  const fakeData = [
    {
      platform: "Facebook",
      link: "www.facebook.com/SawSew467",
    },
    {
      platform: "Github",
      link: "github.com/sawsew467",
    },
  ];
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

  const [socialMediaState, setSocialMediaState] =
    useState<TSocical[]>(fakeData);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [selectPlatformm, setSelectPlatform] = useState<string>(platforms[0]);
  const [linkState, setLinkState] = useState<string>("");

  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const handleOnChangePlatform = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectPlatform(event.target.value);
  };
  const handleOnChangeInputLink = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLinkState(event.target.value);
  };

  const handleDeleteAccount = (itemIndex: number) => {
    const deleted = socialMediaState.filter(
      (value: TSocical, index: number) => index !== itemIndex
    );
    setSocialMediaState([...deleted]);
    setIsDelete(true);
    console.log("DELECT" + " /api");
  };

  const returnSocialIcon = (item: TSocical): StaticImageData => {
    switch (item.platform) {
      case "Facebook":
        return FacebookIcon;
      case "Github":
        return GithubIcon;
      case "Youtube":
        return YoutubeIcon;
      case "Instagram":
        return InstagramIcon;
      case "Discord":
        return DiscordIcon;
      case "Linkedin":
        return LinkedinIcon;
      case "Tiktok":
        return TiktokIcon;
      case "Twitter":
        return TwitterIcon;
      default:
        return UndefineIcon;
    }
  };
  const addHttpsIfMissing = (link: string): string => {
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      return "https://" + link;
    }
    return link;
  };
  const removeHttps = (link: string): string => {
    if (link.startsWith("http://")) {
      return link.slice(7);
    } else if (link.startsWith("https://")) {
      return link.slice(8);
    }
    return link;
  };

  const handleCheckExistAccounts = (inputLink: string): boolean => {
    const linkExists = socialMediaState.some((item) => item.link === inputLink);
    if (linkExists) {
      setIsAlert(true);
      setTimeout(() => {
        setIsAlert(false);
      }, 4000);
      setAlertMessage("This account already exists!");
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

  const handleSubmit = () => {
    if (handleCheckExistAccounts(removeHttps(linkState))) {
      return;
    } else {
      const getState = {
        platform: selectPlatformm,
        link: removeHttps(linkState),
      };
      setSocialMediaState((prevSocialMediaState) => [
        ...prevSocialMediaState,
        getState,
      ]);
      console.log("POST: " + getState.link + " \n" + getState.platform);
    }
  };

  return (
    <div className="flex flex-col gap-[20px] p-[24px] shadow-primary rounded-[10px]">
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
              className="font-[500] text-[14px] text-blue-700 cursor-pointer"
              onClick={() => setIsAdd(true)}
            >
              You haven&apos;t added any social accounts yet!
            </p>
          ) : (
            socialMediaState.map((item: TSocical, index: number) => (
              <li
                className="flex flex-row border-b-2 pb-[10px] justify-between"
                key={index}
              >
                <div className="flex flex-row gap-[10px]">
                  <div className="flex items-center justify-center">
                    <Image
                      src={returnSocialIcon(item)}
                      alt={item.platform}
                      width={26}
                      height={26}
                    ></Image>
                  </div>
                  <div>
                    <p className="font-[600] text-[14px]">{item.platform}</p>
                    <a
                      href={addHttpsIfMissing(item.link)}
                      target="_blank"
                      className="font-[300] text-[14px] text-blue-500"
                    >
                      {item.link}
                    </a>
                  </div>
                </div>
                {isEdit ? (
                  <div>
                    <UnlinkButton
                      textContent={"Delete"}
                      icon={""}
                      iconPosition={"left"}
                      backgroundColor={"hover:bg-blue-700"}
                      method={() => {
                        handleDeleteAccount(index);
                      }}
                      tailwind={
                        "text-blue-700 border-[1px] font-[500] border-blue-500 hover:text-white transition"
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
              options={platforms}
              value={selectPlatformm}
              isEdit={isAdd}
              onChange={(e) => handleOnChangePlatform(e)}
            />
            <Input
              title={`${selectPlatformm} profile link`}
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
        <div className={`flex flex-col ${isAlert ? "gap-[20px]" : ""}`}>
          <div id="alert">
            <Collapse in={isAlert}>
              <Alert severity="error" onClose={() => setIsAlert(false)}>
                {alertMessage}
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
                "text-white border-[1px] font-[500] border-blue-500 transition"
              }
            ></UnlinkButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SocialAccount;
