"use client";
import React from "react";
import Image from "next/image";
import Logo from "@image/page/authentication/signin/logo.svg";
import ResetImg from "@image/page/authentication/reset/resetImage.jpg";
function ResetPassword() {
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
                src={ResetImg}
                alt="Picture of login"
                className="w-full h-[581px] "
              />
            </div>
            <div className=" px-16 w-[calc(100%-387px)]  ">
              <h2 className="text-3xl  leading-9 font-bold">
                Reset your password
              </h2>
              <form className="mt-8">
                <div className="mb-6">
                  <label className="text-sm font-medium block leading-5 mb-2">
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@company.com"
                    className="p-[10px] text-sm font-medium leading-5 w-full border-solid border-[1px] border-[#D1D5DB] outline-[#0065A9] rounded-lg bg-[#F9FAFB]"
                  ></input>
                </div>
                <div className="mb-6">
                  <label className="text-sm font-medium block leading-5 mb-2">
                    New password
                  </label>
                  <input
                    type="new-password"
                    id="password"
                    placeholder="new password"
                    className="p-[10px] font-medium text-sm leading-5 w-full border-solid border-[1px] border-[#D1D5DB] outline-[#0065A9] rounded-lg bg-[#F9FAFB]"
                  ></input>
                </div>
                <div className="mb-6">
                  <label className="text-sm font-medium block leading-5 mb-2">
                    Confirm new password
                  </label>
                  <input
                    type="re-password"
                    id="password"
                    placeholder="confirm new password"
                    className="p-[10px] font-medium text-sm leading-5 w-full border-solid border-[1px] border-[#D1D5DB] outline-[#0065A9] rounded-lg bg-[#F9FAFB]"
                  ></input>
                </div>
                <div className="mb-6 flex w-full justify-between items-center">
                  <div className="flex items-center  gap-3">
                    <input
                      id="accept"
                      type="checkbox"
                      className="h-4 w-4 rounded bg-[#F9FAFB] border-[#D1D5DB] outline-[#0065A9] peer-checked:bg-[#0065A9]  "
                    ></input>
                    <p className=" text-sm leading-5 font-medium">
                      I accept the{" "}
                      <a
                        href="#"
                        className="text-[#0098FF] text-sm leading-5 font-medium hover:underline"
                      >
                        Terms and Conditions
                      </a>
                    </p>
                  </div>
                </div>
                <button className="mb-6 bg-[#0065A9] hover:bg-[#005294] px-5 py-3 leading-6 font-medium rounded-lg text-white text-base">
                  Reset password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
