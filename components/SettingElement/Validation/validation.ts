import * as yup from "yup";

const passwordRule = /^(?=.*[a-z])(?=.*[!@#?])[A-Za-z!@#?0-9]{8,100}$/;
const accountCurrentPassword = "FudeveAdmins123@";

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
