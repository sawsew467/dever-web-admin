import React, { useRef, useState } from "react";
import AddButton from "./AddButton";
import ProjectCard from "../ProjectCard";
import { FormikHelpers, Form, Formik } from "formik";
import { toast } from "react-toastify";
import Image from "next/image";
import * as yup from "yup";

import EditIconAnimate from "@icon/components/Button/edit.gif";
import EditIconPause from "@icon/components/Button/edit_pause.png";
import FormikInput from "./FormikInput";
import EditorNormal from "../EditorNormal";
import BrowseImage from "./BrowseImage";
import { PiPencilSimpleFill, PiPencilSimpleLineFill } from "react-icons/pi";
import { isAxiosError } from "axios";
import { postProject } from "@/apis/setting";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { setIsBackdrop } from "@/redux/slices/app";

type TProjectCreateFieldsValue = {
  title: string;
  sourceCode: string;
  production: string;
};

type TAppUserProject = {
  createdAt: string;
  demoUrl: string;
  description: string;
  projectId: string;
  projectUrl: string;
  thumbnailUrl: string;
  title: string;
  updatedAt: string;
};

type TProps = {
  userId: string;
  refreshApi: () => void;
  userProjectList: TAppUserProject[];
}

function  Projects({userId, refreshApi, userProjectList}: TProps): JSX.Element {
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [hmtlString, setHtmlString] = useState<string>("");
  const [importedImage, setImportedImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const formikRef = useRef<FormikHelpers<TProjectCreateFieldsValue> | null>(
    null
  );
  const dispatch = useDispatch();

  const onSubmit = async (
    values: TProjectCreateFieldsValue,
    actions: FormikHelpers<TProjectCreateFieldsValue>
  ) => {
    const { title, sourceCode, production} = values;

    const newProjectData = {
      title: title,
      authorId: userId,
      description: hmtlString,
      projectUrl: sourceCode,
      demoUrl: production,
      thumbnailUrl: imageURL,
    };
    console.log(newProjectData);
    
    try {
      const access_token = getCookie('accessToken');
      if(access_token) {
        dispatch(setIsBackdrop(true));
        await postProject(access_token, newProjectData);
        dispatch(setIsBackdrop(false));
        refreshApi();
        toast.success("Create new project successfully!")
      }
    } catch (error) {
      if(isAxiosError(error)) {
        dispatch(setIsBackdrop(false));
        toast.error("Add project failed!");
      }
    }

    actions.resetForm();
    setIsEdit(false);
  };

  const handleEditClick = () => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
    setIsEdit(!isEdit);
    setIsAdd(false);
    setImportedImage(null);
  };


  return (
    <div className="flex flex-col gap-[20px] p-[24px] shadow-primary dark:shadow-darkPrimary rounded-[10px] select-none dark:text-white">
      <div className="flex flex-row justify-between">
        <h3 className="font-[700] text-[24px] dark:text-white">Your projects</h3>
        <button
          className={`w-[28px] h-[28px] flex items-center justify-center hover:scale-125 rounded-[50%] hover:border-[1px] hover:border-blue-700 cursor-pointer transition ${isEdit ? "bg-blue-700 text-white" :  ""} `}
          onClick={() => {
            handleEditClick()
          }}
        >
          {isEdit ? <PiPencilSimpleLineFill/> : <PiPencilSimpleFill/>}
        </button>
      </div>
      <div className="flex flex-col gap-[20px]">
        {userProjectList.length == 0 ? (
          <p
            className="font-[500] text-[14px] text-blue-700 cursor-pointer dark:text-white"
            onClick={() => {
              setIsEdit(true);
              setIsAdd(true);
            }}
          >
            Haven&apos;t posted any projects yet
          </p>
        ) : (
          <div className="flex flex-col gap-[20px]">
            {userProjectList.map((item, index) => {
              return (
                <ProjectCard
                  key={index}
                  img={item.thumbnailUrl}
                  title={item.title}
                  desc={item.description}
                  projectSourcelink={item.projectUrl}
                  projectDemoLink={item.demoUrl}
                  projectId = {item.projectId}
                  authorId = {userId}
                  canEdit={true}
                  refreshApi={refreshApi}
                  isEdit={isEdit}
                />
              );
            })}
          </div>
        )}
      </div>
      {isEdit ? (
        <div>
          <AddButton
            text={userProjectList.length == 0 ? "Add" : "Add more"}
            isAdd={isAdd}
            setIsAdd={setIsAdd}
          />
        </div>
      ) : null}
      {isEdit && isAdd ? (
        <div className="dark:text-white">
          <Formik
            initialValues={{
              title: "",
              sourceCode: "",
              production: "",
            }}
            validationSchema={yup.object().shape({
              title: yup.string().required("Title is required"),
              sourceCode: yup
                .string()
                .url("Invalid URL format")
                .required("Source code URL is required"),
                production: yup
                .string()
                .url("Invalid URL format")
                .required("Product URL is required"),
            })}
            onSubmit={onSubmit}
          >
            {(formikProps) => {
              formikRef.current = formikProps;
              return (
                <Form>
                  <div className="flex flex-col gap-[20px]">
                    <FormikInput
                      label="title"
                      id="title"
                      name="title"
                      placeholder="Enter project title..."
                      type="text"
                      isEdit={isEdit}
                      title="Project title"
                    />
                    <div className="flex flex-col gap-[6px]">
                      <div>
                        <h3 className="font-[300] text-[14px] dark:font-semibold">
                          Project description
                        </h3>
                      </div>
                      <EditorNormal
                        htmlString={hmtlString}
                        setHtmlString={setHtmlString}
                        isNeedSave={false}
                        useEditorFor={"projectSetting"}
                        userId={userId}
                      />
                    </div>
                    <BrowseImage
                      formTitle={"Project thumbnail"}
                      fileStorage={importedImage}
                      setFileStorage={setImportedImage}
                      setFileURL={setImageURL}
                    />
                    <FormikInput
                      label={"sourceCode"}
                      id={"sourceCode"}
                      name={"sourceCode"}
                      placeholder={"Enter project's source code..."}
                      type={"text"}
                      isEdit={isEdit}
                      title={"Source code URL"}
                    />
                    <FormikInput
                      label={"production"}
                      id={"production"}
                      name={"production"}
                      placeholder={"Enter product URL..."}
                      type={"text"}
                      isEdit={isEdit}
                      title={"Production"}
                    />
                    {isEdit ? (
                      <div>
                        <button
                          type="submit"
                          className="rounded-[8px] px-[12px] py-[8px] text-[12px] bg-blue-700 text-white"
                        >
                          Save
                        </button>
                      </div>
                    ) : null}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      ) : null}
    </div>
  );
}

export default Projects;
