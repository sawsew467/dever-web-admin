import { getCookie } from 'cookies-next';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { refreshUserInfoFromStorage } from '@/redux/slices/userInfor';
import { setIsDarkMode } from '@/redux/slices/app';

type EncodeType = {
    sub:string,
    role: string,
};

function AppProvider({children}:{children:React.ReactNode}) {
    const dispatch = useDispatch();
    const getUserFromCookies = () => {
        const access_token = getCookie("accessToken");
        const refresh_token = getCookie("refreshToken")


        if(access_token && refresh_token) {
            const decoded:EncodeType = jwtDecode(access_token);
            const currentUser = {
                id: decoded!.sub,
                email: '',
                avatarUrl: '',
                role: decoded!.role,
                remember: null,
            }

            return currentUser;
        }
        return null;
    }    
    useEffect(() => {
        const userFromCookies = getUserFromCookies();
        if(userFromCookies) {
            dispatch(refreshUserInfoFromStorage(userFromCookies));
        }

        const theme = JSON.parse(localStorage.getItem('theme')!)
        if(window.matchMedia('(prefers-color-scheme: dark)').matches && theme == null) {
            document.documentElement.classList.toggle('dark');
            dispatch(setIsDarkMode(true));
        } else if(theme === 'light') {
            document.documentElement.classList.remove('dark');
            dispatch(setIsDarkMode(false));
        }

    },[dispatch])

    return <>{children}</>
}

export default AppProvider

