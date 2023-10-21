import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLogin } from "../api/auth";
import { schema } from "../../src/utils/schemas/loginSchema";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../src/redux/reducers/authSlice";

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [eye, setEye] = useState(true);
  const [backError, setBackError] = useState(true);
  const router = useRouter();

  const onEyeClick = () => {
    setEye(!eye);
  };

  const isAuthenticated = useSelector(
    (state) => state?.auth?.isAuthenticated ?? false
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, [router, isAuthenticated]);

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
    userLogin(JSON.stringify(data))
      .then((res) => {
        setSubmitting(false);
        clearErrors();
        setBackError("");
        dispatch(login({ user: res.data.user, token: res.data.token }));
        toast.success("Login Successfully");
        router.push("/");
      })
      .catch((error) => {
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

          <p className="text-danger mt-1 w-100">{backError}</p>

          <button
            type="submit"
            className="btn--cart w-100 mt-2"
            disabled={submitting}
          >
            LOGIN
          </button>
        </form>
      </div>
    </main>
  );
};

Login.getLayout = function getLayout(page) {
  return <Layout title="Login">{page}</Layout>;
};

export default Login;
