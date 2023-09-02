"use client";
import React from "react";
import Image from "next/image";
import Logo from "@image/page/authentication/signin/logo.svg";
import LoginImg from "@image/page/authentication/signin/loginImage.jpg";
function SignIn() {
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
              <h2 className="text-3xl  leading-9 font-bold">
                Sign in to FU-DEVER
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
                    Your password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="password"
                    className="p-[10px] font-medium text-sm leading-5 w-full border-solid border-[1px] border-[#D1D5DB] outline-[#0065A9] rounded-lg bg-[#F9FAFB]"
                  ></input>
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
                  <a
                    href="#"
                    className="text-[#0098FF] text-sm leading-5 font-medium hover:underline"
                  >
                    Lost Password?
                  </a>
                </div>
                <button className="mb-6 bg-[#0065A9] hover:bg-[#005294] px-5 py-3 leading-6 font-medium rounded-lg text-white text-base">
                  Log in to your account
                </button>
                <div className=" text-sm leading-5 font-medium text-[#6B7280]">
                  Not registered?
                  <a href="#" className="text-[#0098FF] ml-1  hover:underline">
                    Create account
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
