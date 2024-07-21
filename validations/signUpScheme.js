import { object, string, ref } from "yup";

export const signUpSchema = object().shape({
  name: string().required("Email is required"),
  lastname: string().required("Lastname is required"),
  email: string().required("Email is required"),
  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-zA-Z]/, "Password must contain both letters and numbers")
    .matches(/[0-9]/, "Password must contain both letters and numbers"),
  confirmPassword: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});
