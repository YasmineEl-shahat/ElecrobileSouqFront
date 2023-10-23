import * as yup from "yup";
import { emailPattern, oldPasswordPattern } from "../validators/regexPattern";
export const schema = yup
  .object({
    email: yup
      .string()
      .matches(emailPattern, "Please enter a valid email")
      .required("Email is required")
      .trim(),
    password: yup
      .string()
      .matches(
        oldPasswordPattern,
        "password must be at lest 8 characters, one uppercase letter, one lowercase letter and one number"
      )
      .min(8, "Password should be at least 8 chars")
      .required("Password is required")
      .trim(),
  })
  .required();
