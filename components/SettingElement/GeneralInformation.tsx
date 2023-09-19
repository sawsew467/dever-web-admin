import React, { useRef, useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { generalInformationSchema } from "@component/SettingElement/Validation/validation";
import FormikSelect from "./FormikSelect";
import FormikInput from "./FormikInput";
import Image from "next/image";
import EditIconAnimate from "@icon/components/Button/edit.gif";
import EditIconPause from "@icon/components/Button/edit_pause.png";

type TGeneralFieldValues = {
  firstName: string;
  lastName: string;
  birthday: string;
  homeAddress: string;
  position: string;
  career: string;
  major: string;
  education: string;
  workHistory: string;
  department: string;
  joinDate: string;
};

function GeneralInformation() {
  const fakeData = {
    id: 0,
    firstName: "Tran Van",
    lastName: "Bao Thang",
    birthday: "2002-02-19",
    homeAddress: "Trieu Son, Trieu Phong, Quang Tri",
    position: "Club President",
    role: "Front-End developer",
    major: "Software Engineering",
    education: "FPT University",
    workHistory: "NAPA Global, Google , Facebook",
    department: "Board of Directors",
    email: "thangtvbde170145@fpt.edu.vn",
    phone: "0828 828 497",
    joinDate: "2021-09-12",
  };

  const position_options = [
    "Member",
    "Secretary",
    "Club President",
    "Vice Club President",
    "Academic Department Head",
    "Vice Academic Department Head",
    "Events Department Head",
    "Vice Events Department Head",
    "Media Department Head",
    "Vice Media Department Head",
    "Administrative Department Head",
    "Vice Administrative Department Head",
  ];

  const major_options = [
    "Artificial Intelligence",
    "Software Engineering",
    "Information Security",
    "Information System",
    "Digital Art Design",
  ];
  const department_options = [
    "Board of Directors",
    "Academic Board",
    "Events Board",
    "Media Board",
    "Administrative Board",
  ];

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const formikRef = useRef<FormikHelpers<TGeneralFieldValues> | null>(null);

  const onSubmit = async (
    values: TGeneralFieldValues,
    actions: FormikHelpers<TGeneralFieldValues>
  ) => {
    console.log(values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    toast.info("Save general information successfully!");
  };

  const handleEditClick = () => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
    setIsEdit(!isEdit);
  };

  return (
    <div className="flex flex-col gap-[20px] p-[24px] shadow-primary rounded-[10px]">
      <div className="flex flex-row justify-between">
        <h3 className="font-[700] text-[24px]">General infomation</h3>
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

      <div>
        <Formik
          initialValues={{
            firstName: fakeData.firstName,
            lastName: fakeData.lastName,
            birthday: fakeData.birthday,
            homeAddress: fakeData.homeAddress,
            position: fakeData.position,
            career: fakeData.role,
            major: fakeData.major,
            education: fakeData.education,
            workHistory: fakeData.workHistory,
            department: fakeData.department,
            joinDate: fakeData.joinDate,
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
                    options={position_options}
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
                    label={"major"}
                    id={"major"}
                    name={"major"}
                    isEdit={isEdit}
                    title={"major"}
                    options={major_options}
                  />
                  <FormikInput
                    label={"education"}
                    id={"education"}
                    name={"education"}
                    placeholder={"Enter your educations..."}
                    type={"text"}
                    isEdit={isEdit}
                    title={"education"}
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
                    label={"department"}
                    id={"department"}
                    name={"department"}
                    isEdit={isEdit}
                    title={"department"}
                    options={department_options}
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
                      className="rounded-[8px] px-[12px] py-[8px] text-[12px] bg-blue-700 text-white"
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
