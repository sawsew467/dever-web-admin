import axiosClient from "../../ultils/axiosClient/index";

export const END_POINT = {
  APPUSER: "/AppUser",
};

export const getAllMemberInfo = (access_token: string | null) => {
  return axiosClient.get(END_POINT.APPUSER, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const getMemberInfo = (userId: string, access_token: string | null) => {
  return axiosClient.get(`${END_POINT.APPUSER}/${userId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const deleteMemberInfo = (
  userId: string,
  access_token: string | null
) => {
  return axiosClient.delete(`${END_POINT.APPUSER}/${userId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
