import axiosClient from '../../ultils/axiosClient/index';

export const END_POINT = {
    APPROVE: "/AppUser/approve/",
    REJECT: "/AppUser/reject/",
    DELETED: "/AppUser/deleted"
}

export const approveUser = (userId: string, access_token: string | null) => {
    return axiosClient.patch(`${END_POINT.APPROVE}${userId}`, null, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
}
export const rejectUser = (userId: string, access_token: string | null) => {
    return axiosClient.post(`${END_POINT.REJECT}${userId}`,null, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
}
export const getAllRemovedUser = (access_token: string | null) => {
    return axiosClient.get(`${END_POINT.DELETED}`, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
}
export const restoreUser = (access_token: string | null, userId:string) => {
    return axiosClient.patch(`${END_POINT.DELETED}/restore/${userId}`, null, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
}
export const deleteUserOutOfDB = (access_token: string | null, userId:string) => {
    return axiosClient.delete(`${END_POINT.DELETED}/${userId}`, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
}