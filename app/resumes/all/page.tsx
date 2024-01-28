"use client";
import { deleteCVByID, getAllCv } from "@/apis/resumes";
import ResumesCard from "@/components/ResumesElement/ResumesCard";
import searchIcon from "@icon/page/notification/list/search-outline.svg";
import {
  dropdownResumes,
  openViewAllResumes,
} from "@/redux/slices/sideBarControl";
import { RootState } from "@/redux/store";
import { TResume } from "@/ultils/types";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import Image from "next/image";
import UnlinkButton from "@/components/UnlinkButton";
import { closeSidebar, setIsBackdrop } from "@/redux/slices/app";
import DeleteItemsAlert from "@/components/Dialogs/ResumeDialog/DeleteItemsAlert";
import { toast } from "react-toastify";
import ResumeViewer from "@/components/Dialogs/ResumeDialog/ResumeViewer";

function Resumes() {
  const isOpenSlidebar = useSelector(
    (state: RootState) => state.app.isOpenSlidebar
  );
  const isMouseVisit = useSelector(
    (state: RootState) => state.app.isMouseVisit
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dropdownResumes(true));
    dispatch(openViewAllResumes(true));
  }, [dispatch]);

  const [resumesList, setResumesList] = useState<TResume[]>([]);
  const [isListLoading, setIsListLoading] = useState<boolean>(true);
  const [isOnSelect, setIsOnSelect] = useState<boolean>(false);
  const [numberItemSelected, setNumberItemSelected] = useState<number>(0);
  const [selectedResumes, setSelectedResumes] = useState<TResume[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [resumeView, setResumeView] = useState<TResume | null>(null);
  const [openResumeViewer, setOpenResumeViewer] = useState<boolean>(false);

  const handleGetAllResumes = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const res = await getAllCv(access_token);
        const resumesTemp = res.data.body;
        setResumesList(resumesTemp);
        setIsListLoading(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return;
      }
    }
  };

  useEffect(() => {
    dispatch(closeSidebar());
    handleGetAllResumes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancelAllSelected = () => {
    const unSelectedList = resumesList.map((resume: TResume) => ({
      ...resume,
      selected: false,
    }));
    setResumesList(unSelectedList);
    setNumberItemSelected(0);
  };

  const handleFilterAllSelectedResumes = () => {
    const filtedList = resumesList.filter((item: TResume) => item.selected);
    setSelectedResumes(filtedList);
  };

  const handleDeleteResume = async (cvId: string) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token && cvId) {
        await deleteCVByID(access_token, cvId);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Something went wrong!");
        return;
      }
    }
  };
  const handleDeleteAllSelectedResume = async () => {
    setOpenDeleteDialog(false);
    dispatch(setIsBackdrop(true));
    for (let item of selectedResumes) {
      await handleDeleteResume(item.id);
    }
    await handleGetAllResumes();
    setSelectedResumes([]);
    setNumberItemSelected(0);
    setIsOnSelect(false);
    setOpenDeleteDialog(false);
    dispatch(setIsBackdrop(false));
  };

  return (
    <div
      className={`w-[100%] ${
        isOpenSlidebar
          ? isMouseVisit
            ? "sm:w-[calc(100%-250px)]"
            : "sm:w-[calc(100%-65px)]"
          : "sm:w-[calc(100%-250px)]"
      } absolute right-0 top-[72px] bottom-0 h-fit duration-[0.3s]`}
    >
      <div className="py-[20px] px-[16px] flex flex-col gap-[20px]">
        <div>
          <h1 className="font-bold text-[24px] select-none dark:text-white">
            All Résumés
          </h1>
        </div>

        <div className="flex justify-between lg:flex-row flex-col gap-[16px]">
          <div className="flex gap-[16px] ">
            <div className="flex w-[100%] lg:w-fit h-[38px] rounded-[10px] overflow-hidden">
              <input
                type="search"
                className="w-full lg:w-[392px] border-y-2 border-r border-l-none border-slate-200 dark:border-darkHover dark:bg-dark dark:text-white select-none outline-none border-l-2 rounded-l-[10px]"
                placeholder="Enter name or student ID..."
              />
              <div className="w-[42px] h-[38px] bg-primaryBlue flex items-cent    justify-center cursor-pointer">
                <Image
                  src={searchIcon}
                  alt="searchIcon"
                  className="w-[24px] h-[38px]"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-[12px]">
            {numberItemSelected > 0 && (
              <UnlinkButton
                textContent={"Delete"}
                icon={"delete"}
                iconPosition={"right"}
                backgroundColor={"bg-red-700"}
                method={() => {
                  setOpenDeleteDialog(true);
                }}
                tailwind={
                  "rounded-[8px] px-[12px] py-[8px] text-[12px] bg-blue-700 text-white"
                }
              ></UnlinkButton>
            )}
            <UnlinkButton
              textContent={!isOnSelect ? "Select" : "Cancel"}
              icon={""}
              iconPosition={"left"}
              backgroundColor={!isOnSelect ? "bg-blue-700" : "bg-green-700"}
              method={() => {
                setIsOnSelect(!isOnSelect);
                if (isOnSelect) {
                  handleCancelAllSelected();
                }
              }}
              tailwind={
                "rounded-[8px] px-[12px] py-[8px] text-[12px] bg-blue-700 text-white"
              }
            ></UnlinkButton>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="font-bold dark:text-white">
            Total: {resumesList.length}
          </p>
          {isOnSelect && numberItemSelected > 0 ? (
            <>
              <p className="font-bold dark:text-white">
                {numberItemSelected} résumé{numberItemSelected > 1 ? "s" : ""}{" "}
                is selected
              </p>
            </>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-[16px]">
          {resumesList.length == 0 && !isListLoading ? (
            <div className="w-full flex justify-center items-center">
              <h3 className="text-[32px] mt-[150px] font-bold dark:text-white">
                Résumés list is empty! :((
              </h3>
            </div>
          ) : (
            resumesList.map((value: TResume, index: number) => (
              <ResumesCard
                key={index}
                value={value}
                resumesList={resumesList}
                setResumesList={setResumesList}
                isOnSelect={isOnSelect}
                setNumberItemSelected={setNumberItemSelected}
                numberItemSelected={numberItemSelected}
                addToSelectList={handleFilterAllSelectedResumes}
                setResumeView={setResumeView}
                setOpenResumeViewer={setOpenResumeViewer}
              ></ResumesCard>
            ))
          )}
        </div>
      </div>

      <DeleteItemsAlert
        setOpenDeleteDialog={setOpenDeleteDialog}
        openDeleteDialog={openDeleteDialog}
        value={selectedResumes}
        deleteFunction={handleDeleteAllSelectedResume}
      ></DeleteItemsAlert>

      {resumeView?.data && (
        <ResumeViewer
          setOpenResumeViewer={setOpenResumeViewer}
          openResumeViewer={openResumeViewer}
          value={resumeView}
          key={resumeView.id}
        ></ResumeViewer>
      )}
    </div>
  );
}

export default Resumes;
