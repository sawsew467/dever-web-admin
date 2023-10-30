"use-client"
import React, { useEffect, useRef, useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { generalInformationSchema } from "@component/SettingElement/Validation/validation";
import FormikSelect from "./FormikSelect";
import FormikInput from "./FormikInput";
import Image from "next/image";
import EditIconAnimate from "@icon/components/Button/edit.gif";
import EditIconPause from "@icon/components/Button/edit_pause.png";
import { userInfo } from "@/ultils/types";
import {
  formatDateToMMDDYYYY,
  formatDateToYYYYMMDD,
} from "@/ultils/dateFormat";
import axios from "axios";
import { getCookie } from "cookies-next";
import {
  getAllDepartment,
  getAllMajor,
  getAllPosition,
} from "@/apis/dataOrganizer";
import { patchGeneralInfo } from "@/apis/setting";
import { PiPencilSimpleFill, PiPencilSimpleLineFill } from "react-icons/pi";

type TGeneralFieldValues = {
  firstName: string;
  lastName: string;
  birthday: string;
  homeAddress: string;
  position: string;
  career: string;
  majorID: string;
  educationPlace: string;
  workHistory: string;
  departmentID: string;
  joinDate: string;
};

type TOptionsList = {
  id: string;
  name: string;
};

type TProps = {
  userData: userInfo;
  refreshApi: () => void;
};

function GeneralInformation({ userData, refreshApi }: TProps): JSX.Element {
  const [postionOptions, setPositionOptions] = useState<TOptionsList[]>([]);
  const [majorOptions, setMajorOptions] = useState<TOptionsList[]>([]);
  const [departmentOptions, setDeparmentOptions] = useState<TOptionsList[]>([]);
  const [educationOptions, setEducationOptions] = useState<TOptionsList[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const formikRef = useRef<FormikHelpers<TGeneralFieldValues> | null>(null);

  const onSubmit = async (
    values: TGeneralFieldValues,
    actions: FormikHelpers<TGeneralFieldValues>
  ) => {

    try {
      const access_token = getCookie("accessToken");
      const userId = getCookie("userId");
      if (access_token && userId) {
        console.log(userData);
        
        const generalData = {
          userId: userId,
          firstName: values.firstName,
          lastName: values.lastName,
          birthday: values.birthday,
          homeAddress: values.homeAddress,
          positionId: values.position,
          career: values.career,
          majorID: values.majorID,
          educationPlaces: values.educationPlace,
          workplaces: values.workHistory,
          departmentID: values.departmentID,
          joinDate: values.joinDate,
        };
        console.log(generalData);
        const res = await patchGeneralInfo(access_token, generalData);
        toast.success(`Update general information successfully!`);
        actions.resetForm();
        refreshApi();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Update general information failed!`);
      }
    }
  
  };

  const handleEditClick = () => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
    setIsEdit(!isEdit);
  };

  const handleGetAllPosition = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const res = await getAllPosition(access_token);
        const data = res.data.body;

        const filtedData = data
          .map((item: TOptionsList) => {
            return {
              id: item.id,
              name: item.name,
            };
          })
          .filter((item: TOptionsList) => item.name !== "")
          .filter(
            (item: TOptionsList) => item.name.toLowerCase() !== "default"
          );
        setPositionOptions(filtedData);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };
  const handleGetAllDeparment = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const res = await getAllDepartment(access_token);
        const data = res.data.body;
        const filtedData = data
          .map((item: TOptionsList) => {
            return {
              id: item.id,
              name: item.name,
            };
          })
          .filter((item: TOptionsList) => item.name !== "")
          .filter(
            (item: TOptionsList) => item.name.toLowerCase() !== "default"
          );
        setDeparmentOptions(filtedData);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };
  const handleGetAllMajor = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const res = await getAllMajor(access_token);
        const data = res.data.body;
        const filtedData = data
          .map((item: TOptionsList) => {
            return {
              id: item.id,
              name: item.name,
            };
          })
          .filter((item: TOptionsList) => item.name !== "")
          .filter(
            (item: TOptionsList) => item.name.toLowerCase() !== "default"
          );
        setMajorOptions(filtedData);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleGetAllPosition();
    handleGetAllDeparment();
    handleGetAllMajor();
  }, []);

  return (
    <div className="flex flex-col gap-[20px] p-[24px] shadow-primary dark:shadow-darkPrimary rounded-[10px] dark:text-white">
      <div className="flex flex-row justify-between">
        <h3 className="font-[700] text-[24px] dark:text-white">General infomation</h3>
        <button
          className={`w-[28px] h-[28px] flex items-center justify-center hover:scale-125 rounded-[50%] hover:border-[1px] hover:border-blue-700 cursor-pointer transition ${isEdit ? "bg-blue-700 text-white" :  ""} `}
          onClick={() => {
            handleEditClick()
          }}
        >
          {isEdit ? <PiPencilSimpleLineFill/> : <PiPencilSimpleFill/>}
        </button>
      </div>

      <div className="dark:text-white">
        <Formik
          initialValues={{
            firstName: userData.firstName,
            lastName: userData.lastName,
            birthday: formatDateToYYYYMMDD(userData.birthDay),
            homeAddress: userData.homeAddress,
            position: userData.positionId,
            career: userData.career,
            majorID: userData.majorId,
            educationPlace: userData.educationPlaceNames,
            workHistory: userData.workplaces,
            departmentID: userData.departmentId,
            joinDate: formatDateToYYYYMMDD(userData.joinDate),
          }}
          validationSchema={generalInformationSchema}
          onSubmit={onSubmit}
        >
          {(formikProps) => {
            formikRef.current = formikProps;
            return (
              <Form className="flex flex-col gap-[20px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] select-none">
                  <FormikInput
                    label={"firstName"}
                    id={"firstName"}
                    name={"firstName"}
                    placeholder={"Enter your fisrt name..."}
                    type={"text"}
                    isEdit={isEdit}
                    title={"first name"}
                  />
                  <FormikInput
                    label={"lastName"}
                    id={"lastName"}
                    name={"lastName"}
                    placeholder={"Enter your last name..."}
                    type={"text"}
                    isEdit={isEdit}
                    title={"Last name"}
                  />
                  <FormikInput
                    label={"birthday"}
                    id={"birthday"}
                    name={"birthday"}
                    placeholder={"Enter your birthday..."}
                    type={"date"}
                    isEdit={isEdit}
                    title={"birthday"}
                  />
                  <FormikInput
                    label={"homeAddress"}
                    id={"homeAddress"}
                    name={"homeAddress"}
                    placeholder={"Enter your home address..."}
                    type={"text"}
                    isEdit={isEdit}
                    title={"home address"}
                  />
                  <FormikSelect
                    label={"position"}
                    id={"position"}
                    name={"position"}
                    isEdit={isEdit}
                    title={"position"}
                    options={postionOptions!}
                  />
                  <FormikInput
                    label={"career"}
                    id={"career"}
                    name={"career"}
                    placeholder={"Enter your career..."}
                    type={"text"}
                    isEdit={isEdit}
                    title={"career"}
                  />
                  <FormikSelect
                    label={"majorID"}
                    id={"majorID"}
                    name={"majorID"}
                    isEdit={isEdit}
                    title={"major"}
                    options={majorOptions!}
                  />
                  <FormikInput
                    label={"educationPlace"}
                    id={"educationPlace"}
                    name={"educationPlace"}
                    placeholder={"Enter your education place..."}
                    type={"text"}
                    isEdit={isEdit}
                    title={"education place"}
                  />
                  <FormikInput
                    label={"workHistory"}
                    id={"workHistory"}
                    name={"workHistory"}
                    placeholder={"Enter your work history..."}
                    type={"text"}
                    isEdit={isEdit}
                    title={"work history"}
                  />
                  <FormikSelect
                    label={"departmentID"}
                    id={"departmentID"}
                    name={"departmentID"}
                    isEdit={isEdit}
                    title={"department"}
                    options={departmentOptions!}
                  />
                  <FormikInput
                    label={"joinDate"}
                    id={"joinDate"}
                    name={"joinDate"}
                    placeholder={"Enter your join date..."}
                    type={"date"}
                    isEdit={isEdit}
                    title={"join date"}
                  />
                </div>

                {isEdit ? (
                  <div>
                    <button
                      type="submit"
                      className="rounded-[8px] px-[12px] py-[8px] text-[12px] bg-blue-700 text-white dark:shadow-darkPrimaryBlue"
                    >
                      Save
                    </button>
                  </div>
                ) : null}
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default GeneralInformation;
