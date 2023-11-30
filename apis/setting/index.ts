import axiosClient from "../../ultils/axiosClient/index";

type avatarInfo = {
  userId: string;
  avatarUrl: string;
};
type aboutUser = {
  userId: string;
  aboutMe: string;
};

type userSkills = {
  userId: string;
  skills: string[];
};
type userHobbies = {
  userId: string;
  hobbies: string[];
};
type userContact = {
  userId: string;
  phoneNumber: string;
  email: string;
};

type socialValue = {
  userId: string;
  platformId: string;
  url: string;
};

type generalValueInfo = {
  userId: string;
  firstName: string;
  lastName: string;
  birthday: string;
  homeAddress: string;
  career: string;
  majorID: string;
  educationPlaces: string;
  workplaces: string;
  departmentID: string;
  joinDate: string;
};

type ProjectPostValue = {
  title: string;
  authorId: string;
  description: string;
  projectUrl: string;
  demoUrl: string;
  thumbnailUrl: string;
};

export const END_POINT = {
  UPDATE_AVATAR: "/AppUser/avatar",
  UPDATE_ABOUT: "/AppUser/about-me",
  GENERAL_INFO: "/AppUser/general-info",
  SOCIAL: "/AppUser/platform",
  PLATFORM: "/Platform",
  SKILLS: "/AppUser/skill",
  HOBBIES: "/AppUser/hobby",
  CONTACT: "/AppUser/contact-info",
  PROJECT: "/AppUser/project",
};

//update avatar
export const updateAvatar = (
  access_token: string | null,
  avatarInfo: avatarInfo
) => {
  return axiosClient.patch(END_POINT.UPDATE_AVATAR, avatarInfo, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
//update about
export const updateAbout = (access_token: string | null, bio: aboutUser) => {
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
  deleteValue: { userId: string; platformId: string }
) => {
  return axiosClient.delete(`${END_POINT.SOCIAL}`, {
    headers: { Authorization: `Bearer ${access_token}` },
    data: {
      userId: deleteValue.userId,
      platformId: deleteValue.platformId,
    },
  });
};

export const postSocialAccount = (
  access_token: string | null,
  socialValue: socialValue
) => {
  return axiosClient.put(END_POINT.SOCIAL, socialValue, {
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
  return axiosClient.get(`${END_POINT.PLATFORM}/all`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const postMemberSkill = (
  access_token: string | null,
  value: userSkills
) => {
  return axiosClient.patch(`${END_POINT.SKILLS}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const postMemberHobby = (
  access_token: string | null,
  value: userHobbies
) => {
  return axiosClient.patch(`${END_POINT.HOBBIES}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
//contact
export const updateContactInfo = (
  access_token: string | null,
  value: userContact
) => {
  return axiosClient.patch(`${END_POINT.CONTACT}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
//project
export const getAllProjectByUserId = (
  access_token: string | null,
  userId: string
) => {
  return axiosClient.get(`${END_POINT.PROJECT}/${userId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const postProject = (
  access_token: string | null,
  value: ProjectPostValue
) => {
  return axiosClient.post(`${END_POINT.PROJECT}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const deleteProject = (
  access_token: string | null,
  projectId: string,
  authorId: string
) => {
  return axiosClient.delete(`${END_POINT.PROJECT}`, {
    headers: { Authorization: `Bearer ${access_token}` },
    data: {
      projectId: projectId,
      authorId: authorId,
    },
  });
};

export const updateProject = (
  access_token: string | null,
  projectId: string,
  value: ProjectPostValue
) => {
  return axiosClient.put(`${END_POINT.PROJECT}/${projectId}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
