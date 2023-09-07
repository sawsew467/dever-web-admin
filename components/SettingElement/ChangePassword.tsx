import React, { useState, useRef } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { changePasswordSchema } from "@component/SettingElement/Validation/validation";
import FormikInput from "./FormikInput";
import Image from "next/image";

import EditIconAnimate from "@icon/components/Button/edit.gif";
import EditIconPause from "@icon/components/Button/edit_pause.png";

type TPasswordFieldValue = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

function ChangePassword(): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const formikRef = useRef<FormikHelpers<TPasswordFieldValue> | null>(null);

  const onSubmit = async (
    values: TPasswordFieldValue,
    actions: FormikHelpers<TPasswordFieldValue>
  ) => {
    console.log(values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    toast.info("Changed passsword successfully!");
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
        <h3 className="font-[700] text-[24px]">Change password</h3>
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
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={changePasswordSchema}
          onSubmit={onSubmit}
        >
          {(formikProps) => {
            // Store the Formik instance in the ref
            formikRef.current = formikProps;

            return (
              <Form>
                <div className="flex flex-col gap-[20px]">
                  <FormikInput
                    label="currentPassword"
                    id="currentPassword"
                    name="currentPassword"
                    placeholder="Enter your current password..."
                    type="password"
                    isEdit={isEdit}
                    title="Current password"
                  />
                  <FormikInput
                    label="newPassword"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Enter your new password..."
                    type="password"
                    isEdit={isEdit}
                    title="New password"
                  />
                  <FormikInput
                    label="confirmNewPassword"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    placeholder="Confirm your new password..."
                    type="password"
                    isEdit={isEdit}
                    title="Confirm new password"
                  />

                  <div className="text-[14px]">
                    <h3 className="font-[800]">Password requirements:</h3>
                    <h4 className="font-[700]">
                      Ensure that these requirements are met:
                    </h4>
                    <ul className="font-[300] list-disc ml-[24px]">
                      <li>At least 8 characters (and up to 100 characters)</li>
                      <li>At least one lowercase character</li>
                      <li>
                        Inclusion of at least one special character, e.g., ! @ #
                        ?
                      </li>
                    </ul>
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
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default ChangePassword;