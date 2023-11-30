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
import { deletePosition, deletePositionOutOfDB, getALlSoftDeletePositions, getAllPosition, patchPosition, postPosition, restorePosition } from "@/apis/dataOrganizer";


type TPosition = {
  id: string;
  name: string;
};
type TPositionRecycle = {
  id: string;
  name: string;
  deletedAt: string;
  deletedBy: string;
};

function Positions() {
  const [open, setOpen] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);

  const [editPositionValue, setEditPositionValue] = useState<string>("");
  const editRef = useRef<HTMLInputElement | null>(null);
  const [isFetchData, setIsFetchData] = useState<boolean>(true);
  const handleOnChangeEditPosition = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditPositionValue(event.target.value);
  };
  const [inputPositionsValue, setInputPositionsValue] = useState<string>("");

  const handleOnChangeInputPosition = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputPositionsValue(event.target.value);
  };
  const [positionsData, setPositionsData] = useState<TPosition[]>([]);
  const [recycleData, setRecycleData] = useState<TPositionRecycle[]>([]);
  const handleGetAllPositions = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await getAllPosition(access_token);
        const data = response.data.body;
        const filtedData = data
          .filter((item: TPosition) => item.name !== "")
          .filter((item: TPosition) => item.name.toLowerCase() !== "default");
        setPositionsData(filtedData);
        setIsFetchData(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Get all positions failded!");
      }
    }
  };
  const handleGetAllSoftDeleted = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await getALlSoftDeletePositions(access_token);
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
    handleGetAllPositions();
    handleGetAllSoftDeleted();
  }, []);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [positionId, setPositionId] = useState<string>("");
  const handleEdit = (item: TPosition) => {
    setEditPositionValue(item.name);
    setIsEdit(true);
    setPositionId(item.id);
    if (editRef.current) {
      editRef.current.focus();
    }
  };
  const handleAddPosition = async (value: string) => {
    try {
      const access_token = getCookie("accessToken");
      const postValue = {
        positionName: value,
      };
      if (access_token) {
        await postPosition(access_token, postValue);
        toast.success(`Add position with value: "${value}" successfully!`);
        setInputPositionsValue("");
        handleGetAllPositions();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (value.length == 0) {
          toast.warning(`Can add empty value`);
        } else {
          toast.error(`Add position with value: "${value}" failed!`);
        }
      }
    }
  };
  const handleUpdatePosition = async (value: string, itemId: string) => {
    try {
      const access_token = getCookie("accessToken");
      const updateValue = {
        newName: value,
      };
      if (access_token) {
        await patchPosition(access_token, updateValue, itemId);
        toast.success(`Update position with value: "${value}" successfully!`);
        handleGetAllPositions();
        setIsEdit(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Update position with value: "${value}" failed!`);
      }
    }
  };
  const handleDeletePosition = async (item: TPosition) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        await deletePosition(access_token, item.id);
        toast.success(`Removed position with value: "${item.name}"successfully!`);
        handleGetAllPositions();
        handleGetAllSoftDeleted();
        setOpen(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Remove position with value: "${item.name}" failed!`);
      }
    }
  };
  const handleDeletePositionOutOfDB = async (
    item: TPositionRecycle,
    all: boolean
  ) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        await deletePositionOutOfDB(access_token, item.id!);
        if (!all) {
          toast.success(
            `Deleted position with value: "${item.name}"successfully!`
          );
        }
        handleGetAllPositions();
        handleGetAllSoftDeleted();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Deleting position with value: "${item.id!}" failed!`);
      }
    }
  };
  const handleRestorePosition = async (item: TPositionRecycle, all: boolean) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        await restorePosition(access_token, item.id!);
        if (!all) {
          toast.success(
            `Restore position with value: "${item.name}"successfully!`
          );
        }
        handleGetAllPositions();
        handleGetAllSoftDeleted();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        toast.error(`Restore position with value: "${item.id!}" failed!`);
      }
    }
  };
  const handleRestoreAll = () => {
    recycleData?.forEach((item) => handleRestorePosition(item, true));
    setOpen(false);
  };
  const handleDeleteAll = () => {
    recycleData.forEach((item) => handleDeletePositionOutOfDB(item, true));
    setOpenAlert(false);
  };

  return (
    <div className="dark:shadow-darkPrimary shadow-primary rounded-[10px] p-[20px] flex flex-col gap-[10px] dark:text-white">
      <div className="flex flex-row justify-between items-center">
        <h3 className="font-[700] text-[24px]">Positions</h3>
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
          <h3 className="font-bold">All positions in database:</h3>
          <h3>Total: {positionsData.length}</h3>
        </div>

        <ul className="flex flex-col gap-[10px] max-h-[420px] overflow-y-scroll scrollbar-hide p-[4px]">
          {positionsData?.length == 0 ? (
            <div>Empty</div>
          ) : positionsData && !isFetchData ? (
            positionsData.map((item: TPosition, index: number) => (
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
                    onClick={() => handleDeletePosition(item)}
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
        <h3 className="font-bold">Add position: </h3>
        <div className="flex justify-between gap-[10px]">
          <input
            type="text"
            value={inputPositionsValue}
            placeholder="Enter new position..."
            className="rounded-[8px] placeholder:text-[14px] placeholder:dark:text-slate-400 border-gray-300 dark:bg-[#3a3b3c] w-full"
            onChange={(e) => handleOnChangeInputPosition(e)}
          />
          <button
            className="px-[20px] bg-blue-600 text-white rounded-[6px] text-[14px] hover:scale-105 transition"
            onClick={() => handleAddPosition(inputPositionsValue)}
          >
            Add
          </button>
        </div>
      </div>

      <div className={`flex flex-col gap-[10px] ${isEdit ? "" : "hidden"}`}>
        <h3 className="font-bold">Edit position: </h3>
        <div className="flex justify-between gap-[10px]">
          <input
            type="text"
            value={editPositionValue}
            className="rounded-[8px] placeholder:text-[14px] border-gray-300 dark:bg-[#3a3b3c] w-full"
            onChange={(e) => handleOnChangeEditPosition(e)}
            ref={editRef}
          />
          <button
            className="px-[20px] bg-green-600 text-white rounded-[6px] text-[14px] hover:scale-105 transition"
            onClick={() => handleUpdatePosition(editPositionValue, positionId)}
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
          Positions recycle bin
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
                        Deleted at: {new Date(item.deletedAt).toLocaleString()}{" "}
                      </p>
                      <button
                        className="border-[1px] dark:border-dark px-[4px] py-[5px] rounded-[5px] text-[12px] bg-blue-400 dark:bg-blue-600 text-white hover:scale-105 transition flex flex-row items-center gap-[4px]"
                        onClick={() => handleRestorePosition(item, false)}
                      >
                        <MdRecycling />
                        <p>Restore</p>
                      </button>
                      <button
                        className="border-[1px] dark:border-dark px-[4px] py-[5px] rounded-[5px] text-[12px] bg-red-500 dark:bg-red-700 text-white hover:scale-105 transition flex flex-row gap-[4px] items-center"
                        onClick={() => handleDeletePositionOutOfDB(item, false)}
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

export default Positions;
