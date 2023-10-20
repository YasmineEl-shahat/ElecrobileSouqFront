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
        "password must be at lest 8 characters, one uppercase letter, one lowercase letter and one number"
      )

      .min(8, "Password should be at least 8 chars")
      .required("Password is required")
      .trim(),
    passwordConfirm: yup
      .string()
      .matches(
        passwordPattern,
        "password must be at lest 8 characters, one uppercase letter, one lowercase letter and one number"
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
