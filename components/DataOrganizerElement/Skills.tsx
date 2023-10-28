import {
  deleteSkill,
  deleteSkillOutOfDB,
  getALlSoftDeleteSkills,
  getAllSkills,
  patchSkill,
  postSkill,
  restoreSkill,
} from "@/apis/dataOrganizer";
import { DialogContentText, LinearProgress, useMediaQuery } from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { MdRecycling } from "react-icons/md";
import { TransitionProps } from "@mui/material/transitions";
import { BsDatabaseFillDash } from "react-icons/bs";

import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type TSkill = {
  id: string;
  name: string;
};
type TSkillRecycle = {
  id: string;
  name: string;
  deletedAt: string;
  deletedBy: string;
};
function Skills() {
  const [open, setOpen] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);

  const [editSkillsValue, setEditSkillsValue] = useState<string>("");
  const editRef = useRef<HTMLInputElement | null>(null);
  const [isFetchData, setIsFetchData] = useState<boolean>(true);
  const handleOnChangeEditSkills = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditSkillsValue(event.target.value);
  };
  const [inputSkillsValue, setInputSkillsValue] = useState<string>("");

  const handleOnChangeInputSkills = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputSkillsValue(event.target.value);
  };
  const [skillsData, setSkillsData] = useState<TSkill[]>([]);
  const [recycleData, setRecycleData] = useState<TSkillRecycle[]>([]);
  const handleGetAllSkill = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await getAllSkills(access_token);
        const data = response.data.body;
        const filtedData = data
          .filter((item: TSkill) => item.name !== "")
          .filter((item: TSkill) => item.name.toLowerCase() !== "default");
        setSkillsData(filtedData);
        setIsFetchData(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Get all skill failded!");
      }
    }
  };
  const handleGetAllSoftDeleted = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await getALlSoftDeleteSkills(access_token);
        const data = response.data.body;
        setRecycleData(data);
        setIsFetchData(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return;
      }
    }
  };
  useEffect(() => {
    handleGetAllSkill();
    handleGetAllSoftDeleted();
  }, []);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [skillId, setSkillId] = useState<string>("");
  const handleEdit = (item: TSkill) => {
    setEditSkillsValue(item.name);
    setIsEdit(true);
    setSkillId(item.id);
    if (editRef.current) {
      editRef.current.focus();
    }
  };
  const handleAddSkill = async (value: string) => {
    try {
      const access_token = getCookie("accessToken");
      const postValue = {
        skillName: value,
      };
      if (access_token) {
        await postSkill(access_token, postValue);
        toast.success(`Add skill with value: "${value}" successfully!`);
        setInputSkillsValue("");
        handleGetAllSkill();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (value.length == 0) {
          toast.warning(`Can add empty value`);
        } else {
          toast.error(`Add skill with value: "${value}" failed!`);
        }
      }
    }
  };
  const handleUpdateSkill = async (value: string, itemId: string) => {
    try {
      const access_token = getCookie("accessToken");
      const updateValue = {
        newName: value,
      };
      if (access_token) {
        const response = await patchSkill(access_token, updateValue, itemId);
        toast.success(`Update skill with value: "${value}" successfully!`);
        handleGetAllSkill();
        setIsEdit(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Update skill with value: "${value}" failed!`);
      }
    }
  };
  const handleDeleteSkill = async (item: TSkill) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        await deleteSkill(access_token, item.id);
        toast.success(`Removed skill with value: "${item.name}"successfully!`);
        handleGetAllSkill();
        handleGetAllSoftDeleted();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Remove skill with value: "${item.name}" failed!`);
      }
    }
  };
  const handleDeleteSkillOutOfDB = async (item: TSkillRecycle, all:boolean) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        await deleteSkillOutOfDB(access_token, item.id!);
        if(!all) {
          toast.success(`Deleted skill with value: "${item.name}"successfully!`);
        }
        handleGetAllSkill();
        handleGetAllSoftDeleted();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Deleting skill with value: "${item.id!}" failed!`);
      }
    }
  };
  const handleRestoreSkill = async (item: TSkillRecycle, all:boolean) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        await restoreSkill(access_token, item.id!);
        if(!all) {
          toast.success(`Restore skill with value: "${item.name}"successfully!`);
        }
        handleGetAllSkill();
        handleGetAllSoftDeleted();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        toast.error(`Restore skill with value: "${item.id!}" failed!`);
      }
    }
  };
  const handleRestoreAll = () => {
    recycleData?.forEach((item) => handleRestoreSkill(item, true));
    setOpen(false);
  }
  const handleDeleteAll = () => {
    recycleData.forEach((item) => handleDeleteSkillOutOfDB(item, true));
    setOpenAlert(false);
  }

  return (
    <div className="dark:shadow-darkPrimary shadow-primary rounded-[10px] p-[20px] flex flex-col gap-[10px] dark:text-white">
      <div className="flex flex-row justify-between items-center">
        <h3 className="font-[700] text-[24px]">Skills</h3>
        {recycleData?.length !== 0 ? (
          <div
            className="flex items-center gap-[10px] hover:bg-slate-100 dark:hover:bg-darkHover cursor-pointer p-[8px] rounded-md transition relative"
            onClick={() => setOpen(true)}
          >
            <p className="font-[600]">Recycle</p>
            <MdRecycling className="text-[24px]" />
            <div className="absolute top-0 right-0 p-[4px] w-[16px] h-[16px] bg-red-600 flex items-center justify-center rounded-[50%]">
              <p className="text-[10px] text-white">{recycleData?.length}</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-[10px]">
        <h3 className="font-bold">All skills in database:</h3>

        <ul className="flex flex-col gap-[10px] max-h-[420px] overflow-y-scroll scrollbar-hide p-[4px]">
          {skillsData?.length == 0 ? (
            <div>Empty</div>
          ) : skillsData && !isFetchData ? (
            skillsData.map((item: TSkill, index: number) => (
              <li
                className="flex flex-row justify-between rounded-[8px] px-[10px] py-[8px] shadow-primary bg-blue-100 dark:bg-[#4e4f50]"
                key={index}
              >
                <p className="font-semibold">{item.name}</p>
                <div className="flex flex-row gap-[10px]">
                  <button
                    className="border-[1px] dark:border-dark px-[4px] rounded-[5px] text-[12px] bg-green-400 dark:bg-green-600 text-white hover:scale-105 transition"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="border-[1px] dark:border-dark px-[4px] rounded-[5px] text-[12px] bg-red-500 dark:bg-red-700 text-white hover:scale-105 transition"
                    onClick={() => handleDeleteSkill(item)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))
          ) : (
            <LinearProgress />
          )}
        </ul>
      </div>

      <div className="flex flex-col gap-[10px]">
        <h3 className="font-bold">Add skill: </h3>
        <div className="flex justify-between gap-[10px]">
          <input
            type="text"
            value={inputSkillsValue}
            placeholder="Enter new skill..."
            className="rounded-[8px] placeholder:text-[14px] placeholder:dark:text-slate-400 border-gray-300 dark:bg-[#3a3b3c] w-full"
            onChange={(e) => handleOnChangeInputSkills(e)}
          />
          <button
            className="px-[20px] bg-blue-600 text-white rounded-[6px] text-[14px] hover:scale-105 transition"
            onClick={() => handleAddSkill(inputSkillsValue)}
          >
            Add
          </button>
        </div>
      </div>

      <div className={`flex flex-col gap-[10px] ${isEdit ? "" : "hidden"}`}>
        <h3 className="font-bold">Edit skill: </h3>
        <div className="flex justify-between gap-[10px]">
          <input
            type="text"
            value={editSkillsValue}
            className="rounded-[8px] placeholder:text-[14px] border-gray-300 dark:bg-[#3a3b3c] w-full"
            onChange={(e) => handleOnChangeEditSkills(e)}
            ref={editRef}
          />
          <button
            className="px-[20px] bg-green-600 text-white rounded-[6px] text-[14px] hover:scale-105 transition"
            onClick={() => handleUpdateSkill(editSkillsValue, skillId)}
          >
            Save
          </button>
        </div>
      </div>

      <Dialog
        PaperProps={{
          style: {
            borderRadius: "8px",
            maxWidth: "1200px",
            userSelect: "none",
          }
        }}
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"xl"}
        fullScreen={fullScreen}
        style={{
          display: recycleData?.length == 0 ? "none" : "",
        }}

      > 
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
          className="dark:bg-darkSemi dark:text-white"
        >
          Skills recycle bin
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          className="dark:text-white  dark:hover:bg-darkHover"
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers className="dark:bg-dark p-0 scrollbar-hide">
          <div className="flex flex-col gap-[4px] dark:text-white select-none">
            {recycleData?.map((item, index) => {
              return (
                <div key={index} className="p-0 lg:px-[10px]">
                  <div className="flex flex-row justify-between w-screen md:w-[800px] lg:w-[900px] xl:w-[1100px] px-[10px] py-[8px] border-b-2 ">
                    <p className="font-semibold"> {item.name}</p>
                    <div className="flex flex-row gap-[10px] items-center">
                      <p className="italic text-[12px] dark:text-slate-300 hidden lg:block">
                        Delete at: {new Date(item.deletedAt).toUTCString()}{" "}
                      </p>
                      <button
                        className="border-[1px] dark:border-dark px-[4px] rounded-[5px] text-[12px] bg-blue-400 dark:bg-blue-600 text-white hover:scale-105 transition flex flex-row items-center gap-[4px]"
                        onClick={() => handleRestoreSkill(item, false)}
                      >
                        <MdRecycling />
                        Restore
                      </button>
                      <button
                        className="border-[1px] dark:border-dark px-[4px] rounded-[5px] text-[12px] bg-red-500 dark:bg-red-700 text-white hover:scale-105 transition flex flex-row gap-[4px] items-center"
                        onClick={() => handleDeleteSkillOutOfDB(item, true)}
                      >
                        <BsDatabaseFillDash />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
        <DialogActions className="dark:bg-darkSemi">
          <Button autoFocus onClick={() => {handleRestoreAll()}} className="dark:text-white">
            Restore all
          </Button>
          <Button autoFocus onClick={() => {setOpenAlert(true)}} className="dark:text-white">
            Delete all
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        PaperProps={{
          style:{
            borderRadius: "8px",
            backgroundColor: isDarkMode ? "#18191a" : "white",
            userSelect: "none"
          }
        }}
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="dark:text-red-600 text-red-500 font-bold">
          {"Deleting all skill alert!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className="dark:text-white">
          Are you sure you want to delete everything in recycle?? If you agree, all data will be lost and cannot be recovered! Click disargree to cancel the delete all request.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenAlert(false);
          }} className="hover:text-green-400">Disagree</Button>
          <Button onClick={() => {
            handleDeleteAll()
          }} autoFocus className="hover:text-red-500">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Skills;
