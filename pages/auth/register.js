import Layout from "../../components/Layout";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { userRegister } from "../api/auth";
import { schema } from "../../src/utils/schemas/registerSchema";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";

const Register = () => {
  const [submitting, setSubmitting] = useState(false);
  const [eye, setEye] = useState(true);
  const [eyeConfirm, setEyeConfirm] = useState(true);
  const [backError, setBackError] = useState(true);
  const router = useRouter();

  const onEyeClick = () => {
    setEye(!eye);
  };
  const onConfirmEyeClick = () => {
    setEyeConfirm(!eyeConfirm);
  };

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setSubmitting(true);
    userRegister(JSON.stringify(data))
      .then((res) => {
        setSubmitting(false);
        clearErrors();
        setBackError("");
        toast.success("Registered Successfully");
        history.push("/auth/login");
      })
      .catch((error) => {
        console.log(error);
        setBackError(error?.response?.data?.message);
        if (error?.response?.data?.errors)
          Object.entries(error?.response?.data?.errors).forEach(
            ([key, value]) => {
              setError(key, {
                type: "custom",
                message: value[0],
              });
            }
          );

        setSubmitting(false);
      });
  };
  return (
    <main className="d-flex justify-content-center">
      <div className="mainContainer py-5 d-flex align-items-center flex-column">
        <section className="auth-tabs">
          <Link href="/auth/login" passHref>
            <button className={router.asPath === "/auth/login" && "active"}>
              LOGIN
            </button>
          </Link>
          <span></span>
          <Link href="/auth/register" passHref>
            <button className={router.asPath === "/auth/register" && "active"}>
              SIGN UP
            </button>
          </Link>
        </section>
        <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
          <div className="row">
            <div className="col-6 control--container">
              <label className="label--global">First Name*</label>

              <Controller
                control={control}
                name="firstName"
                render={({ field }) => (
                  <input
                    type="text"
                    className={`text--global text--input${
                      errors.firstName ? " field-error" : ""
                    }`}
                    placeholder="First Name"
                    {...field}
                  />
                )}
              />
              {errors.firstName && (
                <p className="text-danger mt-1 w-100">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="col-6 control--container">
              <label className="label--global">Last Name*</label>

              <Controller
                control={control}
                name="lastName"
                render={({ field }) => (
                  <input
                    type="text"
                    className={`text--global text--input${
                      errors.lastName ? " field-error" : ""
                    }`}
                    placeholder="Last Name"
                    {...field}
                  />
                )}
              />
              {errors.lastName && (
                <p className="text-danger mt-1 w-100">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <label className="label--global">Email*</label>
          <div className="control--container">
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <input
                  type="email"
                  className={`text--global text--input ${
                    errors.email ? " field-error" : ""
                  }`}
                  placeholder="Email"
                  {...field}
                />
              )}
            />
            {errors.email && (
              <p className="text-danger mt-1 w-100">{errors.email.message}</p>
            )}
          </div>

          <label className="label--global">Phone*</label>
          <div className="control--container">
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <PhoneInput
                  international
                  placeholder="Phone"
                  className={`text--global text--input ${
                    errors.phone ? " field-error" : ""
                  }`}
                  {...field}
                />
              )}
            />
            {errors.phone && (
              <p className="text-danger mt-1 w-100">{errors.phone.message}</p>
            )}
          </div>

          <div className="gender-container">
            <div className="d-flex">
              <label className="label--global">Gender:</label>

              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <div className="radio-buttons">
                    <label htmlFor="gen1">
                      <input
                        type="radio"
                        value="male"
                        id="gen1"
                        checked={field.value === "male"}
                        onChange={(e) => {
                          console.log(errors);
                          field.onChange(e.target.value);
                        }}
                      />
                      Male
                    </label>
                    <label htmlFor="gen2">
                      <input
                        type="radio"
                        value="female"
                        id="gen2"
                        checked={field.value === "female"}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      Female
                    </label>
                  </div>
                )}
              />
            </div>
            {errors.gender && (
              <p className="text-danger custom-margin-top mb-2 w-100">
                {errors.gender.message}
              </p>
            )}
          </div>
          <label className="label--global">Password*</label>
          <div className="form-group control--container">
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <input
                  type={eye ? "password" : "text"}
                  className={`text--global text--input ${
                    errors.password ? " field-error" : ""
                  }`}
                  placeholder="Password"
                  {...field}
                />
              )}
            />
            <i
              onClick={onEyeClick}
              className={`fa " ${eye ? "fa-eye-slash" : "fa-eye"}`}
            />

            {errors.password && (
              <p className="text-danger mt-1 w-100">
                {errors.password.message}
              </p>
            )}
          </div>

          <label className="label--global">Confirm Password*</label>
          <div className="form-group control--container">
            <Controller
              control={control}
              name="passwordConfirm"
              render={({ field }) => (
                <input
                  type={eyeConfirm ? "password" : "text"}
                  className={`text--global text--input ${
                    errors.passwordConfirm ? " field-error" : ""
                  }`}
                  placeholder="Confirm Password"
                  {...field}
                />
              )}
            />
            <i
              onClick={onConfirmEyeClick}
              className={`fa " ${eyeConfirm ? "fa-eye-slash" : "fa-eye"}`}
            />
            {errors.passwordConfirm && (
              <p className="text-danger mt-1 w-100">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          <p className="text-danger mt-1 w-100">{backError}</p>

          <button
            type="submit"
            className="btn--cart w-100 mt-2"
            disabled={submitting}
          >
            SIGN UP
          </button>
        </form>
      </div>
    </main>
  );
};

Register.getLayout = function getLayout(page) {
  return <Layout title="Register">{page}</Layout>;
};

export default Register;
