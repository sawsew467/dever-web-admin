import { RootState } from "@/redux/store";
import { TResume } from "@/ultils/types";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme
} from "@mui/material";
import React, { SetStateAction, useRef } from "react";
import { useSelector } from "react-redux";

import readingIndicatorPlugin from "@/components/ReactPdfViewer/plugins/ReacdingIndicator/readingIndicatorPlugin ";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { SearchIcon } from "@react-pdf-viewer/search";
import type {
  ToolbarProps,
  ToolbarSlot
} from "@react-pdf-viewer/toolbar";
import { RenderZoomProps, zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/zoom/lib/styles/index.css";

import SearchSidebar from "@/components/ReactPdfViewer/plugins/SearchSidebarPlugin/SearchSidebar";
import { SpecialZoomLevel } from "@react-pdf-viewer/core";
import { SelectionMode } from '@react-pdf-viewer/selection-mode';
import { PiDownloadSimpleLight } from "react-icons/pi";


type TProps = {
  setOpenResumeViewer: React.Dispatch<SetStateAction<boolean>>;
  openResumeViewer: boolean;
  value: TResume | null;
};

function ResumeViewer({
  openResumeViewer,
  setOpenResumeViewer,
  value,
}: TProps) {
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const zoomMenuRef = useRef<HTMLDivElement | null>(null);

  const handleToggleMenuZoom = () => {
    const div = document.getElementById("menu-zoom");
    if (div) {
      if (div.style.display == "none") {
        div.style.display = "block";
      } else {
        div.style.display = "none";
      }
    }
  };

  const readingIndicatorPluginInstance = readingIndicatorPlugin();
  const { ReadingIndicator } = readingIndicatorPluginInstance;
  const zoomIndicatorPluginInstance = zoomPlugin();
  const renderToolbar = React.useCallback(
    (Toolbar: (props: ToolbarProps) => React.ReactElement) => (
      <>
        <Toolbar>
          {(slots: ToolbarSlot) => {
            const {
              Download,
              GoToNextPage,
              GoToPreviousPage,
              NumberOfPages,
              CurrentPageInput,
              ZoomIn,
              ZoomOut,
              Zoom,
              EnterFullScreen,
              Print,
              SwitchSelectionMode
            } = slots;
            return (
              <div className="w-full flex items-center justify-between">
                <div className="flex flex-row">
                  <div className="px-[2px]">
                    <GoToPreviousPage />
                  </div>
                  <div className="px-[2px] flex items-center">
                    <CurrentPageInput /> / <NumberOfPages />
                  </div>
                  <div className="px-[2px]">
                    <GoToNextPage />
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="px-[2px]">
                    <ZoomOut />
                  </div>
                  <div
                    className="px-[2px] cursor-pointer"
                    onClick={() => {
                      handleToggleMenuZoom();
                    }}
                  >
                    <Zoom>
                      {(props: RenderZoomProps) => (
                        <div>
                          <div className="relative">
                            <p>{Math.floor(props.scale * 100)}%</p>
                            <div
                              id="menu-zoom"
                              className="absolute top-[40px] w-[140px] right-[-55px] dark:bg-dark bg-white border-[1px] border-[#454647] py-[8px] rounded-md"
                              style={{
                                display: "none",
                              }}
                              ref={zoomMenuRef}
                            >
                              <ul className="text-center">
                                <li
                                  className="hover:bg-[#e5e5e5] dark:hover:bg-darkHover cursor-pointer py-[2px]"
                                  onClick={() =>
                                    props.onZoom(SpecialZoomLevel.ActualSize)
                                  }
                                >
                                  Actual size
                                </li>
                                <li
                                  className="hover:bg-[#e5e5e5] dark:hover:bg-darkHover cursor-pointer py-[2px]"
                                  onClick={() =>
                                    props.onZoom(SpecialZoomLevel.PageFit)
                                  }
                                >
                                  Page fit
                                </li>
                                <li
                                  className="hover:bg-[#e5e5e5] dark:hover:bg-darkHover cursor-pointer py-[2px]"
                                  onClick={() =>
                                    props.onZoom(SpecialZoomLevel.PageWidth)
                                  }
                                >
                                  Page width
                                </li>
                                <div className="w-full h-[1px] bg-[#454647] my-2"></div>
                                <li
                                  className="hover:bg-[#e5e5e5] dark:hover:bg-darkHover cursor-pointer py-[2px]"
                                  onClick={() => props.onZoom(0.5)}
                                >
                                  50%
                                </li>
                                <li
                                  className="hover:bg-[#e5e5e5] dark:hover:bg-darkHover cursor-pointer py-[2px]"
                                  onClick={() => props.onZoom(0.75)}
                                >
                                  75%
                                </li>
                                <li
                                  className="hover:bg-[#e5e5e5] dark:hover:bg-darkHover cursor-pointer py-[2px]"
                                  onClick={() => props.onZoom(1)}
                                >
                                  100%
                                </li>
                                <li
                                  className="hover:bg-[#e5e5e5] dark:hover:bg-darkHover cursor-pointer py-[2px]"
                                  onClick={() => props.onZoom(1.25)}
                                >
                                  125%
                                </li>
                                <li
                                  className="hover:bg-[#e5e5e5] dark:hover:bg-darkHover cursor-pointer py-[2px]"
                                  onClick={() => props.onZoom(1.5)}
                                >
                                  150%
                                </li>
                                <li
                                  className="hover:bg-[#e5e5e5] dark:hover:bg-darkHover cursor-pointer py-[2px]"
                                  onClick={() => props.onZoom(2)}
                                >
                                  200%
                                </li>
                                <li
                                  className="hover:bg-[#e5e5e5] dark:hover:bg-darkHover cursor-pointer py-[2px]"
                                  onClick={() => props.onZoom(3)}
                                >
                                  300%
                                </li>
                                <li
                                  className="hover:bg-[#e5e5e5] dark:hover:bg-darkHover cursor-pointer py-[2px]"
                                  onClick={() => props.onZoom(4)}
                                >
                                  400%
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </Zoom>
                  </div>
                  <div className="px-[2px]">
                    <ZoomIn />
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="px-[2px]">
                    <SwitchSelectionMode mode={SelectionMode.Text} />
                  </div>
                  <div className="px-[2px]">
                    <SwitchSelectionMode mode={SelectionMode.Hand} />
                  </div>
                  <div className="px-[2px]">
                    <EnterFullScreen />
                  </div>
                  <div className="px-[6px] hover:bg-[#d6d6d6] p-[6px] rounded hover:dark:bg-[#191919] relative"
                    onMouseEnter={() => {
                      const downloadTitle = document.getElementById('download-title');
                      const downlaodTitleSquare = document.getElementById('download-title-square');
                      if(downloadTitle) downloadTitle.style.display = 'block'
                      if(downlaodTitleSquare) downlaodTitleSquare.style.display = 'block'
                    }}
                    onMouseLeave={() => {
                      const downloadTitle = document.getElementById('download-title');
                      const downlaodTitleSquare = document.getElementById('download-title-square');
                      if(downloadTitle) downloadTitle.style.display = 'none'
                      if(downlaodTitleSquare) downlaodTitleSquare.style.display = 'none'
                    }}
                  >
                    <a key={value?.id} href={value?.data!} download={`${value?.fullName} ${value?.studentId}-${new Date().toDateString()}.pdf`}>
                      <PiDownloadSimpleLight className='text-[dark] dark:text-[white] text-[20px]'/>
                    </a>
                    <div id="download-title-square" className="w-[15px] h-[15px] bg-black dark:bg-darkHover absolute rotate-45 top-[36px]" style={{display: 'none'}}></div>
                    <div id="download-title" className="absolute w-fit p-[8px] bg-[#000] dark:bg-darkHover text-white top-[40px] left-[-30px] rounded" style={{display:'none'}}>
                      <p>Download</p>
                    </div>
                  </div>
                  <div className="px-[2px]">
                    <Print />
                  </div>
                </div>
              </div>
            );
          }}
        </Toolbar>
        <div
          style={{
            bottom: "-0.25rem",
            position: "absolute",
            left: 0,
            width: "100%",
          }}
        >
          <ReadingIndicator />
        </div>
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
    sidebarTabs: (defaultTabs) =>
      [
        {
          content: (
            <SearchSidebar
              searchPluginInstance={
                defaultLayoutPluginInstance.toolbarPluginInstance
                  .searchPluginInstance
              }
            />
          ),
          icon: <SearchIcon />,
          title: "Search",
        },
      ].concat(defaultTabs),
  });

  return (
    <div className="h-fit">
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: isDarkMode ? "#282828" : "",
            color: isDarkMode ? "white" : "",
            borderRadius: "8px",
            maxWidth: "100vw",
            maxHeight: "100vh",
            userSelect: "none",
          },
        }}
        fullScreen={fullScreen}
        open={openResumeViewer}
        onClose={() => setOpenResumeViewer(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="p-[16px] flex items-center">
          <p className="font-semibold text-primaryBlue">{value?.fullName}</p>
          &nbsp;resume is being viewed
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpenResumeViewer(false);
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className="px-[16px] py-0 scrollbar-hide sm:w-[calc(100vw-80px)] h-[calc(100vh-100px)] select-text">
          {value?.data && (
            <div className="sm:w-[100%] h-[calc(100%-16px)] mb-4">
              <Viewer
                key={value.fullName}
                fileUrl={value?.data!}
                plugins={[
                  defaultLayoutPluginInstance,
                  readingIndicatorPluginInstance,
                  zoomIndicatorPluginInstance,
                  
                ]}
                theme={`${isDarkMode ? "dark" : "light"}`}
                // defaultScale={1.5}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ResumeViewer;
