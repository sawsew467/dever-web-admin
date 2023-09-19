"use client";
import React, { useState } from "react";
import Image from "next/image";
import avatar from "@image/page/member/list/Thang.png";
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

interface memberPros {
  id: string;
  fullname: string;
  avatarUrl: string;
  email: string;
  position: string;
  department: string;
  status: {
    value: string;
  };
  isSelected: boolean;
}

interface IPros {
  value: memberPros;
  selecteFunct: (id: string) => void;
  refreshApi: () => void;
}

function MemberItem({ value, selecteFunct, refreshApi }: IPros) {
  const handleCheckboxChange = () => {
    selecteFunct(value.id);
  };
  const userRole = useSelector(
    (state: RootState) => state.userInfor.currentUser.UserRole
  );
  const [isClickPending, setIsClickPending] = useState<boolean>(false);
  const [isClickReject, setIsClickReject] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
        console.log(response);
        toast.success(`Approved user ${value.email} successfully!`);
        refreshApi();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);

        toast.error("Approval failed!");
      }
    }
  };
  const handleRejectUser = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await rejectUser(value.id, access_token);
        console.log(response);
        toast.success(`Rejected user with email: ${value.email}`);
        refreshApi();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        toast.error("Rejecting failed!");
      }
    }
  };

  const handleDeleteUser = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await deleteMemberInfo(value.id, access_token);
        console.log(response);
        toast.success(`Deleted user ${value.email} successfully!`);
        refreshApi();
      }
      setOpenDialog(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setOpenDialog(false);
        toast.error("Deleting failed!");
      }
    }
  };

  return (
    <div className="flex justify-between border-b-2 h-[78px]">
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
          <div className="w-[32px] h-[32px] rounded-[50%] overflow-hidden object-fill">
            <Image
              src={value.avatarUrl === "" ? avatar : value.avatarUrl}
              alt="avatar"
              width={1200}
              height={600}
            />
          </div>
        </div>
        <div className="flex flex-col w-[276px] pt-[16px] px-[16px] text-[12px]">
          <h3 className="text-[16px] font-[600]">
            {value.fullname == null ? value.email : value.fullname}
          </h3>
          <p className="text-[14px]">{value.email}</p>
        </div>
        {/* position */}
        <div className="w-[200px] flex p-[16px] items-center text-[16px] font-[600]">
          <p>{value.position == '' ? 'empty' : value.position}</p>
        </div>
        {/* department */}
        <div className="w-[180px] flex p-[16px] items-center text-[14px] font-[600]">
          <p>{value.department == '' ? 'empty' : value.department}</p>
        </div>
        {/* status */}
        <div className="w-[100px] flex p-[16px] items-center text-[12px] relative">
          <p
            className={`py-[2px] px-[10px]  rounded-[6px] font-[500] 
                ${
                  value.status.value === "Approved"
                    ? "bg-primaryGreenBland text-green-800"
                    : value.status.value === "Pending"
                    ? "bg-primaryYellowBland text-primaryBrown cursor-pointer"
                    : "bg-primaryRedBland text-primaryRed"
                }`}
            onClick={() => {
              if (value.status.value === "Pending") {
                setIsClickPending(!isClickPending);
              }
              if (value.status.value === "Rejected") {
                setIsClickReject(!isClickReject);
              }
            }}
          >
            {value.status.value === "Approved" ? "Active" : value.status.value}
          </p>
          {value.status.value === "Pending" && isClickPending ? (
            <div className="flex flex-col ml-[10px] shadow-primary rounded-md bg-white">
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
          {value.status.value === "Rejected" && isClickReject ? (
            <div className="flex flex-col ml-[10px] shadow-primary rounded-md bg-white">
              <p
                className="font-[600] px-[6px] py-[4px] cursor-pointer hover:bg-green-200 hover:text-green-700 text-center rounded-t-[4px]"
                onClick={() => {
                  setIsClickReject(false);
                  handleApproveUser();
                }}
              >
                Approve
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleClickOpen}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <p className="text-red-600 font-[600] ">
            Warning about deleting users
          </p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>
              {`Warning about deleting users with email: `}{" "}
              <span className="text-green-600">{`${value.email}`}</span>
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MUIButton autoFocus onClick={handleClose}>
            <p className="hover:text-green-600">Cancle</p>
          </MUIButton>
          <MUIButton onClick={handleDeleteUser} autoFocus>
            <p className="hover:text-red-600">Delete</p>
          </MUIButton>
        </DialogActions>
      </Dialog>

      <div className="flex h-[78px]">
        {userRole === "admin" ? (
          <div className="flex gap-[16px] justify-center items-center p-[16px]">
            <Button
              href={`/members/setting/${value.id}`}
              method={() => {}}
              icon="edit"
              backgroundColor="bg-blue-700"
              iconPosition="left"
              textContent="Edit"
              tailwind="text-white"
            ></Button>
            <UnlinkButton
              method={handleClickOpen}
              icon="delete"
              backgroundColor="bg-red-700"
              iconPosition="left"
              textContent="Delete"
              tailwind="text-white"
            ></UnlinkButton>
          </div>
        ) : null}
        <div className="p-[16px] flex justify-center items-center text-primaryBlue text-[14px]">
          <Link href={`/members/profile/${value.id}`}>View Profile</Link>
        </div>
      </div>
    </div>
  );
}

export default MemberItem;
