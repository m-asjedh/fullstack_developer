import * as Yup from "yup";

export const registerValidationSchema = Yup.object({
  name: Yup.string().required("Name required!"),
  email: Yup.string().email("Invalid emial format").required("Email required!"),
  password: Yup.string()
    .min(4, "Password must be minimum 4 digits!")
    .required("Password required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match!")
    .required("Confirm password is reqired!"),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid emial format").required("Email required!"),
  password: Yup.string().required("Password required!"),
});
