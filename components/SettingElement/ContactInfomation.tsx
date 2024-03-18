import React, { useRef, useState, useEffect, SetStateAction } from "react";

import { Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { contactInformationSchema } from "./Validation/validation";
import FormikInput from "./FormikInput";
import { getCookie } from "cookies-next";
import { updateContactInfo } from "@/apis/setting";
import { isAxiosError } from "axios";
import { PiPencilSimpleFill, PiPencilSimpleLineFill } from "react-icons/pi";
import { setIsBackdrop } from "@/redux/slices/app";
import { useDispatch } from "react-redux";
import { setUserEmail } from "@/redux/slices/userInfor";
import { userInfo } from "@/ultils/types";

type TContactFieldValue = {
  phone: string;
  email: string;
};

type TProps = {
  userData: userInfo;
  setUserData: React.Dispatch<SetStateAction<userInfo | null>>
  refreshApi: () => void;
}

function ContactInfomation({ userData, refreshApi, setUserData }: TProps): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const formikRef = useRef<FormikHelpers<TContactFieldValue> | null>(null);
  const dispatch = useDispatch();

  const onSubmit = async (
    values: TContactFieldValue,
    actions: FormikHelpers<TContactFieldValue>
  ) => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token && userData.id) {
        const contactInfo = {
          userId: userData.id,
          phoneNumber: values.phone,
          email: values.email,
        };
        const updateUserData = {
          phoneNumber: values.phone,
          email: values.email,
        }
        dispatch(setIsBackdrop(true));
        await updateContactInfo(access_token, contactInfo);
        setUserData({
          ...userData,
          ...updateUserData,
        })
        dispatch(setUserEmail(contactInfo.email));
        dispatch(setIsBackdrop(false));
        refreshApi();
        setIsEdit(false);
        toast.success("Update contact information successfully!");
      }
    } catch (error) {
      if(isAxiosError(error)) {        
        dispatch(setIsBackdrop(false));
        toast.error(error?.response?.data?.errorMessages[0])
      }
    }
  };

  const handleEditClick = () => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
    setIsEdit(!isEdit);
  };

  return (
    <div className="flex flex-col gap-[20px] shadow-primary dark:shadow-darkPrimary dark:text-white p-[24px] rounded-[10px]">
      <div className="flex flex-row justify-between items-center">
        <h3 className="font-[700] text-[24px]">Contact information</h3>
        <button
          className={`w-[28px] h-[28px] flex items-center justify-center hover:scale-125 rounded-[50%] hover:border-[1px] hover:border-blue-700 cursor-pointer transition ${isEdit ? "bg-blue-700 text-white" :  ""} `}
          onClick={() => {
            handleEditClick();
          }}
        >
          {isEdit ? <PiPencilSimpleLineFill/> : <PiPencilSimpleFill/>}
        </button>
      </div>

      <div>
        <Formik
          initialValues={{
            phone: userData.phoneNumber,
            email: userData.email,
          }}
          validationSchema={contactInformationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(formikProps) => {
            formikRef.current = formikProps;
            return (
              <Form>
                <div className="flex flex-col gap-[20px]">
                  <FormikInput
                    label={"phone"}
                    id={"phone"}
                    name={"phone"}
                    placeholder={"Enter your phone..."}
                    type={"text"}
                    isEdit={isEdit}
                    title={"Phone number"}
                  />
                  <FormikInput
                    label={"email"}
                    id={"email"}
                    name={"email"}
                    placeholder={"Enter your email..."}
                    type={"email"}
                    isEdit={isEdit}
                    title={"email"}
                  />
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
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default ContactInfomation;
