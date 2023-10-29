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

type TProjectCreateFieldsValue = {
  title: string;
  demo: string;
};

type TProjectState = {
  title: string;
  desc: string;
  img: string;
  link: string;
};

function Projects(): JSX.Element {
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [hmtlString, setHtmlString] = useState<string>("");
  const [importedImage, setImportedImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const formikRef = useRef<FormikHelpers<TProjectCreateFieldsValue> | null>(
    null
  );

  const project_List = [
    {
      title: "Noteworthy technology acquisitions 2021",
      desc: "<p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>",
      img: "https://res.cloudinary.com/dy1uuo6ql/image/upload/v1694281714/FU_DEVER_ADMIN/project_image/y81w3mxwnrgmf967l7tw.jpg",
      link: "github.com/sawsew467/dever-web-frontend",
    },
  ];
  const [projectState, setProjectState] =
    useState<TProjectState[]>(project_List);

  const removeHttps = (link: string): string => {
    if (link.startsWith("http://")) {
      return link.slice(7);
    } else if (link.startsWith("https://")) {
      return link.slice(8);
    }
    return link;
  };

  const onSubmit = async (
    values: TProjectCreateFieldsValue,
    actions: FormikHelpers<TProjectCreateFieldsValue>
  ) => {
    const { title, demo } = values;
    const newProjectData = {
      title: title,
      desc: hmtlString,
      img: imageURL,
      link: removeHttps(demo),
    };
    setProjectState((prevProjectState) => [
      ...prevProjectState,
      newProjectData,
    ]);
    console.log(values);
    console.log("POST NEW PROJECT: ", newProjectData);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    toast.info("Create project successfully!");
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

  //demo function

  //delete by index in state
  const handleDeleteProject = (itemIndex: number) => {
    const deteted = projectState.filter(
      (value: TProjectState, index: number) => index !== itemIndex
    );
    setProjectState([...deteted]);
    console.log("DELETE PROJECT ID:", itemIndex);
  };

  return (
    <div className="flex flex-col gap-[20px] p-[24px] shadow-primary dark:shadow-darkPrimary rounded-[10px] select-none">
      <div className="flex flex-row justify-between">
        <h3 className="font-[700] text-[24px] dark:text-white">Your projects</h3>
        <button
          className="w-[28px] h-[28px] flex items-center justify-center hover:scale-125 rounded-[50%] hover:border-[1px] hover:border-blue-700 cursor-pointer transition"
          onClick={handleEditClick}
        >
          <Image
            src={isEdit ? EditIconAnimate : EditIconPause}
            alt="Edit"
            width={18}
            height={18}
          />
        </button>
      </div>
      <div className="flex flex-col gap-[20px]">
        {projectState.length == 0 ? (
          <p
            className="font-[500] text-[14px] text-blue-700 cursor-pointer dark:text-white"
            onClick={() => {
              setIsEdit(true);
              setIsAdd(true);
            }}
          >
            You haven&apos;t posted any projects yet
          </p>
        ) : (
          <>
            {projectState.map((item, index) => {
              return (
                <ProjectCard
                  key={index}
                  img={item.img}
                  title={item.title}
                  desc={item.desc}
                  link={item.link}
                  canEdit={true}
                  method={() => handleDeleteProject(index)}
                  isEdit={isEdit}
                />
              );
            })}
          </>
        )}
      </div>
      {isEdit ? (
        <div>
          <AddButton
            text={projectState.length == 0 ? "Add" : "Add more"}
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
              demo: "",
            }}
            validationSchema={yup.object().shape({
              title: yup.string().required("Title is required"),
              demo: yup
                .string()
                .url("Invalid URL format")
                .required("Demo URL is required"),
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
                      />
                    </div>
                    <BrowseImage
                      formTitle={"Project thumbnail"}
                      fileStorage={importedImage}
                      setFileStorage={setImportedImage}
                      setFileURL={setImageURL}
                    />
                    <FormikInput
                      label={"demo"}
                      id={"demo"}
                      name={"demo"}
                      placeholder={"Enter source code or deployment..."}
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
