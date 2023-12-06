import { RootState } from "@/redux/store";
import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function BackDrop(): JSX.Element {
  const isBackdrop = useSelector((state: RootState) => state.app.isBackdrop);
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1500 }}
        open={isBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default BackDrop;
