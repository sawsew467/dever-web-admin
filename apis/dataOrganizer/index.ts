import axiosClient from "../../ultils/axiosClient/index";

export const END_POINT = {
  SKILL: "/Skill",
  HOBBY: "/Hobby",
  MAJOR: "/Major",
  DEPARTMENT: "/Department",
  POSITION: "/Position",
  PLATFORM: "/Platform"
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

export const postHobby = (access_token: string | null, value: {hobbyName:string}) => {
  return axiosClient.post(`${END_POINT.HOBBY}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const patchHobby = (access_token: string | null, value: {newName:string}, hobbyId:string) => {
  return axiosClient.patch(`${END_POINT.HOBBY}/${hobbyId}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const deleteHobby = (access_token: string | null, itemId: string) => {
  return axiosClient.delete(`${END_POINT.HOBBY}/${itemId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const getALlSoftDeleteHobbies = (access_token: string | null) => {
  return axiosClient.get(`${END_POINT.HOBBY}/${"deleted/all"}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const deleteHobbyOutOfDB = (access_token: string | null, hobbyId:string) => {
  return axiosClient.delete(
    `${END_POINT.HOBBY}/deleted/${hobbyId}`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};
export const restoreHobby = (access_token: string | null, hobbyId:string) => {
  return axiosClient.patch(
    `${END_POINT.HOBBY}/deleted/restore/${hobbyId}`, null,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};


//Major
export const getAllMajor = (access_token: string | null) => {
  return axiosClient.get(`${END_POINT.MAJOR}/all`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const postMajor = (access_token: string | null, value: {majorName:string}) => {
  return axiosClient.post(`${END_POINT.MAJOR}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const patchMajor = (access_token: string | null, value: {newName:string}, majorId:string) => {
  return axiosClient.patch(`${END_POINT.MAJOR}/${majorId}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const deleteMajor = (access_token: string | null, majorId: string) => {
  return axiosClient.delete(`${END_POINT.MAJOR}/${majorId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const getALlSoftDeleteMajors = (access_token: string | null) => {
  return axiosClient.get(`${END_POINT.MAJOR}/${"deleted/all"}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const deleteMajorOutOfDB = (access_token: string | null, majorId:string) => {
  return axiosClient.delete(
    `${END_POINT.MAJOR}/deleted/${majorId}`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};
export const restoreMajor = (access_token: string | null, majorId:string) => {
  return axiosClient.patch(
    `${END_POINT.MAJOR}/deleted/restore/${majorId}`, null,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};



//Department
export const getAllDepartment = (access_token: string | null) => {
  return axiosClient.get(`${END_POINT.DEPARTMENT}/all`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const postDepartment = (access_token: string | null, value: {departmentName:string}) => {
  return axiosClient.post(`${END_POINT.DEPARTMENT}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const patchDepartment = (access_token: string | null, value: {newName:string}, departmentId:string) => {
  return axiosClient.patch(`${END_POINT.DEPARTMENT}/${departmentId}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const deleteDepartment = (access_token: string | null, departmentId: string) => {
  return axiosClient.delete(`${END_POINT.DEPARTMENT}/${departmentId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const getALlSoftDeleteDepartments = (access_token: string | null) => {
  return axiosClient.get(`${END_POINT.DEPARTMENT}/${"deleted/all"}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const deleteDepartmentOutOfDB = (access_token: string | null, departmentId:string) => {
  return axiosClient.delete(
    `${END_POINT.DEPARTMENT}/deleted/${departmentId}`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};
export const restoreDepartment = (access_token: string | null, departmentId:string) => {
  return axiosClient.patch(
    `${END_POINT.DEPARTMENT}/deleted/restore/${departmentId}`, null,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};

//Position
export const getAllPosition = (access_token: string | null) => {
  return axiosClient.get(`${END_POINT.POSITION}/all`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const postPosition = (access_token: string | null, value: {positionName:string}) => {
  return axiosClient.post(`${END_POINT.POSITION}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const patchPosition = (access_token: string | null, value: {newName:string}, positionId:string) => {
  return axiosClient.patch(`${END_POINT.POSITION}/${positionId}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const deletePosition = (access_token: string | null, positionId: string) => {
  return axiosClient.delete(`${END_POINT.POSITION}/${positionId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const getALlSoftDeletePositions = (access_token: string | null) => {
  return axiosClient.get(`${END_POINT.POSITION}/${"deleted/all"}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const deletePositionOutOfDB = (access_token: string | null, positionId:string) => {
  return axiosClient.delete(
    `${END_POINT.POSITION}/deleted/${positionId}`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};
export const restorePosition = (access_token: string | null, positionId:string) => {
  return axiosClient.patch(
    `${END_POINT.POSITION}/deleted/restore/${positionId}`, null,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};

//Platform
export const getAllPlatform = (access_token: string | null) => {
  return axiosClient.get(`${END_POINT.PLATFORM}/all`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const postPlatform = (access_token: string | null, value: {platformName:string}) => {
  return axiosClient.post(`${END_POINT.PLATFORM}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const patchPlatform = (access_token: string | null, value: {newName:string}, platformId:string) => {
  return axiosClient.patch(`${END_POINT.PLATFORM}/${platformId}`, value, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const deletePlatform = (access_token: string | null, platformId: string) => {
  return axiosClient.delete(`${END_POINT.PLATFORM}/${platformId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const getALlSoftDeletePlatforms = (access_token: string | null) => {
  return axiosClient.get(`${END_POINT.PLATFORM}/${"deleted/all"}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
export const deletePlatformOutOfDB = (access_token: string | null, platformId:string) => {
  return axiosClient.delete(
    `${END_POINT.PLATFORM}/deleted/${platformId}`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};
export const restorePlatform = (access_token: string | null, platformId:string) => {
  return axiosClient.patch(
    `${END_POINT.PLATFORM}/deleted/restore/${platformId}`, null,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};