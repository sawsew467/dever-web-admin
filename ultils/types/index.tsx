export type memberType = {
  id: string;
  fullName: string;
  avatarUrl: string;
  email: string;
  position: string;
  department: string;
  status: string;
};

export type memberPros = {
  id: string;
  fullName: string;
  avatarUrl: string;
  email: string;
  position: string;
  department: string;
  status: string;
  isSelected: boolean;
};
export type objectItemOne = {
  value: string;
};
export type userInfo = {
  id: string;
  firstName: string;
  lastName: string;
  career: string;
  birthDay: string;
  email: string;
  homeAddress: string;
  phoneNumber: string;
  aboutMe: string;
  joinDate: string;
  educationPlaceNames: string;
  positionId: string;
  positionName: string;
  majorId: string;
  majorName: string;
  departmentId: string;
  departmentName: string;
  avatarUrl: string;
  userPlatforms: any;
  workplaces: string;
  userSkills: string[];
  userHobbies: string[];
  userProjects: any;
};


export type TProjectCreateFieldsValue = {
  title: string;
  sourceCode: string;
  production: string;
};

export type TAppUserProject = {
  createdAt: string;
  demoUrl: string;
  description: string;
  projectId: string;
  projectUrl: string;
  thumbnailUrl: string;
  title: string;
  updatedAt: string;
};

export type TResume = {
  id: string;
  fullName: string;
  email: string;
  studentId: string;
  data: any;
  selected: boolean;
};