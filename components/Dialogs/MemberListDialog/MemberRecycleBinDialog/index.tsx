import { RootState } from "@/redux/store";
import { memberPros, memberType } from "@/ultils/types";
import Image from "next/image";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Button as MUIButton } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

import React from "react";
import { useSelector } from "react-redux";
import { MdOpenInNew, MdRecycling } from "react-icons/md";
import { useRouter } from "next/navigation";
import { BsDatabaseFillDash } from "react-icons/bs";

type TProps = {
  setOpenDialogToRecycle: (bool: boolean) => void;
  openDialogToRecycle: boolean;
  removedUsers: memberPros[];
  handleRestoreUser: (item: memberPros, isNeedToast: boolean) => void;
  setOpenDialogToDeleteOneUser: (bool: boolean) => void;
  setOpenDialogToDeleteAllRemovedUser: (bool: boolean) => void;
  setDeleteUser: (item: memberType) => void;
  handleRestoreAllUser: () => void;
};

function MemberRecycleBinDialog({
  setOpenDialogToRecycle,
  openDialogToRecycle,
  removedUsers,
  handleRestoreUser,
  setDeleteUser,
  setOpenDialogToDeleteOneUser,
  handleRestoreAllUser,
  setOpenDialogToDeleteAllRemovedUser,
}: TProps): JSX.Element {
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  return (
    <div>
      <Dialog
        onClose={() => setOpenDialogToRecycle(false)}
        aria-labelledby="customized-dialog-title"
        open={openDialogToRecycle}
        fullScreen={fullScreen}
        PaperProps={{
          style: {
            backgroundColor: isDarkMode ? "#282828" : "",
            color: isDarkMode ? "white" : "",
            borderRadius: "8px",
            maxWidth: "1200px",
            userSelect: "none",
          },
        }}
        style={{
          display: removedUsers.length == 0 ? "none" : "",
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Member recycle bin
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenDialogToRecycle(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          dividers
          className="dark:border-darkHover dark:border-y-2 flex flex-col gap-[10px] scrollbar-hide"
        >
          {removedUsers.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-row gap-[10px] border-b-2 dark:border-darkHover pb-[8px]"
              >
                <div className="w-[48px] h-[48px] rounded-[50%] overflow-hidden">
                  <Image
                    src={item.avatarUrl}
                    alt="user_avatar"
                    width={1200}
                    height={600}
                    className="w-full h-full object-cover"
                  ></Image>
                </div>
                <div className="w-[320px]">
                  <h3 className="text-[16px] font-[600] dark:text-white dark:font-bold flex items-center gap-[8px]">
                    {item.fullName.trim() == "" ? item.email : item.fullName}
                    <MdOpenInNew
                      className="cursor-pointer"
                      onClick={() => {
                        router.push(`/members/profile/${item.id}`);
                      }}
                    />
                  </h3>
                  <p className="text-[14px] dark:text-gray-100">{item.email}</p>
                </div>

                <div className="flex items-center w-[80px]">
                  <p
                    className={`px-[10px] text-[12px] font-[500] py-[2px] rounded-[6px] bg-green-500 ${
                      item.status === "Approved"
                        ? "bg-primaryGreenBland dark:shadow-darkPrimaryGreen text-green-800"
                        : item.status === "Pending"
                        ? "bg-primaryYellowBland text-primaryBrown cursor-pointer"
                        : "bg-primaryRedBland text-primaryRed"
                    }`}
                  >
                    {item.status === "Approved" ? "Active" : item.status}
                  </p>
                </div>

                <div className="flex flex-row items-center gap-[10px]">
                  <button
                    className="px-[12px] py-[6px] dark:shadow-darkPrimaryGreen bg-green-600 rounded-[8px] font-[500] text-white flex items-center gap-[4px]"
                    onClick={() => handleRestoreUser(item, true)}
                  >
                    <MdRecycling />
                    Restore
                  </button>
                  <button
                    className="px-[12px] py-[6px] dark:shadow-darkPrimaryRed bg-red-700 rounded-[8px] font-[500] text-white flex items-center gap-[4px]"
                    onClick={() => {
                      setOpenDialogToDeleteOneUser(true);
                      setDeleteUser(item);
                    }}
                  >
                    <BsDatabaseFillDash />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </DialogContent>
        <DialogActions>
          <MUIButton
            autoFocus
            onClick={() => {
              setOpenDialogToRecycle(false);
              handleRestoreAllUser();
            }}
            className="hover:text-green-500"
          >
            {`Restore ${removedUsers.length <= 1 ? "" : "all"}`}
          </MUIButton>
          <MUIButton
            autoFocus
            onClick={() => {
              //   setOpenDialogToRecycle(false);
              setOpenDialogToDeleteAllRemovedUser(true);
            }}
            className="hover:text-red-500"
          >
            {`Delete ${removedUsers.length <= 1 ? "" : "all"}`}
          </MUIButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MemberRecycleBinDialog;
