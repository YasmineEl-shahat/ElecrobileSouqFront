import * as yup from "yup";

import {
  emailPattern,
  phonePattern,
  passwordPattern,
} from "../validators/regexPattern";
export const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
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

      .min(8, "Password should be at least 8 chars")
      .required("Password is required")
      .trim(),
    passwordConfirm: yup
      .string()
      .matches(
        passwordPattern,
        "Password must be at least 8 characters and contain at least 1 uppercase, 1 lowercase, 1 number and 1 symbol"
      )

      .min(8, "Password should be at least 8 chars")
      .required("Password confirmation is required")
      .oneOf([yup.ref("password"), null], "Passwords should match")
      .trim(),
    phone: yup
      .string()
      .matches(phonePattern, "Please enter a valid phone")
      .required("Phone is required"),
    gender: yup
      .string()
      .oneOf(["male", "female"])
      .required("Gender is required"),
  })
  .required();
