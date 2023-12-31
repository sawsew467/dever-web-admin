"use client";
import React, { useState } from "react";
import Image from "next/image";
import avatar from "@image/page/member/list/Fu-dever.png";
import Link from "next/link";

import Button from "@component/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { approveUser, rejectUser } from "@/apis/appUser";
import { deleteMemberInfo } from "@/apis/profile";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Button as MUIButton } from "@mui/material/";
import UnlinkButton from "../UnlinkButton";
import { getCookie } from "cookies-next";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { PiWarningFill } from "react-icons/pi";
import { useRouter } from "next/navigation";

interface memberPros {
  id: string;
  fullName: string;
  avatarUrl: string;
  email: string;
  position: string;
  department: string;
  status: string;
  isSelected: boolean;
}

interface IPros {
  value: memberPros;
  selecteFunct: (id: string) => void;
  refreshApi: () => void;
  getAllRemovedMember: () => void;
}

function MemberItem({ value, selecteFunct, refreshApi, getAllRemovedMember }: IPros) {
  const handleCheckboxChange = () => {
    selecteFunct(value.id);
  };
  const userRole = useSelector(
    (state: RootState) => state.userInfor.currentUser.role
  );
  const [isClickPending, setIsClickPending] = useState<boolean>(false);
  const [isClickReject, setIsClickReject] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);
  const route = useRouter();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleApproveUser = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await approveUser(value.id, access_token);
        // console.log(response);
        toast.success(`Approved user ${value.email} successfully!`);
        refreshApi();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);

        toast.error(error?.response?.data?.errorMessages[0]);
      }
    }
  };
  const handleRejectUser = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await rejectUser(value.id, access_token);
        // console.log(response);
        toast.success(`Rejected user with email: ${value.email}`);
        refreshApi();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        toast.error(error?.response?.data?.errorMessages[0]);
      }
    }
  };

  const handleDeleteUser = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await deleteMemberInfo(value.id, access_token);
        // console.log(response);
        toast.success(`Removed user ${value.email} successfully!`);
        refreshApi();
      }
      setOpenDialog(false);
      getAllRemovedMember();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setOpenDialog(false);
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="flex justify-between border-b-2 dark:border-darkHover h-[78px] ">
      <div className="flex">
        <div className="w-[48px] flex items-center justify-center">
          <input
            type="checkbox"
            value=""
            id={value.id.toString()}
            checked={value.isSelected}
            onChange={() => handleCheckboxChange()}
            className="outline-none border-1 border-slate-200 rounded-[4px] focus:ring-offset-[shadow] cursor-pointer"
          />
        </div>
        {/*Name*/}
        <div className="w-[68px] flex items-center justify-center text-[12px] uppercase">
          <div className="w-[40px] h-[40px] rounded-[50%] overflow-hidden object-cover">
            <Image
              src={value.avatarUrl === "" ? avatar : value.avatarUrl}
              alt="avatar"
              width={1200}
              height={1200}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="flex flex-col w-[276px] pt-[16px] px-[16px] text-[12px] select-text">
          <h3 className="text-[16px] font-[600] dark:text-white dark:font-bold">
            {value.fullName.trim() == "" ? value.email : value.fullName}
          </h3>
          <p className="text-[14px] dark:text-gray-100">{value.email}</p>
        </div>
        {/* position */}
        <div className="w-[200px] flex p-[16px] items-center text-[16px] font-[600] dark:text-white">
          <p>{value.position == "" ? "empty" : value.position}</p>
        </div>
        {/* department */}
        <div className="w-[180px] flex p-[16px] items-center text-[14px] font-[600] dark:text-white">
          <p>{value.department == "" ? "empty" : value.department}</p>
        </div>
        {/* status */}
        <div className="w-[100px] flex p-[16px] items-center text-[12px] relative">
          <p
            className={`py-[2px] px-[10px]  rounded-[6px] font-[500]
                ${
                  value.status === "Approved"
                    ? "bg-primaryGreenBland dark:shadow-darkPrimaryGreen text-green-800"
                    : value.status === "Pending"
                    ? "bg-primaryYellowBland text-primaryBrown cursor-pointer"
                    : "bg-primaryRedBland text-primaryRed"
                }`}
            onClick={() => {
              if (value.status === "Pending") {
                setIsClickPending(!isClickPending);
              }
              if (value.status === "Rejected") {
                setIsClickReject(!isClickReject);
              }
            }}
          >
            {value.status === "Approved" ? "Active" : value.status}
          </p>
          {value.status === "Pending" && isClickPending ? (
            <div className="flex flex-col ml-[10px] shadow-primary rounded-md bg-white dark:bg-dark dark:text-white dark:shadow-darkPrimary">
              <p
                className="font-[600] px-[6px] py-[4px] cursor-pointer hover:bg-green-200 hover:text-green-700 text-center rounded-t-[4px]"
                onClick={() => {
                  setIsClickPending(false);
                  handleApproveUser();
                }}
              >
                Approve
              </p>
              <p
                className="font-[600] px-[6px] py-[4px] cursor-pointer hover:bg-red-300 hover:text-red-700 text-center rounded-b-[4px]"
                onClick={() => {
                  setIsClickPending(false);
                  handleRejectUser();
                }}
              >
                Reject
              </p>
            </div>
          ) : null}

        </div>
      </div>

      <Dialog
        PaperProps={{
          style: {
            backgroundColor: isDarkMode ? "#18191a" : "",
            borderRadius: "8px",
            userSelect: "none"
          },
        }}
        fullScreen={fullScreen}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="dark:text-red-600 text-red-500 font-bold flex items-center gap-[8px]"
        >
          <PiWarningFill />
          {"Warning!"}
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-[8px]">
            <p className="dark:text-white dark:font-semibold">This user will not be able to log in to the system: </p>
            <div className="flex items-center justify-center">
              <div className="flex flex-row gap-[10px] border-2 px-[8px] py-[8px] rounded-[10px] dark:border-darkHover">
                <div className="w-[48px] h-[48px] rounded-[50%] overflow-hidden">
                  <Image
                    src={value?.avatarUrl!}
                    alt="user_avatar"
                    width={1200}
                    height={600}
                    className="w-full h-full object-cover"
                  ></Image>
                </div>
                <div className="dark:text-white">
                  <h3 className="text-[16px] font-[600] dark:text-white dark:font-bold">
                    {value?.fullName.trim() == ""
                      ? value?.email
                      : value?.fullName}
                  </h3>
                  <p className="text-[14px] dark:text-gray-100">
                    {value?.email}
                  </p>
                </div>
              </div>
            </div>
            <p className="dark:text-white dark:font-semibold">Make sure you want to remove!</p>
          </div>
        </DialogContent>
        <DialogActions>
          <MUIButton autoFocus onClick={handleClose}>
            <p className="hover:text-green-600">Cancle</p>
          </MUIButton>
          <MUIButton onClick={handleDeleteUser} autoFocus>
            <p className="hover:text-red-600">Remove</p>
          </MUIButton>
        </DialogActions>
      </Dialog>
  

      <div className="flex h-[78px]">
        {userRole === "admin" ? (
          <div className="flex gap-[16px] justify-center items-center p-[16px]">
            <UnlinkButton
              method={() => {
                route.push(`/members/setting/${value.id}`)
              }}
              icon="edit"
              backgroundColor="bg-blue-700"
              iconPosition="left"
              textContent="Edit"
              tailwind="text-white dark:shadow-darkPrimaryBlue"
            ></UnlinkButton>
            <UnlinkButton
              method={handleClickOpen}
              icon="delete"
              backgroundColor="bg-red-700"
              iconPosition="left"
              textContent="Remove"
              tailwind="text-white dark:shadow-darkPrimaryRed"
            ></UnlinkButton>
          </div>
        ) : null}
        <div className="p-[16px] flex justify-center items-center text-primaryBlue text-[16px] dark:font-semibold dark:text-sky-500">
          <Link href={`/members/profile/${value.id}`}>View Profile</Link>
        </div>
      </div>
    </div>
  );
}

export default MemberItem;

