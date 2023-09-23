import axiosClient from "../../ultils/axiosClient/index";

type avatar = {
  avatarUrl: string;
};

type socialValue = {
  platformId: string;
  value: string;
};

type generalValueInfo = {
  firstName: string;
  lastName: string;
  birthday: string;
  homeAddress: string;
  career: string;
  majorID: string;
  educationPlaceID: string;
  workHistory: string;
  departmentID: string;
  joinDate: string;
};

export const END_POINT = {
  UPDATE_AVATAR: "/MemberInfo/avatar",
  UPDATE_ABOUT: "/MemberInfo/about",
  GENERAL_INFO: "/MemberInfo/general-info",
  SOCIAL: "/social-link",
  PLATFORM: "/Platform",
  SKILLS: "/member-skill",
  HOBBIES: "/member-hobby",
};

//update avatar
export const updateAvatar = (access_token: string | null, avatar: avatar) => {
  return axiosClient.patch(END_POINT.UPDATE_AVATAR, avatar, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
//update about
export const updateAbout = (access_token: string | null, bio: string) => {
  return axiosClient.patch(END_POINT.UPDATE_ABOUT, bio, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
//general-info
export const patchGeneralInfo = (
  access_token: string | null,
  generalValue: generalValueInfo
) => {
  return axiosClient.patch(END_POINT.GENERAL_INFO, generalValue, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
//social accounts
export const getAllAccountsByUserId = (
  access_token: string | null,
  userId: string
) => {
  return axiosClient.get(`${END_POINT.SOCIAL}/${userId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const deleteSocialAccount = (
  access_token: string | null,
  platformId: string
) => {
  return axiosClient.delete(`${END_POINT.SOCIAL}/${platformId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const postSocialAccount = (
  access_token: string | null,
  socialValue: socialValue
) => {
  return axiosClient.post(END_POINT.SOCIAL, socialValue, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const patchSocialAccount = (
  access_token: string | null,
  socialValue: socialValue
) => {
  return axiosClient.post(END_POINT.SOCIAL, socialValue, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const getAllPlatform = (access_token: string | null) => {
  return axiosClient.get(END_POINT.PLATFORM, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
//skills
export const getMemberSkill = (access_token: string | null, userId: string) => {
  return axiosClient.get(`${END_POINT.SKILLS}/${userId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const postMemberSkill = (
  access_token: string | null,
  value: string[]
) => {
  return axiosClient.post(`${END_POINT.SKILLS}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
//hobby
export const getMemberHobby = (access_token: string | null, userId: string) => {
  return axiosClient.get(`${END_POINT.HOBBIES}/${userId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const postMemberHobby = (
  access_token: string | null,
  value: string[]
) => {
  return axiosClient.post(`${END_POINT.HOBBIES}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
