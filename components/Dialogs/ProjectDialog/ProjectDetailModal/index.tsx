import { RootState } from "@/redux/store";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { Button as MUIButton } from "@mui/material/";
import Image from "next/image";
import { FaGithub, FaLongArrowAltRight } from "react-icons/fa";
import UnlinkButton from "../../../UnlinkButton";
import { getCookie } from "cookies-next";
import { getMemberInfo } from "@/apis/profile";
import axios from "axios";
import { userInfo } from "@/ultils/types";

type TAppUserProject = {
  createdAt: string;
  demoUrl: string;
  description: string;
  projectId: string;
  projectUrl: string;
  thumbnailUrl: string;
  title: string;
  updatedAt: string;
};

type TProps = {
  projectData: TAppUserProject;
  isOpenDetailProject: boolean;
  setIsOpenDetailProject: React.Dispatch<SetStateAction<boolean>>;
  authorId: string;
};

function ProjectDetailModal({
  isOpenDetailProject,
  setIsOpenDetailProject,
  projectData,
  authorId
}: TProps) {
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const renderHtmlString = (htmlString: string) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
  };
  const [userData, setUserData] = useState<userInfo>();

  const handleGetUserProfile = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        if (authorId) {
          const response = await getMemberInfo(authorId, access_token);
          const data = response.data.body;
          setUserData(data);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    handleGetUserProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Dialog
        open={isOpenDetailProject}
        onClose={() => setIsOpenDetailProject(false)}
        PaperProps={{
          style: {
            backgroundColor: isDarkMode ? "#282828" : "",
            color: isDarkMode ? "white" : "",
            borderRadius: "8px",
            maxWidth: "1200px",
            userSelect: "none",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          className="font-bold flex flex-col lg:flex-row justify-between items-center gap-[8px]"
        >
          <div className="flex flex-row">
            <button
              className="flex flex-row gap-2 items-center hover:dark:bg-darkHover transition py-[8px] px-[14px] rounded-md"
              onClick={() => {
                window.open(`${projectData.projectUrl}`, "_blank");
              }}
            >
              <FaGithub className="text-[20px]" />
              Github
            </button>
            {projectData.demoUrl.length == 0 ? null : (
              <button
                className="flex flex-row gap-2 items-center hover:dark:bg-darkHover transition py-[8px] px-[14px] rounded-md"
                onClick={() => window.open(`${projectData.demoUrl}`, "_blank")}
              >
                Demo
                <FaLongArrowAltRight className="text-[20px]" />
              </button>
            )}
          </div>
          <div className="flex flex-row gap-[10px] items-center ">
            <div>
                <h3 className="text-[16px]">
                  {
                    userData?.firstName.length == 0 || userData?.lastName.length == 0 ? userData.email : userData?.lastName.concat(' ', userData.firstName!)
                  }
                </h3>
            </div>
            <div>
                <Image src={userData?.avatarUrl!} alt="author-avt" width={1200} height={800} className="w-[42px] h-[42px] object-cover rounded-[50%]"></Image>
            </div>
          </div>
        </DialogTitle>
        <DialogContent className="py-0 flex flex-col gap-[10px] scrollbar-hide">
          <div className="max-w-[800px]">
            <Image
              src={projectData.thumbnailUrl}
              alt="project-img"
              width={2100}
              height={1200}
              className="md:max-w-[300px] lg:max-w-[800px] h-fit  object-cover rounded-md"
            ></Image>
          </div>
          <div>
            <p className="text-[32px] max-w-[800px] font-bold select-text">
              {projectData.title}
            </p>
          </div>
          <div className="max-w-[800px] select-text">
            {renderHtmlString(projectData.description)}
          </div>
        </DialogContent>
        <DialogActions>
          <MUIButton
            onClick={() => {
              setIsOpenDetailProject(false);
            }}
          >
            <p>Close</p>
          </MUIButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProjectDetailModal;
