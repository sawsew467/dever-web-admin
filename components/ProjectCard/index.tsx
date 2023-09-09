import React from "react";
import thumbnail from "@image/page/notification/list/thumbnail.png";
import Image, { StaticImageData } from "next/image";
import branchIcon from "@icon/page/member/profile/code-merge.svg";
import Button from "../Button";

type Tpros = {
  img: string;
  title: string;
  desc: string;
  link: string;
};

function ProjectCard({img, title, desc, link }: Tpros) {
  const renderHtmlString = (htmlString: string) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
  };

  return (
    <div
      className="flex flex-row shadow-secondary rounded-[16px] h-fit overflow-hidden relative"
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
          <h3 className="font-[700] text-[24px]">{title}</h3>
          <div className="text-[16px] font-[400] text-gray-500 h-[48px] overflow-hidden">
            {renderHtmlString(desc)}
          </div>
        </div>
        <div className="flex gap-[8px] w-full overflow-hidden">
          <Image src={branchIcon} alt="codeMerge"></Image>
          <a href={link} className="text-[16px]  font-[400px]">
            {link}
          </a>
        </div>
        <div>
          <Button
            textContent={"Demo"}
            icon={"arrowRight"}
            iconPosition={"right"}
            backgroundColor={"bg-blue-700"}
            href={link}
            method={() => {}}
            tailwind={"text-white"}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
