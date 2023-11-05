import React from "react";
import Image from "next/image";
import branchIcon from "@icon/page/member/profile/code-merge.svg";
import Button from "../Button";
import UnlinkButton from "../UnlinkButton";
import { RiGitBranchFill } from "react-icons/ri";

type Tpros = {
  img: string;
  title: string;
  desc: string;
  link: string;
  canEdit: boolean;
  method: () => void;
  isEdit: boolean
};

function ProjectCard({img, title, desc, link, canEdit, method, isEdit}: Tpros) {
  const renderHtmlString = (htmlString: string) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
  };

  return (
    <div className="flex flex-row shadow-secondary dark:shadow-darkSecondary rounded-[16px] h-fit overflow-hidden relative hover:scale-[1.02] transition duration-400"
    >
      <div className="w-[30%] h-[100%] absolute">
        <Image
          src={img}
          alt="project"
          width={6000}
          height={4000}
          className="w-[100%] h-full object-cover"
        ></Image>
      </div>
      <div className="lg:w-[70%] w-[100%] p-[20px] flex flex-col gap-[16px] ml-[30%]">
        <div className="flex flex-col gap-[8px]">
          <h3 className="font-[700] text-[24px] dark:text-white">{title}</h3>
          <div className="text-[16px] font-[400] text-gray-500 h-fit overflow-hidden dark:text-gray-300">
            {renderHtmlString(desc)}
          </div>
        </div>
        <div className="flex gap-[8px] w-full overflow-hidden items-center">
          <RiGitBranchFill className="text-[24px] dark:text-white"/>
          <a href={"https://" + link} className="text-[16px] dark:text-white font-[400px]">
            {link}
          </a>
        </div>
        <div className="flex flex-row gap-[20px]">
          <UnlinkButton
            textContent={"Demo"}
            icon={"arrowRight"}
            iconPosition={"right"}
            backgroundColor={"bg-blue-700"}
            method={() => {
              window.open("https://" + link, "_blank");
            }}
            tailwind={"text-white dark:shadow-darkPrimaryBlue"}
          ></UnlinkButton>
          {
            canEdit && isEdit ?  <UnlinkButton
            textContent={"Delete"}
            icon={""}
            iconPosition={"left"}
            backgroundColor={"dark:bg-dark dark:hover:bg-blue-700 hover:bg-blue-700"}
            method={() => method()}
            tailwind={
              "text-blue-700 dark:text-blue-500 dark:font-bold border-[1px] font-[500] dark:hover:text-white border-blue-500 hover:text-white transition dark:shadow-darkPrimaryBlue"
            }
          ></UnlinkButton> : null
          }
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
