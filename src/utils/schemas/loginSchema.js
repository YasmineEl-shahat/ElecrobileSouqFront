import * as yup from "yup";
import {
  emailPattern,
  passwordPattern,
  oldPasswordPattern,
} from "../validators/regexPattern";
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
        passwordPattern,
        "Password must be at least 8 characters and contain at least 1 uppercase, 1 lowercase, 1 number and 1 symbol"
      )
      // .matches(
      //   oldPasswordPattern,
      //   "password must be at lest 8 characters, one uppercase letter, one lowercase letter and one number"
      // )
      .min(8, "Password should be at least 8 chars")
      .required("Password is required")
      .trim(),
  })
  .required();
