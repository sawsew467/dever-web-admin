import { getCvById } from "@/apis/resumes";
import { TResume } from "@/ultils/types";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { SetStateAction, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import workderSrc from '../../../pdf-worker';
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { PDFDocument } from "pdf-lib";
import { Skeleton } from "@mui/material";

// pdfjs.GlobalWorkerOptions.workerSrc = workderSrc;
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

type TProps = {
  setResumesList: React.Dispatch<SetStateAction<TResume[] | []>>;
  setResumeView: React.Dispatch<SetStateAction<TResume | null>>;
  setOpenResumeViewer: React.Dispatch<SetStateAction<boolean>>;
  setNumberItemSelected: React.Dispatch<SetStateAction<number>>;
  value: TResume;
  resumesList: TResume[] | [];
  isOnSelect: boolean;
  numberItemSelected: number;
  addToSelectList: () => void;
};

function ResumesCard({
  value,
  resumesList,
  setResumesList,
  isOnSelect,
  setNumberItemSelected,
  numberItemSelected,
  addToSelectList,
  setResumeView,
  setOpenResumeViewer
}: TProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pdfFile, setPdfFile] = useState<any | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleGetPdfFile = async (): Promise<string | undefined> => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const pdfRes = await getCvById(access_token, value.id);
        const data = pdfRes.request.response;
        const blob = new Blob([data], {
          type: "application/pdf",
        });
        const url = URL.createObjectURL(blob);
        setPdfFile(url);
        return url;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return;
      }
    }
  };
  const handleAssignPdf = () => {
    const assignPdf = resumesList.map((item: TResume, index: number) => {
      if (item.id == value.id) {
        item.data = handleGetPdfFile();
        item.selected = false;
      }
      return {
        ...item,
      };
    });
    setResumesList([...assignPdf]);
  };
  useEffect(() => {
    handleAssignPdf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectItem = () => {
    setResumesList((prevResume) =>
      prevResume.map((resume) =>
        resume.id == value.id
          ? { ...resume, selected: !resume.selected }
          : resume
      )
    );
  };

  // const handleScroll = () => {
  //   const pos = window.innerWidth;
  // };
  // useEffect(() => {
  //   const pos = window.innerWidth;
  //   window.addEventListener("resize", handleScroll, { passive: true });
  //   return () => {
  //     window.removeEventListener("resize", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    addToSelectList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.selected]);

  return (
    <div className=" w-full lg:w-fit h-fit dark:bg-dark dark:shadow-darkPrimary dark:text-white shadow-primary rounded-[10px] p-[12px] cursor-pointer hover:scale-[1.02] transition relative">
      {isOnSelect && (
        <div>
          <input
            type="checkbox"
            className="rounded-md absolute top-[12px] right-[12px] w-[20px] h-[20px] border-2"
            onChange={handleSelectItem}
            checked={value.selected}
            onClick={() => {
              if (!value.selected) {
                setNumberItemSelected(numberItemSelected + 1);
              } else {
                setNumberItemSelected(numberItemSelected - 1);
              }
            }}
          />
        </div>
      )}
      <div className="flex flex-col gap-[6px]">
        <div>
          <h1 className="font-bold text-[14px]">
            Name: <span className="font-bold">{value.fullName}</span>
          </h1>
          <h2 className="font-bold text-[12px]">
            Email: <span className="font-medium">{value.email}</span>
          </h2>
          <h2 className="font-bold text-[12px]">
            SID: <span className="font-medium">{value.studentId}</span>
          </h2>
        </div>
        <div
          className="select-none"
          title="Click to see details"
          onClick={() => {
            setResumeView({
              ...value,
              data: pdfFile,
              selected: value.selected,
            });
            setOpenResumeViewer(true);
          }}
        >
          {pdfFile ? (
            <Document
              file={pdfFile}
              options={options}
              onLoadError={console.error}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={1} width={250} />
            </Document>
          ) : (
            <Skeleton variant="rounded" width={250} height={353}></Skeleton>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumesCard;
