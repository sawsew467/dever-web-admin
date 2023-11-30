import { RootState } from "@/redux/store";
import { memberType } from "@/ultils/types";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { Button as MUIButton } from "@mui/material/";
import Image from "next/image";
import { PiWarningFill } from "react-icons/pi";
import { useSelector } from "react-redux";

type TProps = {
  openDialogToDeleteOneUser: boolean;
  setOpenDialogToDeleteOneUser: (bool: boolean) => void;
  deleteUser: memberType;
  handleDeleteUserOutOfBD: (item: memberType, isNeedToast: boolean) => void;
};

function DeleteOutAUserDialog({
  openDialogToDeleteOneUser,
  setOpenDialogToDeleteOneUser,
  deleteUser,
  handleDeleteUserOutOfBD,
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
          },
        }}
        open={openDialogToDeleteOneUser}
        onClose={() => setOpenDialogToDeleteOneUser(false)}
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
        <DialogContent>
          <div className="flex flex-col gap-[10px]">
            <p className="dark:text-white dark:font-semibold">
              Make user you want to delete user:
            </p>
            <div className="flex items-center justify-center">
              <div className="flex flex-row gap-[10px] border-2 px-[8px] py-[8px] rounded-[10px] dark:border-darkHover">
                <div className="w-[48px] h-[48px] rounded-[50%] overflow-hidden">
                  <Image
                    src={deleteUser?.avatarUrl!}
                    alt="user_avatar"
                    width={1200}
                    height={600}
                    className="w-full h-full object-cover"
                  ></Image>
                </div>
                <div className="dark:text-white">
                  <h3 className="text-[16px] font-[600] dark:text-white dark:font-bold">
                    {deleteUser?.fullName.trim() == ""
                      ? deleteUser?.email
                      : deleteUser?.fullName}
                  </h3>
                  <p className="text-[14px] dark:text-gray-100">
                    {deleteUser?.email}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="dark:text-white dark:font-semibold">
                This user will not exist in the system data after you delete it!
              </p>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <MUIButton
            onClick={() => {
              setOpenDialogToDeleteOneUser(false);
            }}
            className="hover:text-green-400"
          >
            Cancle
          </MUIButton>
          <MUIButton
            onClick={() => {
              handleDeleteUserOutOfBD(deleteUser!, true);
              setOpenDialogToDeleteOneUser(false);
            }}
            autoFocus
            className="hover:text-red-500"
          >
            Delete
          </MUIButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteOutAUserDialog;
