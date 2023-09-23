import axiosClient from '../../ultils/axiosClient/index';

export const END_POINT = {
    APPROVE: "/AppUser/approve/",
    REJECT: "/AppUser/reject/",
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