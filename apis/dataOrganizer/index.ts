import axiosClient from '../../ultils/axiosClient/index';

export const END_POINT = {
    SKILL: "/Skill",
    HOBBY: "/Hobby",
    MAJOR: "/Major",
    DEPARTMENT: "/Department",
    POSITION: "/Position"
}

type postValue = {
    value: string;
}

type patchValue = {
    value:string;
    id: string;
}
//Skills
export const getAllSkills = (access_token:string|null) => {
    return axiosClient.get(`https://fudeverapi.bsite.net${END_POINT.SKILL}`,{
        headers: {Authorization: `Bearer ${access_token}`},
    })
}

export const postSkill = (access_token:string|null, value:postValue) => {
    return axiosClient.post(`https://fudeverapi.bsite.net${END_POINT.SKILL}`, value, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
}
export const patchSkill = (access_token:string|null, value:patchValue) => {
    return axiosClient.patch(`https://fudeverapi.bsite.net${END_POINT.SKILL}`, value, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
} 

export const deleteSkill = (access_token:string|null, itemId:string) => {
    return axiosClient.delete(`https://fudeverapi.bsite.net${END_POINT.SKILL}/${itemId}`, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
}
//Hobbies
export const getAllHobbies = (access_token:string|null) => {
    return axiosClient.get(`${END_POINT.HOBBY}`,{
        headers: {Authorization: `Bearer ${access_token}`},
    })
}

export const postHobby = (access_token:string|null, value:postValue) => {
    return axiosClient.post(`${END_POINT.HOBBY}`, value, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
}
export const patchHobby = (access_token:string|null, value:patchValue) => {
    return axiosClient.patch(`${END_POINT.HOBBY}`, value, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
} 

export const deleteHobby = (access_token:string|null, itemId:string) => {
    return axiosClient.delete(`${END_POINT.HOBBY}/${itemId}`, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
}
//Major
export const getAllMajor = (access_token:string|null) => {
    return axiosClient.get(`${END_POINT.MAJOR}`,{
        headers: {Authorization: `Bearer ${access_token}`},
    })
}

export const postMajor = (access_token:string|null, value:postValue) => {
    return axiosClient.post(`${END_POINT.MAJOR}`, value, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
}
export const patchMajor = (access_token:string|null, value:patchValue) => {
    return axiosClient.patch(`${END_POINT.MAJOR}`, value, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
} 

export const deleteMajor = (access_token:string|null, itemId:string) => {
    return axiosClient.delete(`${END_POINT.MAJOR}/${itemId}`, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
}
//Department
export const getAllDepartment = (access_token:string|null) => {
    return axiosClient.get(`${END_POINT.DEPARTMENT}`,{
        headers: {Authorization: `Bearer ${access_token}`},
    })
}

export const postDepartment = (access_token:string|null, value:postValue) => {
    return axiosClient.post(`${END_POINT.DEPARTMENT}`, value, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
}
export const patchDepartment = (access_token:string|null, value:patchValue) => {
    return axiosClient.patch(`${END_POINT.DEPARTMENT}`, value, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
} 

export const deleteDepartment = (access_token:string|null, itemId:string) => {
    return axiosClient.delete(`${END_POINT.DEPARTMENT}/${itemId}`, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
}
//Position
export const getAllPosition = (access_token:string|null) => {
    return axiosClient.get(`${END_POINT.POSITION}`,{
        headers: {Authorization: `Bearer ${access_token}`},
    })
}

export const postPosition = (access_token:string|null, value:postValue) => {
    return axiosClient.post(`${END_POINT.POSITION}`, value, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
}
export const patchPosition = (access_token:string|null, value:patchValue) => {
    return axiosClient.patch(`${END_POINT.POSITION}`, value, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
} 

export const deletePosition = (access_token:string|null, itemId:string) => {
    return axiosClient.delete(`${END_POINT.POSITION}/${itemId}`, {
        headers: {Authorization: `Bearer ${access_token}`},
    })
}
