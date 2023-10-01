import axios from 'axios';
import { getCookie } from 'cookies-next';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest } from 'next/dist/server/web/spec-extension/request'
import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { toast } from 'react-toastify';
import { ValidationError } from 'yup';

function shouldRedirectToSignIn(verify: RequestCookie | undefined, url: string | string[]) {
    return !verify && (url.includes('/blogs') || url.includes('/members') || url.includes('/notifications') || url === "http://localhost:3000/");
}

function shouldRefreshAccessToken(verify: {value:string, expired:number} | undefined) {
    if(!verify) { 
        return false;
    }   
    const accessTokenExpiration = verify.expired || 0;
    const currentTime = Math.floor(Date.now() / 1000);

    return accessTokenExpiration < currentTime;
}

async function refreshAccessToken(req: NextRequest): Promise<boolean> {
    try {
        const access_token = req.cookies.get('accessToken');
        const refresh_token = req.cookies.get('refreshToken')
        if(access_token && refresh_token) {
            const response = await axios.put("https://fudeverapi.bsite.net/api/Auth/refresh-token", {
                AccessToken: access_token,
                RefreshToken: access_token,
            });
            // req.cookies.set("accessToken")
        }
        return true;
    } catch (error:unknown) {
        if (error instanceof ValidationError) {
            if (error?.name === "ValidationError") {
              toast.error(error.errors[0]);
            }
            return false;
          }
          if (axios.isAxiosError(error)) {
            if (
              error.response?.status === 401 ||
              error.response?.status === 404 ||
              error.response?.status === 400
            ) {
              toast.error("Please re-login");
            }
            return false;
          }
        return false;
    }
}

export default function middleware(req: NextRequest): NextResponse<unknown> | undefined {
    let verify = req.cookies.get("refreshToken");
    let url = req.url;

    if (shouldRedirectToSignIn(verify, url)) {
        return NextResponse.redirect("http://localhost:3000/auth/sign-in");
    }

    if (verify && url.includes('/auth')) {
        return NextResponse.redirect("http://localhost:3000/");
    }

    return NextResponse.next();
}
