import { getCookie } from 'cookies-next';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { refreshUserInfoFromStorage } from '@/redux/slices/userInfor';

type EncodeType = {
    email : string;
    sub : string;
    UserRole : string;
    "remember-me" : boolean
  }

function AppProvider({children}:{children:React.ReactNode}) {
    const dispatch = useDispatch();
    const getUserFromCookies = () => {
        const access_token = getCookie("accessToken");
        const refresh_token = getCookie("refreshToken")


        if(access_token && refresh_token) {
            const decoded:EncodeType = jwtDecode(access_token);
            const user = {
                email: decoded!.email,
                sub: decoded!.sub,
                UserRole: decoded!.UserRole,
                remember: decoded!['remember-me']
            };
            return user;
        }
        return null;
    }    
    useEffect(() => {
        const userFromCookies = getUserFromCookies();
        if(userFromCookies) {
            dispatch(refreshUserInfoFromStorage(userFromCookies));
        }
    },[dispatch])

    return <>{children}</>
}

export default AppProvider

