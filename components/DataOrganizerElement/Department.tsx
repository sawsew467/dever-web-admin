import {
  DialogContentText,
  LinearProgress,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { BsDatabaseFillDash } from "react-icons/bs";
import { MdRecycling } from "react-icons/md";

import { RootState } from "@/redux/store";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { deleteDepartment, deleteDepartmentOutOfDB, getALlSoftDeleteDepartments, getAllDepartment, patchDepartment, postDepartment, restoreDepartment } from "@/apis/dataOrganizer";

type TDepartment = {
  id: string;
  name: string;
};
type TDepartmentRecycle = {
  id: string;
  name: string;
  deletedAt: string;
  deletedBy: string;
};

function Departments() {
  const [open, setOpen] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);

  const [editDepartmentValue, setEditDepartmentValue] = useState<string>("");
  const editRef = useRef<HTMLInputElement | null>(null);
  const [isFetchData, setIsFetchData] = useState<boolean>(true);
  const handleOnChangeEditDepartment = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditDepartmentValue(event.target.value);
  };
  const [inputDepartmentsValue, setInputDepartmentsValue] = useState<string>("");

  const handleOnChangeInputDepartment = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputDepartmentsValue(event.target.value);
  };
  const [departmentsData, setDepartmentsData] = useState<TDepartment[]>([]);
  const [recycleData, setRecycleData] = useState<TDepartmentRecycle[]>([]);
  const handleGetAllDepartments = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await getAllDepartment(access_token);
        const data = response.data.body;
        const filtedData = data
          .filter((item: TDepartment) => item.name !== "")
          .filter((item: TDepartmentRecycle) => item.name.toLowerCase() !== "default");
        setDepartmentsData(filtedData);
        setIsFetchData(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Get all departments failded!");
      }
    }
  };
  const handleGetAllSoftDeleted = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await getALlSoftDeleteDepartments(access_token);
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
    handleGetAllDepartments();
    handleGetAllSoftDeleted();
  }, []);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [departmentId, setDepartmentId] = useState<string>("");
  const handleEdit = (item: TDepartment) => {
    setEditDepartmentValue(item.name);
    setIsEdit(true);
    setDepartmentId(item.id);
    if (editRef.current) {
      editRef.current.focus();
    }
  };
  const handleAddDepartment = async (value: string) => {
    try {
      const access_token = getCookie("accessToken");
      const postValue = {
        departmentName: value,
      };
      if (access_token) {
        await postDepartment(access_token, postValue);
        toast.success(`Add department with value: "${value}" successfully!`);
        setInputDepartmentsValue("");
        handleGetAllDepartments();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (value.length == 0) {
          toast.warning(`Can add empty value`);
        } else {
          toast.error(`Add department with value: "${value}" failed!`);
        }
      }
    }
  };
  const handleUpdateDepartment = async (value: string, itemId: string) => {
    try {
      const access_token = getCookie("accessToken");
      const updateValue = {
        newName: value,
      };
      if (access_token) {
        await patchDepartment(access_token, updateValue, itemId);
        toast.success(`Update department with value: "${value}" successfully!`);
        handleGetAllDepartments();
        setIsEdit(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Update department with value: "${value}" failed!`);
      }
    }
  };
  const handleDeleteDepartment = async (item: TDepartment) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        await deleteDepartment(access_token, item.id);
        toast.success(`Removed department with value: "${item.name}"successfully!`);
        handleGetAllDepartments();
        handleGetAllSoftDeleted();
        setOpen(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Remove department with value: "${item.name}" failed!`);
      }
    }
  };
  const handleDeleteDepartmentOutOfDB = async (
    item: TDepartmentRecycle,
    all: boolean
  ) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        await deleteDepartmentOutOfDB(access_token, item.id!);
        if (!all) {
          toast.success(
            `Deleted department with value: "${item.name}"successfully!`
          );
        }
        handleGetAllDepartments();
        handleGetAllSoftDeleted();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Deleting department with value: "${item.id!}" failed!`);
      }
    }
  };
  const handleRestoreDepartment = async (item: TDepartmentRecycle, all: boolean) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        await restoreDepartment(access_token, item.id!);
        if (!all) {
          toast.success(
            `Restore department with value: "${item.name}"successfully!`
          );
        }
        handleGetAllDepartments();
        handleGetAllSoftDeleted();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        toast.error(`Restore department with value: "${item.id!}" failed!`);
      }
    }
  };
  const handleRestoreAll = () => {
    recycleData?.forEach((item) => handleRestoreDepartment(item, true));
    setOpen(false);
  };
  const handleDeleteAll = () => {
    recycleData.forEach((item) => handleDeleteDepartmentOutOfDB(item, true));
    setOpenAlert(false);
  };

  return (
    <div className="dark:shadow-darkPrimary shadow-primary rounded-[10px] p-[20px] flex flex-col gap-[10px] dark:text-white">
      <div className="flex flex-row justify-between items-center">
        <h3 className="font-[700] text-[24px]">Departments</h3>
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
        <div className="flex flex-row justify-between">
          <h3 className="font-bold">All departments in database:</h3>
          <h3>Total: {departmentsData.length}</h3>
        </div>

        <ul className="flex flex-col gap-[10px] max-h-[420px] overflow-y-scroll scrollbar-hide p-[4px]">
          {departmentsData?.length == 0 ? (
            <div>Empty</div>
          ) : departmentsData && !isFetchData ? (
            departmentsData.map((item: TDepartment, index: number) => (
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
                    onClick={() => handleDeleteDepartment(item)}
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
        <h3 className="font-bold">Add department: </h3>
        <div className="flex justify-between gap-[10px]">
          <input
            type="text"
            value={inputDepartmentsValue}
            placeholder="Enter new department..."
            className="rounded-[8px] placeholder:text-[14px] placeholder:dark:text-slate-400 border-gray-300 dark:bg-[#3a3b3c] w-full"
            onChange={(e) => handleOnChangeInputDepartment(e)}
          />
          <button
            className="px-[20px] bg-blue-600 text-white rounded-[6px] text-[14px] hover:scale-105 transition"
            onClick={() => handleAddDepartment(inputDepartmentsValue)}
          >
            Add
          </button>
        </div>
      </div>

      <div className={`flex flex-col gap-[10px] ${isEdit ? "" : "hidden"}`}>
        <h3 className="font-bold">Edit department: </h3>
        <div className="flex justify-between gap-[10px]">
          <input
            type="text"
            value={editDepartmentValue}
            className="rounded-[8px] placeholder:text-[14px] border-gray-300 dark:bg-[#3a3b3c] w-full"
            onChange={(e) => handleOnChangeEditDepartment(e)}
            ref={editRef}
          />
          <button
            className="px-[20px] bg-green-600 text-white rounded-[6px] text-[14px] hover:scale-105 transition"
            onClick={() => handleUpdateDepartment(editDepartmentValue, departmentId)}
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
          },
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
          Majors recycle bin
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
                        Deleted at:  {new Date(item.deletedAt).toLocaleString()}
                      </p>
                      <button
                        className="border-[1px] dark:border-dark px-[4px] py-[5px] rounded-[5px] text-[12px] bg-blue-400 dark:bg-blue-600 text-white hover:scale-105 transition flex flex-row items-center gap-[4px]"
                        onClick={() => handleRestoreDepartment(item, false)}
                      >
                        <MdRecycling />
                        <p>Restore</p>
                      </button>
                      <button
                        className="border-[1px] dark:border-dark px-[4px] py-[5px] rounded-[5px] text-[12px] bg-red-500 dark:bg-red-700 text-white hover:scale-105 transition flex flex-row gap-[4px] items-center"
                        onClick={() => handleDeleteDepartmentOutOfDB(item, false)}
                      >
                        <BsDatabaseFillDash />
                        <p>Delete</p>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
        <DialogActions className="dark:bg-darkSemi">
          <Button
            autoFocus
            onClick={() => {
              handleRestoreAll();
            }}
            className="dark:text-white"
          >
            Restore all
          </Button>
          <Button
            autoFocus
            onClick={() => {
              setOpenAlert(true);
            }}
            className="dark:text-white"
          >
            Delete all
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        PaperProps={{
          style: {
            borderRadius: "8px",
            backgroundColor: isDarkMode ? "#18191a" : "white",
            userSelect: "none",
          },
        }}
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="dark:text-red-600 text-red-500 font-bold"
        >
          {"Deleting all hobbies alert!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="dark:text-white"
          >
            Are you sure you want to delete everything in recycle?? If you
            agree, all data will be lost and cannot be recovered! Click
            disargree to cancel the delete all request.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenAlert(false);
            }}
            className="hover:text-green-400"
          >
            Disagree
          </Button>
          <Button
            onClick={() => {
              handleDeleteAll();
            }}
            autoFocus
            className="hover:text-red-500"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Departments;
