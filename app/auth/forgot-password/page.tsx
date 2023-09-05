"use client";
import React from "react";
import { Form, Formik } from "formik";
import Image from "next/image";
import Logo from "@image/page/authentication/signin/logo.svg";
import InputForm from "@/components/InputForm";
import { resetSchema } from "@/app/validation";
function ForgotPassword() {
  const onSubmit = async (values: object, actions: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    alert("success");
  };
  return (
    <section>
      <div className="h-screen w-full flex justify-center bg-[#F9FAFB] bg-opacity-50 items-center">
        <div className="flex flex-col max-w-[1440px] mt-6  justify-center items-center w-full ">
          <a href="#">
            <Image
              src={Logo}
              alt="Picture of the author"
              className="w-[210px] h-auto mb-10"
            />
          </a>
          <div className="p-16 max-w-[640px] shadow-lg w-full bg-white rounded-lg overflow-hidden ">
            <h2 className="text-3xl  leading-9 font-bold mb-3">
              Forgot your password?
            </h2>
            <p className="leading-6 text-base font-normal text-[#6B7280] mb-8">
              Don&apos;t fret! Just type in your email and we will send you a
              code to reset your password!
            </p>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={resetSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-6">
                    <div className="text-sm font-medium block leading-5 mb-2">
                      Your email:
                    </div>
                    <InputForm
                      label="email"
                      name="email"
                      type="email"
                      id="email"
                      placeholder="name@company.com"
                    ></InputForm>
                  </div>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="mb-6 bg-[#0065A9] disabled:opacity-50 hover:bg-[#005294] px-5 py-3 leading-6 font-medium rounded-lg text-white text-base"
                  >
                    Reset password
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
