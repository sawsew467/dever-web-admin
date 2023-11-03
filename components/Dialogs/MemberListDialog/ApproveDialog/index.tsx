import { RootState } from "@/redux/store";
import { memberPros } from "@/ultils/types";
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

import React from "react";
import { useSelector } from "react-redux";
import { IoMdAlert } from "react-icons/io";
import Image from "next/image";

type TProps = {
  openDialogToApprove: boolean;
  setOpenDialogToApprove: (bool: boolean) => void;
  selectedMembers: memberPros[];
  handleApproveSelectedMembers: () => void;
  handleCloseApproveDialog: () => void;
};

function ApproveDialog({
  openDialogToApprove,
  setOpenDialogToApprove,
  selectedMembers,
  handleApproveSelectedMembers,
  handleCloseApproveDialog,
}: TProps): JSX.Element {
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const approveAbleUser = selectedMembers.filter(
    (item) => item.status == "Pending"
  );

  return (
    <div>
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: isDarkMode ? "#18191a" : "",
            borderRadius: "8px",
            userSelect: "none",
          },
        }}
        fullScreen={fullScreen}
        open={openDialogToApprove}
        onClose={() => setOpenDialogToApprove(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="dark:text-blue-500 text-blue-600 font-bold flex items-center gap-[8px]"
        >
          <IoMdAlert />
          {"Reminder!"}
        </DialogTitle>
        <DialogContent>
          {approveAbleUser.length == 0 ? (
            <p className="dark:text-white dark:font-semibold">{`The ${
              selectedMembers.length <= 1
                ? "user you selected is"
                : "users you selected are"
            }  not able to approve!`}</p>
          ) : (
            <div className="flex flex-col gap-[10px]">
              <p className="dark:text-white dark:font-semibold">
                {`There  ${approveAbleUser!.length <= 1 ? "is" : "are"} ${
                  approveAbleUser!.length <= 1
                    ? "only one"
                    : approveAbleUser!.length
                } ${
                  approveAbleUser!.length <= 1
                    ? "user account"
                    : "users accounts"
                }  that you can approve: `}
              </p>
              <div className="max-h-[640px] overflow-y-scroll grid grid-cols-2 items-center justify-center flex-col gap-[10px] scrollbar-hide">
                {approveAbleUser.map((item, index) => (
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
                        className="w-full h-full object-cover"
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
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <MUIButton autoFocus onClick={handleCloseApproveDialog}>
            <p className="hover:text-green-600">Cancel</p>
          </MUIButton>
          {approveAbleUser.length == 0 ? null : (
            <MUIButton
              onClick={() => {
                handleApproveSelectedMembers();
              }}
              autoFocus
            >
              <p className="hover:text-green-600">
                Approve {`${approveAbleUser!.length <= 1 ? "" : "all"}`}
              </p>
            </MUIButton>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ApproveDialog;
