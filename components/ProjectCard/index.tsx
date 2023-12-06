import React, { useState } from "react";
import Image from "next/image";
import UnlinkButton from "../UnlinkButton";
import { RiGitBranchFill } from "react-icons/ri";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { getCookie } from "cookies-next";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { deleteProject } from "@/apis/setting";
import { useDispatch } from "react-redux";
import { setIsBackdrop } from "@/redux/slices/app";
import ProjectDetailModal from "../Dialogs/ProjectDialog/ProjectDetailModal";
import { TAppUserProject } from "@/ultils/types";
import EditProjectDialog from "../Dialogs/ProjectDialog/EditProjectDialog";

type Tpros = {
  data: TAppUserProject;
  img: string;
  title: string;
  desc: string;
  projectSourcelink: string;
  projectDemoLink: string;
  projectId: string;
  authorId: string;
  canEdit: boolean;
  refreshApi: () => void;
  isEdit: boolean;
};

function ProjectCard({
  img,
  title,
  desc,
  projectDemoLink,
  projectSourcelink,
  projectId,
  authorId,
  canEdit,
  refreshApi,
  isEdit,
  data,
}: Tpros) {
  const renderHtmlString = (htmlString: string) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
  };
  const dispatch = useDispatch();
  const [isOpenDetailProject, setIsOpenDetailProject] =
    useState<boolean>(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState<boolean>(false);

  const removeHttps = (link: string): string => {
    if (link.startsWith("http://")) {
      return link.slice(7);
    } else if (link.startsWith("https://")) {
      return link.slice(8);
    }
    return link;
  };

  const handleDeleteProject = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        dispatch(setIsBackdrop(true));
        await deleteProject(access_token, projectId, authorId);
        refreshApi();
        dispatch(setIsBackdrop(false));
        toast.success("Delete project successfully!");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        dispatch(setIsBackdrop(false));
        toast.error("Can not delete this project!");
      }
    }
  };

  return (
    <div
      className="flex flex-row shadow-secondary dark:shadow-darkSecondary rounded-[16px] h-fit overflow-hidden relative hover:scale-[1.02] transition duration-400"
      onClick={() => {}}
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
          <div className="text-[16px] font-[400] text-gray-500 h-fit overflow-hidden dark:text-gray-300 max-h-[30px] whitespace-pre-wrap text-ellipsis">
            {renderHtmlString(desc)}
          </div>
        </div>
        <div className="flex gap-[8px] w-full overflow-hidden items-center">
          <RiGitBranchFill className="text-[24px] w-[24px] h-[24px] dark:text-white" />
          <a
            href={projectSourcelink}
            target="_blank"
            className="text-[16px] dark:text-white font-[400px]"
          >
            {removeHttps(projectSourcelink)}
          </a>
        </div>
        <div className="flex flex-row gap-[20px] relative">
          <UnlinkButton
            textContent={`${data.demoUrl.trim().length == 0 ? "View source code" : "Demo project"}`}
            icon={"arrowRight"}
            iconPosition={"right"}
            backgroundColor={"bg-blue-700"}
            method={() => {
              window.open(`${data.demoUrl.trim().length == 0 ? projectSourcelink : projectDemoLink}`, "_blank");
            }}
            tailwind={"text-white dark:shadow-darkPrimaryBlue"}
          ></UnlinkButton>
          {canEdit && isEdit ? (
            <UnlinkButton
              textContent={"Edit"}
              icon={""}
              iconPosition={"left"}
              backgroundColor={
                "dark:bg-dark dark:hover:bg-green-700 hover:bg-green-700"
              }
              method={() => {setIsEditProjectOpen(true)}}
              tailwind={
                "text-green-700 dark:text-green-500 dark:font-bold border-[1px] font-[500] dark:hover:text-white border-green-500 hover:text-white transition dark:shadow-darkPrimaryGreen"
              }
            ></UnlinkButton>
          ) : null}
          {canEdit && isEdit ? (
            <UnlinkButton
              textContent={"Delete"}
              icon={""}
              iconPosition={"left"}
              backgroundColor={
                "dark:bg-dark dark:hover:bg-red-700 hover:bg-red-700"
              }
              method={() => handleDeleteProject()}
              tailwind={
                "text-red-700 dark:text-red-500 dark:font-bold border-[1px] font-[500] dark:hover:text-white border-red-500 hover:text-white transition dark:shadow-darkPrimaryRed"
              }
            ></UnlinkButton>
          ) : null}
          {
            <div
              className="absolute right-0 bottom-0 text-[24px] cursor-pointer"
              onClick={() => setIsOpenDetailProject(true)}
            >
              <MdOutlineZoomOutMap></MdOutlineZoomOutMap>
            </div>
          }
        </div>
      </div>
      {
        <ProjectDetailModal
          projectData={data}
          isOpenDetailProject={isOpenDetailProject}
          setIsOpenDetailProject={setIsOpenDetailProject}
          authorId={authorId}
        ></ProjectDetailModal>
      }
      {
        <EditProjectDialog
          projectData={data}
          setIsEditProjectOpen={setIsEditProjectOpen}
          isEditProjectOpen={isEditProjectOpen}
          authorId={authorId}
          refreshApi={refreshApi}
        ></EditProjectDialog>
      }
    </div>
  );
}

export default ProjectCard;
