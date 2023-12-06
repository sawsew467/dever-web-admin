import * as yup from "yup";

const passwordRule = /^(?=.*[a-z])(?=.*[!@#?])[A-Za-z!@#?.0-9]{8,100}$/;
const phoneRule = /^(?:\+84|0)(?:3[2-9]|5[689]|7[06-9]|8[1-9]|9[0-9])\s?\d{2,3}\s?\d{2,3}\s?\d{3}$/;

//API return account's password
const accountCurrentPassword = "FudeverAdmins123@";

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .test("password-match", "Current password is incorrect", function (value) {
      return accountCurrentPassword === value;
    })
    .required("Current password is required"),

  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(passwordRule, { message: "Please enter a stronger password" })
    .required("New password is required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm new password is required"),
});

export const contactInformationSchema = yup.object().shape({
  phone: yup
  .string()
  .matches(phoneRule, {message: "Please enter correct phone number"})
  .required("Phone number is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

export const generalInformationSchema =yup.object().shape({
  firstName: yup.string().required("Fisrt name is required"),
  lastName: yup.string().required("Last name is required"),
  birthday: yup.string().required("Birthday is required"),
  homeAddress: yup.string().required("Home address is required"),
  position: yup.string().required("Position is required"),
  career: yup.string().required("Role is required"),
  majorID: yup.string().required("Major is required"),
  educationPlace: yup.string().required("Education is required"),
  workHistory: yup.string(),
  departmentID: yup.string().required("Department is required"),
  joinDate: yup.string()
})