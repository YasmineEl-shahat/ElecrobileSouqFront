import Layout from "../../components/Layout";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { userRegister } from "../api/auth";
import { schema } from "../../src/utils/schemas/registerSchema";
import { toast } from "react-toastify";

const Register = () => {
  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <main className="d-flex justify-content-center">
      <div className="mainContainer"></div>
    </main>
  );
};

Register.getLayout = function getLayout(page) {
  return <Layout title="Register">{page}</Layout>;
};

export default Register;
