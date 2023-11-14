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
  openDialogToEditUser: boolean;
  setOpenDialogToEditUser: (bool: boolean) => void;
  userEditedId: string;
};

function EditOpenDialog({
  openDialogToEditUser,
  setOpenDialogToEditUser,
  userEditedId,
}: TProps) {
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  console.log("Edit user: " + userEditedId);
  return (
    <div>
      <Dialog
        PaperProps={{
          style: {
            borderRadius: "8px",
            backgroundColor: isDarkMode ? "#18191a" : "white",
            userSelect: "none",
            maxWidth: "1200px",
          },
        }}
        open={openDialogToEditUser}
        onClose={() => setOpenDialogToEditUser(false)}
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
        <DialogContent className="scrollbar-hide"></DialogContent>
        <DialogActions>
          <MUIButton onClick={() => setOpenDialogToEditUser(false)}>
            {"Cancle"}
          </MUIButton>
          <MUIButton>{"Save"}</MUIButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditOpenDialog;
