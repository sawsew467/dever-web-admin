"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/userInfor";
import { loginAccount } from "../../../apis/auth";
import Image from "next/image";
import { Form, Formik } from "formik";
import { loginSchema } from "@/app/validation";
import InputForm from "@/components/InputForm";
import Link from "next/link";
import Logo from "@image/page/authentication/signin/logo.svg";
import LoginImg from "@image/page/authentication/signin/loginImage.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import { ValidationError } from "yup";
import jwt_decode from "jwt-decode";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme} from "@mui/material";
import { PiWarningFill } from "react-icons/pi";

type UserLogin = {
  email: string;
  password: string;
  remember: boolean;
};

type EncodeType = {
  sub: string;
  role: string;
};

function SignIn() {
  const dispatch = useDispatch();
  const [remember, setRemember] = useState(false);
  const onHandleChoiceRemember = (status: boolean) => {
    setRemember(status);
  };
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const onSubmit = async (values: UserLogin, actions: any) => {
    try {
      values.remember = remember;
      const loginResponse = await loginAccount(values);
      const data = loginResponse.data;
      const token = {
        accessToken: data.body.accessToken,
        refreshToken: data.body.refreshToken,
      };

      const decoded: EncodeType = jwt_decode(token.accessToken);

      const userInfo = {
        id: decoded!.sub,
        email: data.body.userCredentials.email,
        avatarUrl: data.body.userCredentials.avatarUrl,
        role: decoded!.role,
        remember: values.remember,
      };

      dispatch(
        login({
          token,
          userInfo,
        })
      );
      toast.success("Login success !");
      setTimeout(() => {
        router.push("/");
      }, 500);

    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        if (error?.name === "ValidationError") {
          toast.error(error.errors[0]);
        }
      }
      if (axios.isAxiosError(error)) {
        console.log(error);
        if (error.response?.data.responseStatusCode === 2) {
          toast.error(error?.response?.data?.errorMessages[0]);
        }
        if (error.response?.data.responseStatusCode === 3) {
          toast.error(error?.response?.data?.errorMessages[0]);
        }
        if (error.response?.data.responseStatusCode === 4) {
          toast.error(error?.response?.data?.errorMessages[0]);
        }
        if (error.response?.data.responseStatusCode === 5) {
          toast.warning(error?.response?.data?.errorMessages[0]);
        }
        if (error.response?.data.responseStatusCode === 6) {
          toast.warning(error?.response?.data?.errorMessages[0]);
        }
        if (error.response?.data.responseStatusCode === 7) {
          toast.warning(error?.response?.data?.errorMessages[0]);
        }
        if (error.response?.data.responseStatusCode === 8) {
          toast.warning(error?.response?.data?.errorMessages[0]);
        }
        if (error.response?.data.responseStatusCode === 9) {
          toast.warning(error?.response?.data?.errorMessages[0]);
        }
        if (error.response?.data.responseStatusCode === 18) {
          toast.warning(error?.response?.data?.errorMessages[0]);
        }
        if (error.response?.data.responseStatusCode === 17) {
          toast.warning(error?.response?.data?.errorMessages[0]);
        }
        if (error.response?.data.responseStatusCode === 15) {
          toast.warning(error?.response?.data?.errorMessages[0]);
        }
        if (error.response?.data.responseStatusCode === 19) {
          // toast.warning(error?.response?.data?.errorMessages[0]);
          actions.resetForm();
          setOpen(true);
        }
      }
    }
  };

  return (
    <section>
      <div className="h-screen w-full flex justify-center bg-[#F9FAFB] dark:bg-[#F9FAFB] bg-opacity-50 items-center">
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
                initialValues={{ email: "", password: "", remember }}
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
                          onClick={() => onHandleChoiceRemember(!remember)}
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

      <Dialog
        PaperProps={{

        }}
        fullScreen={fullScreen}
        open={open}
        onClose={() => {setOpen(false)}}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <div className="flex flex-row gap-[8px]">
            <PiWarningFill className = "text-red-500 text-[32px]"/>
            <p>Warning!</p>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{color: "black", fontSize: "semibold"}}>
            Your account has been banned by admin for some reason!
            <br/>
            Please contact admin to restore your account!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpen(false)}} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </section>
  );
}

export default SignIn;
