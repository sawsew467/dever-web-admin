import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

import EditIconAnimate from "@icon/components/Button/edit.gif";
import EditIconPause from "@icon/components/Button/edit_pause.png";
import { Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { contactInformationSchema } from "./Validation/validation";
import FormikInput from "./FormikInput";
import { getCookie } from "cookies-next";
import { updateContactInfo } from "@/apis/setting";
import { isAxiosError } from "axios";

type TContactFieldValue = {
  phone: string;
  email: string;
};

function ContactInfomation({ phone, email }: TContactFieldValue): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const formikRef = useRef<FormikHelpers<TContactFieldValue> | null>(null);

  const fakeData = {
    phone: "0828828497",
    email: "thangtvbde170145@fpt.edu.vn",
  };

  const onSubmit = async (
    values: TContactFieldValue,
    actions: FormikHelpers<TContactFieldValue>
  ) => {
    console.log(values);
    try {
      const userId = getCookie("userId");
      const access_token = getCookie("accessToken");
      if (access_token && userId) {
        const contactInfo = {
          userId: userId,
          phoneNumber: values.phone,
          email: values.email,
        };
        await updateContactInfo(access_token, contactInfo);
        toast.success("Update contact information successfully!");
      }
    } catch (error) {
      if(isAxiosError(error)) {        
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
    <div className="flex flex-col gap-[20px] shadow-primary p-[24px] rounded-[10px]">
      <div className="flex flex-row justify-between items-center">
        <h3 className="font-[700] text-[24px]">Contact information</h3>
        <button
          className="w-[28px] h-[28px] flex items-center justify-center hover:scale-125 rounded-[50%] hover:border-[1px] hover:border-blue-700 cursor-pointer transition"
          onClick={() => {
            handleEditClick();
          }}
        >
          <Image
            src={isEdit ? EditIconAnimate : EditIconPause}
            alt="Edit"
            width={18}
            height={18}
          ></Image>
        </button>
      </div>

      <div>
        <Formik
          initialValues={{
            phone: phone,
            email: email,
          }}
          validationSchema={contactInformationSchema}
          onSubmit={onSubmit}
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
    </div>
  );
}

export default ContactInfomation;
