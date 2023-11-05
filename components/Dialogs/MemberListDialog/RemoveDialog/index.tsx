import React from "react";
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
import { useSelector } from "react-redux";
import Image from "next/image";
import { PiWarningFill } from "react-icons/pi";

type TProps = {
  openDialogToDelete: boolean;
  setOpenDialogToDelete: (bool: boolean) => void;
  selectedMembers: memberPros[];
  handleCloseDeleteDialog: () => void;
  handleDelectSelectedMembers: () => void;
};

function RemoveDialog({
  openDialogToDelete,
  setOpenDialogToDelete,
  handleCloseDeleteDialog,
  handleDelectSelectedMembers,
  selectedMembers,
}: TProps): JSX.Element {
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div>
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: isDarkMode ? "#18191a" : "",
            borderRadius: "8px",
            maxWidth: "1200px",
            userSelect: "none"
          },
        }}
        fullScreen={fullScreen}
        open={openDialogToDelete}
        onClose={() => setOpenDialogToDelete(false)}
        aria-labelledby="responsive-dialog-title"
      >
         <DialogTitle
          id="alert-dialog-title"
          className="dark:text-red-600 text-red-500 font-bold flex items-center gap-[8px]"
        >
          <PiWarningFill />
          {"Warning!"}
        </DialogTitle>
        <DialogContent className="flex flex-col gap-[10px]">
          <p className="dark:text-white dark:font-semibold">
            {`Make sure you want to remove these user${
              selectedMembers.length <= 1 ? "" : "s"
            }:`}
          </p>
          <div className="max-h-[640px] overflow-y-scroll grid grid-cols-2 items-center justify-center flex-col gap-[10px] scrollbar-hide">
            {selectedMembers.map((item, index) => (
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
                    {item?.fullName.trim() == "" ? item?.email : item?.fullName}
                  </h3>
                  <p className="text-[14px] dark:text-gray-100">
                    {item?.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="dark:text-white dark:font-semibold">
            {`${selectedMembers.length <= 1 ? "This user" : "These users"} will not be able to log in to the system!`}
          </p>
        </DialogContent>
        <DialogActions>
          <MUIButton autoFocus onClick={handleCloseDeleteDialog}>
            <p className="hover:text-green-600">Cancel</p>
          </MUIButton>
          <MUIButton
            onClick={() => {
              handleDelectSelectedMembers();
            }}
            autoFocus
          >
            <p className="hover:text-red-600">Remove</p>
          </MUIButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RemoveDialog;
