import axiosClient from "../../ultils/axiosClient/index";

export const END_POINT = {
  SKILL: "/Skill",
  HOBBY: "/Hobby",
  MAJOR: "/Major",
  DEPARTMENT: "/Department",
  POSITION: "/Position",
  EDUCATION: "/EducationPlace",
};

type postValue = {
  value: string;
};

type patchValue = {
  value: string;
  id: string;
};
//Skills
export const getAllSkills = (access_token: string | null) => {
  return axiosClient.get(`${END_POINT.SKILL}/all`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const postSkill = (access_token: string | null, value: {skillName:string}) => {
  return axiosClient.post(
    `${END_POINT.SKILL}`,
    value,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};
export const patchSkill = (access_token: string | null, value: {newName:string}, skillId: string) => {
  return axiosClient.patch(
    `${END_POINT.SKILL}/${skillId}`,
    value,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};

export const deleteSkill = (access_token: string | null, skillId: string) => {
  return axiosClient.delete(
    `${END_POINT.SKILL}/${skillId}`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};
export const getALlSoftDeleteSkills = (access_token: string | null) => {
  return axiosClient.get(
    `${END_POINT.SKILL}/${"deleted/all"}`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};
export const deleteSkillOutOfDB = (access_token: string | null, skillId:string) => {
  return axiosClient.delete(
    `${END_POINT.SKILL}/deleted/${skillId}`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};
export const restoreSkill = (access_token: string | null, skillId:string) => {
  return axiosClient.patch(
    `${END_POINT.SKILL}/deleted/restore/${skillId}`, null,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};



//Hobbies
export const getAllHobbies = (access_token: string | null) => {
  return axiosClient.get(`${END_POINT.HOBBY}/all`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const postHobby = (access_token: string | null, value: postValue) => {
  return axiosClient.post(`${END_POINT.HOBBY}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const patchHobby = (access_token: string | null, value: patchValue) => {
  return axiosClient.patch(`${END_POINT.HOBBY}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const deleteHobby = (access_token: string | null, itemId: string) => {
  return axiosClient.delete(`${END_POINT.HOBBY}/${itemId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
//Major
export const getAllMajor = (access_token: string | null) => {
  return axiosClient.get(`${END_POINT.MAJOR}/all`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const postMajor = (access_token: string | null, value: postValue) => {
  return axiosClient.post(`${END_POINT.MAJOR}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const patchMajor = (access_token: string | null, value: patchValue) => {
  return axiosClient.patch(`${END_POINT.MAJOR}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const deleteMajor = (access_token: string | null, itemId: string) => {
  return axiosClient.delete(`${END_POINT.MAJOR}/${itemId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
//Department
export const getAllDepartment = (access_token: string | null) => {
  return axiosClient.get(`${END_POINT.DEPARTMENT}/all`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const getDepartment = (access_token: string | null, departmentId:string) => {
  return axiosClient.get(`${END_POINT.DEPARTMENT}/${departmentId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const postDepartment = (
  access_token: string | null,
  value: postValue
) => {
  return axiosClient.post(`${END_POINT.DEPARTMENT}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const patchDepartment = (
  access_token: string | null,
  value: patchValue
) => {
  return axiosClient.patch(`${END_POINT.DEPARTMENT}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const deleteDepartment = (
  access_token: string | null,
  itemId: string
) => {
  return axiosClient.delete(`${END_POINT.DEPARTMENT}/${itemId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
//Position
export const getAllPosition = (access_token: string | null) => {
  return axiosClient.get(`${END_POINT.POSITION}/all`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const postPosition = (access_token: string | null, value: postValue) => {
  return axiosClient.post(`${END_POINT.POSITION}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const patchPosition = (
  access_token: string | null,
  value: patchValue
) => {
  return axiosClient.patch(`${END_POINT.POSITION}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const deletePosition = (access_token: string | null, itemId: string) => {
  return axiosClient.delete(`${END_POINT.POSITION}/${itemId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
//Education
export const getAllEducation = (access_token: string | null) => {
  return axiosClient.get(`${END_POINT.EDUCATION}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const postEducation = (
  access_token: string | null,
  value: postValue
) => {
  return axiosClient.post(`${END_POINT.EDUCATION}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const patchEducation = (
  access_token: string | null,
  value: patchValue
) => {
  return axiosClient.patch(`${END_POINT.EDUCATION}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const deleteEducation = (
  access_token: string | null,
  itemId: string
) => {
  return axiosClient.delete(`${END_POINT.EDUCATION}/${itemId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
