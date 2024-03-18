import axiosClient from "../../ultils/axiosClient/index";

export const END_POINT = {
  CV: "/Cv",
};

export const getAllCv = (access_token: string | null) => {
  return axiosClient.get(END_POINT.CV, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
export const getAllCvByStudentId = (
  access_token: string | null,
  studentId: string | null
) => {
  return axiosClient.get(`${END_POINT.CV}/${studentId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
export const getCvById = (access_token: string | null, cvId: string | null) => {
  return axiosClient.get(`${END_POINT.CV}/download/${cvId}`, {
    responseType: "arraybuffer",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
export const deleteCVByID = (access_token: string | null, cvId: string | null) => {
    return axiosClient.delete(`${END_POINT.CV}/${cvId}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        }
    })
}
