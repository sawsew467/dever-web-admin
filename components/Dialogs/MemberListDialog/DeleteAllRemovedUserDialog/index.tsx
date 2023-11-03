import React from "react";
import { RootState } from "@/redux/store";
import { memberPros, memberType } from "@/ultils/types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Button as MUIButton } from "@mui/material/";
import Image from "next/image";
import { PiWarningFill } from "react-icons/pi";
import { useSelector } from "react-redux";

type TProps = {
  openDialogToDeleteAllRemovedUser: boolean;
  setOpenDialogToDeleteAllRemovedUser: (bool: boolean) => void;
  removedUsers: memberPros[];
  handleDeleteAllRemovedUser: () => void;
};

function DeleteAllRemovedUserDialog({
  openDialogToDeleteAllRemovedUser,
  setOpenDialogToDeleteAllRemovedUser,
  removedUsers,
  handleDeleteAllRemovedUser
}: TProps): JSX.Element {
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  
  return (
    <div>
      <Dialog
        PaperProps={{
          style: {
            borderRadius: "8px",
            backgroundColor: isDarkMode ? "#18191a" : "white",
            userSelect: "none",
            maxWidth: "1200px"
          },
        }}
        open={openDialogToDeleteAllRemovedUser}
        onClose={() => setOpenDialogToDeleteAllRemovedUser(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="dark:text-red-600 text-red-500 font-bold flex items-center gap-[8px]"
        >
          <PiWarningFill />
          {"Warning!"}
        </DialogTitle>
        <DialogContent className="scrollbar-hide">
          <div className="flex flex-col gap-[10px] scrollbar-hide">
            <p className="dark:text-white dark:font-semibold">
              {`Make user you want to delete user${
                removedUsers.length <= 1 ? "" : "s"
              }:`}
            </p>
            <div className="max-h-[640px] overflow-y-scroll grid grid-cols-2 items-center justify-center flex-col gap-[10px] scrollbar-hide">
              {removedUsers.map((item, index) => (
                <div
                  className="flex flex-row gap-[10px] border-2 px-[8px] py-[8px] rounded-[10px] dark:border-darkHover"
                  key={index}
                >
                  <div className="w-[48px] h-[48px] rounded-[50%] overflow-hidden">
                    <Image
                      src={item?.avatarUrl!}
                      alt="user_avatar"
                      width={1200}
                      height={600}
                      className="w-[48px] h-[48px] object-cover"
                    ></Image>
                  </div>
                  <div className="dark:text-white">
                    <h3 className="text-[16px] font-[600] dark:text-white dark:font-bold">
                      {item?.fullName.trim() == ""
                        ? item?.email
                        : item?.fullName}
                    </h3>
                    <p className="text-[14px] dark:text-gray-100">
                      {item?.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p className="dark:text-white dark:font-semibold">
                {`${removedUsers.length <=1 ? "This user" : "These users"} will not exist in the system data after you delete it!`}
              </p>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <MUIButton
            onClick={() => {
                setOpenDialogToDeleteAllRemovedUser(false);
            }}
            className="hover:text-green-400"
          >
            Cancle
          </MUIButton>
          <MUIButton
            onClick={() => {
                handleDeleteAllRemovedUser()
                setOpenDialogToDeleteAllRemovedUser(false);
            }}
            autoFocus
            className="hover:text-red-500"
          >
            {`${removedUsers.length <= 1 ? "Delete" : "Delete all"}`}
          </MUIButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteAllRemovedUserDialog;
