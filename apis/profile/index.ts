import axiosClient from '../../ultils/axiosClient/index';

export const END_POINT = {
        GET_ALL: "/MemberInfo",
        GET: "/MemberInfo/",
        DELETE: "/MemberInfo/",
}

export const getAllMemberInfo = (access_token:string | null) => {
    return axiosClient.get(END_POINT.GET_ALL, {
        headers: {Authorization: `Bearer ${access_token}`},
    });
}
export const getMemberInfo = (userId:string, access_token:string | null) => {
    return axiosClient.get(`${END_POINT.GET}${userId}`, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
}
export const deleteMemberInfo = (userId:string, access_token:string | null) => {
    return axiosClient.delete(`${END_POINT.DELETE}${userId}`, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
}