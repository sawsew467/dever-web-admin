export type memberType = {
  id: string;
  fullname: string;
  avatarUrl: string;
  email: string;
  position: string;
  department: string;
  status: {
    value: string;
  };
};

export type memberPros = {
  id: string;
  fullName: string;
  avatarUrl: string;
  email: string;
  position: string;
  department: string;
  status: string,
  isSelected: boolean;
};
export type objectItemOne = {
  value: string;
};
export type userInfo = {
  aboutMe: string;
  avatarUrl: string;
  birthday: string;
  career: string;
  departmentName: string;
  educationPlaceName: string;
  email: string;
  fullName: string;
  homeAddress: string;
  id: string;
  joinDate: string;
  majorName: string;
  memberHobbies: [];
  memberSkills: [];
  memberSoicalLinks: string[];
  workHistory: string;
  phoneNumber: string;
  positionName: string;
};
