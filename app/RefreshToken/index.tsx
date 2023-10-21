"use-client";
import { getCookie, setCookie } from "cookies-next";
import React, { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
import { ValidationError } from "yup";
import jwtDecode from "jwt-decode";

type verify = {
  value: string;
  expired: number;
};

function RefreshToken() {
  const access_token = getCookie("accessToken");
  const refresh_token = getCookie("refreshToken");
  const remember = getCookie("rememer?")?.toString();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const expiredInTime = getCookie("expiredInTime?");

  const shouldRefreshAccessToken = (verify: verify | undefined): boolean => {
    if (!verify) {
      return false;
    }
    const accessTokenExpiration = verify.expired || 0;
    const currentTime = Math.floor(Date.now() / 1000);
    return accessTokenExpiration < currentTime;
  };

  const refreshAccessToken = async (): Promise<boolean> => {
    try {
      if (refresh_token) {
        const res = await axios.post(
          "https://fudeverapi.bsite.net/api/Auth/refresh-access-token",
          {
            refreshToken: refresh_token,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = res.data.body;
        console.log(data);
        if (remember === 'true' && expiredInTime) {
          setCookie("refreshToken", data.refreshToken, {
            expires: new Date(parseInt(expiredInTime)) 
          });
          setCookie("accessToken", data.accessToken, {
            expires: new Date(parseInt(expiredInTime))
          });
        } else {
          setCookie("refreshToken", data.refreshToken);
          setCookie("accessToken", data.accessToken);
        }
      }
      return true;
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        if (error?.name === "ValidationError") {
          console.error(error.errors[0]);
        }
        return false;
      }
      if (axios.isAxiosError(error)) {
        if (
          error.response?.status === 401 ||
          error.response?.status === 404 ||
          error.response?.status === 403 ||
          error.response?.status === 400 ||
          error.response?.status === 500
        ) {
          console.log(error?.response?.data?.errorMessages);
        }
        return false;
      }
      return false;
    }
  };

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log("route: " + url);
      if (access_token) {
        let decode: { nbf: number; exp: number } = jwtDecode(access_token);
        let verifyToken = {
          value: access_token,
          expired: decode!.exp,
        };
        console.log("should: " + shouldRefreshAccessToken(verifyToken));
        console.log(expiredInTime)
        console.log(new Date(parseInt(expiredInTime!)));
        
        if (shouldRefreshAccessToken(verifyToken)) {
          console.log("refreshing token...");
          const refreshed = refreshAccessToken();
          if (!refreshed) {
            router.push("/auth/sign-in");
          }
        }
      }
    };
    const url = pathname + searchParams.toString();
    return handleRouteChange(url);
  });

  return <></>;
}

export default RefreshToken;
