"use client";
import React from "react";
import Image from "next/image";
import { Form, Formik } from "formik";
import { loginSchema } from "@/app/validation";
import InputForm from "@/components/InputForm";
import Link from "next/link";
import Logo from "@image/page/authentication/signin/logo.svg";
import LoginImg from "@image/page/authentication/signin/loginImage.jpg";
function SignIn() {
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
          <div className="max-w-[1024px] h-[581px] shadow-lg bg-white w-full flex items-center rounded-lg overflow-hidden ">
            <div className="">
              <Image
                src={LoginImg}
                alt="Picture of login"
                className="w-full h-[581px] "
              />
            </div>
            <div className=" px-16 w-[calc(100%-387px)]  ">
              <h2 className="text-3xl  leading-9 font-bold mb-8">
                Sign in to FU-DEVER
              </h2>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={loginSchema}
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
                    <div className="mb-6">
                      <div className="text-sm font-medium block leading-5 mb-2">
                        Your password:
                      </div>
                      <InputForm
                        label="password"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                      ></InputForm>
                    </div>
                    <div className="mb-6 flex w-full justify-between items-center">
                      <div className="flex items-center  gap-3">
                        <input
                          id="remember"
                          type="checkbox"
                          className="h-4 w-4 rounded bg-[#F9FAFB] border-[#D1D5DB] outline-[#0065A9] peer-checked:bg-[#0065A9]  "
                        ></input>
                        <p className=" text-sm leading-5 font-medium">
                          Remember me
                        </p>
                      </div>
                      <Link
                        href="/auth/forgot-password"
                        className="text-[#0098FF] text-sm leading-5 font-medium hover:underline"
                      >
                        {" "}
                        Lost Password?
                      </Link>
                    </div>
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="mb-6 bg-[#0065A9] disabled:opacity-50 hover:bg-[#005294] px-5 py-3 leading-6 font-medium rounded-lg text-white text-base"
                    >
                      Login to your account
                    </button>
                    <div className=" text-sm leading-5 font-medium text-[#6B7280]">
                      Not registered?
                      <Link
                        href="/auth/sign-up"
                        className="text-[#0098FF] ml-1  hover:underline"
                      >
                        {" "}
                        Create account
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
