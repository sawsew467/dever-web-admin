"use client";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastNotificationComp() {
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={isDarkMode ? "dark" : "light"}
    />
  );
}

ToastNotificationComp.propTypes = {};

export default ToastNotificationComp;