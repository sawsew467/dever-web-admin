import axiosClient from '../../ultils/axiosClient/index';

type avatar = {
    avatarUrl: string;
}

export const END_POINT = {
    UPDATE_AVATAR: "/MemberInfo/avatar",
    UPDATE_ABOUT: "/MemberInfo/about"
}

export const updateAvatar = (access_token:string | null, avatar:avatar) => {
    return axiosClient.patch(END_POINT.UPDATE_AVATAR, avatar, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
}
export const updateAbout = (access_token:string | null, bio:string)  => {
    return axiosClient.patch(END_POINT.UPDATE_ABOUT, bio, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
}