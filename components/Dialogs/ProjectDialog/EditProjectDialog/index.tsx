"use client";
import { RootState } from "@/redux/store";
import { TAppUserProject, TProjectCreateFieldsValue } from "@/ultils/types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { Button as MUIButton } from "@mui/material/";
import { FormikHelpers, Form, Formik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import FormikInput from "@/components/SettingElement/FormikInput";
import EditorNormal from "@/components/EditorNormal";
import BrowseImage from "@/components/SettingElement/BrowseImage";
import Image from "next/image";
import { getCookie } from "cookies-next";
import axios from "axios";
import { setIsBackdrop } from "@/redux/slices/app";
import { updateProject } from "@/apis/setting";

type Tpros = {
  isEditProjectOpen: boolean;
  setIsEditProjectOpen: React.Dispatch<SetStateAction<boolean>>;
  projectData: TAppUserProject;
  authorId: string;
  refreshApi: () => void;
};

function EditProjectDialog({
  projectData,
  isEditProjectOpen,
  setIsEditProjectOpen,
  authorId,
  refreshApi
}: Tpros) {
  // console.log("Author: " + authorId)
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const [htmlString, setHtmlString] = useState<string>(projectData.description);
  const [importedImage, setImportedImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>(projectData.thumbnailUrl);
  const formikRef = useRef<FormikHelpers<TProjectCreateFieldsValue> | null>(
    null
  );
  const [isChangeThumbnail, setIsChangeThumbnail] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onSubmit = async (
    values: TProjectCreateFieldsValue,
    actions: FormikHelpers<TProjectCreateFieldsValue>
  ) => {
    const projectState = {
      title: values!.title,
      authorId: authorId,
      description: htmlString,
      projectUrl: values!.sourceCode,
      demoUrl: values!.production,
      thumbnailUrl: imageURL,
    }
    try {
      const access_token = getCookie('accessToken');
      if(access_token) {
        dispatch(setIsBackdrop(true));
        await updateProject(access_token, projectData.projectId, projectState);
        refreshApi();
        setImportedImage(null);
        setImageURL(projectData.thumbnailUrl);
        dispatch(setIsBackdrop(false));
        toast.success("Update project information successfully!")
        setIsEditProjectOpen(false);
      }
    } catch (error) {
      if(axios.isAxiosError(error)) {
        dispatch(setIsBackdrop(false))
        toast.error("Update project information failed!")
      }
    }
  };
  
  useEffect(() => {
    return setIsChangeThumbnail(false);
  }, [isEditProjectOpen]);

  return (
    <div>
      <Dialog
        open={isEditProjectOpen}
        onClose={() => setIsEditProjectOpen(false)}
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
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Editing project
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setIsEditProjectOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <div id="formik-form">
          <Formik
            initialValues={{
              title: projectData.title,
              sourceCode: projectData.projectUrl,
              production: projectData.demoUrl,
            }}
            validationSchema={yup.object().shape({
              title: yup.string().required("Title is required"),
              sourceCode: yup
                .string()
                .url("Invalid URL format")
                .required("Source code URL is required"),
              production: yup.string().url("Invalid URL format"),
            })}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {(formikProps) => {
              formikRef.current = formikProps;
              return (
                <Form>
                  <DialogContent className="max-h-[600px] max-w-[800px lg:w-[800px] scrollbar-hide pt-0">
                    <div className="flex flex-col gap-[10px]">
                      {isChangeThumbnail ? (
                        <div className="relative">
                          <BrowseImage
                            formTitle={"Project thumbnail (required)"}
                            fileStorage={importedImage}
                            setFileStorage={setImportedImage}
                            setFileURL={setImageURL}
                          />
                          <button className="absolute bottom-[20px] right-[20px] text-[12px] px-[12px] py-[6px] dark:text-[#6b7280] text-[#e5e7eb] border-[#e5e7eb] rounded-md border-2 dark:border-[#3f3f3f] hover:bg-blue-700 hover:text-white dark:hover:text-white dark:hover:border-blue-500 hover:border-blue-500 transition duration-500"
                            onClick={() => {setIsChangeThumbnail(false)
                              setImportedImage(null)
                              setImageURL(projectData.thumbnailUrl);
                            }}
                          >Cancel</button>
                        </div>
                      ) : (
                        <div className="relative rounded-md overflow-hidden">
                          <Image
                            src={projectData.thumbnailUrl}
                            alt="thumbnail"
                            width={2000}
                            height={1000}
                            className="w-full h-full"
                          ></Image>
                          <div
                            className="absolute top-0 left-0 w-full h-full flex items-center justify-center hover:bg-[#000000a9] transition duration-500 opacity-0 hover:opacity-100 cursor-pointer"
                            onClick={() => setIsChangeThumbnail(true)}
                          >
                            <button
                              className="text-[24px] px-[14px] py-[12px] border-2 dark:border-white text-white rounded-lg"
                              onClick={() => setIsChangeThumbnail(true)}
                            >
                              Change thumbnail
                            </button>
                          </div>
                        </div>
                      )}
                      <FormikInput
                        label="title"
                        id="title"
                        name="title"
                        placeholder="Enter project title..."
                        type="text"
                        isEdit={isEditProjectOpen}
                        title="Project title"
                      />
                      <FormikInput
                        label={"sourceCode"}
                        id={"sourceCode"}
                        name={"sourceCode"}
                        placeholder={"Enter project's source code..."}
                        type={"text"}
                        isEdit={isEditProjectOpen}
                        title={"Source code (Github)"}
                      />
                      <FormikInput
                        label={"production"}
                        id={"production"}
                        name={"production"}
                        placeholder={"Enter product URL..."}
                        type={"text"}
                        isEdit={isEditProjectOpen}
                        title={"Production"}
                      />
                      <div className="flex flex-col gap-[6px]">
                        <div>
                          <h3 className="font-[300] text-[14px] dark:font-semibold">
                            Project description
                          </h3>
                        </div>
                        <EditorNormal
                          htmlString={htmlString}
                          setHtmlString={setHtmlString}
                          isNeedSave={false}
                          useEditorFor={"projectSetting"}
                          userId={""}
                        />
                      </div>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <MUIButton
                      autoFocus
                      onClick={() => {
                        setIsEditProjectOpen(false);
                      }}
                      className="hover:text-blue-500"
                    >
                      Cancel
                    </MUIButton>
                    <MUIButton
                      type="submit"
                      autoFocus
                      onClick={() => {
                        setIsEditProjectOpen(true);
                      }}
                      className="hover:text-green-500"
                    >
                      Save
                    </MUIButton>
                  </DialogActions>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Dialog>
    </div>
  );
}

export default EditProjectDialog;
