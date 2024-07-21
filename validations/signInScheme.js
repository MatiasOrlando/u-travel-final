import { object, string } from "yup";

export const signInSchema = object().shape({
  email: string().required("Email is required"),
  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});
