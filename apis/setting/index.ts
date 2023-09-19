import axiosClient from '../../ultils/axiosClient/index';

type avatar = {
    avatarUrl: string;
}

export const END_POINT = {
    UPDATE_AVATAR: "/MemberInfo/avatar"
}

export const updateAvatar = (access_token:string | null, avatar:avatar) => {
    return axiosClient.patch(END_POINT.UPDATE_AVATAR, avatar, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
}