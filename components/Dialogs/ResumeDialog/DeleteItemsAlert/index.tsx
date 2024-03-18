
import React, { SetStateAction } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Button as MUIButton } from "@mui/material/";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { PiWarningFill } from "react-icons/pi";
import { TResume } from "@/ultils/types";
import { indexOf } from "lodash-es";

type TProps = {
    setOpenDeleteDialog: React.Dispatch<SetStateAction<boolean>>;
    openDeleteDialog: boolean;
    value: TResume[];
    deleteFunction: () => void;
};

function DeleteItemsAlert({openDeleteDialog, setOpenDeleteDialog, value, deleteFunction}: TProps) {
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Dialog
        open={openDeleteDialog}
        onClose={() => {setOpenDeleteDialog(false)}}
        PaperProps={{
          style: {
            backgroundColor: isDarkMode ? "#282828" : "",
            color: isDarkMode ? "white" : "",
            borderRadius: "8px",
            maxWidth: "1200px",
            userSelect: "none",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          className="dark:text-red-600 text-red-500 font-bold flex items-center gap-[8px]"
        >
          <PiWarningFill />
          {"Warning!"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {setOpenDeleteDialog(false)}}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className="max-h-[600px] max-w-[900px] p-[16px] py-0">
          <div>
            <div>
                <p className="font-semibold">Are you sure you want to clear these résumés?</p>
            </div>
            <div className="w-full max-h-[500px] flex flex-wrap gap-2 mt-2 overflow-y-auto scrollbar-hide">
               {
                value.map((item, index) => (
                    <div key={index} className="w-full sm:w-fit p-[12px] border-2 rounded-[12px]">
                        <div>
                            <p className="font-semibold">| {item.fullName}</p>
                        </div>
                        <div>
                            <p>| SID: {item.studentId}</p>
                        </div>
                    </div>
                ))
               }
            </div>
          </div>
        </DialogContent>
        <DialogActions>
        <MUIButton
            onClick={() => {
                setOpenDeleteDialog(false);
            }}
            className="hover:text-green-400"
          >
            Cancle
          </MUIButton>
          <MUIButton
            onClick={() => {
               deleteFunction();
            }}
            className="hover:text-red-500"
          >
            {'Delete'}
          </MUIButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteItemsAlert;
