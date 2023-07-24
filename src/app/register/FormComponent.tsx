"use client";

import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, ButtonPrimary } from "@/components/atoms";
import Service from "@/service/auth.service";

const FormComponent = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    conf_password: "",
  };
  const [user, setUser] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const { name, email, password, conf_password } = user;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerValidation = Yup.object({
    name: Yup.string()
      .matches(/[a-zA-Z]$/, "Numbers and special characters are not allowed.")
      .required("What's your name ?")
      .min(2, "Must be between 2 and 32 characters.")
      .max(32, "Must be between 2 and 32 characters."),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .matches(
        /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
        "Must containt at least 1 letter and 1 number"
      )
      .required(
        "Enter a combination of at least eight numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(8, "Password must be atleast 8 characters.")
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response: any = await Service.register({
        name: user.name,
        password: user.password,
        email: user.email,
      });
      console.log('Usuário registrado com sucesso', response)
    } catch (error:any) {
      console.log(error.response.data.message)
    }
    setLoading(false);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name,
        email,
        password,
        conf_password,
      }}
      validationSchema={registerValidation}
      onSubmit={handleSubmit}
    >
      <Form className="grid grid-cols-1 gap-6">
        <label className="block">
          <span className="text-neutral-800 dark:text-neutral-200">
            Your Name
          </span>
          <Input type="text" name="name" onChange={handleChange} />
        </label>
        <ErrorMessage name="name" />
        <label className="block">
          <span className="text-neutral-800 dark:text-neutral-200">
            Email address
          </span>
          <Input
            type="text"
            name="email"
            placeholder="example@example"
            onChange={handleChange}
          />
        </label>
        <ErrorMessage name="email" />
        <label className="block">
          <span className="text-neutral-800 dark:text-neutral-200">
            Password
          </span>
          <Input type="password" name="password" onChange={handleChange} />
        </label>
        <ErrorMessage name="password" />
        <label className="block">
          <span className="text-neutral-800 dark:text-neutral-200">
            Confirm Password
          </span>
          <Input type="password" name="conf_password" onChange={handleChange} />
        </label>
        <ErrorMessage name="conf_password" />
        <ButtonPrimary
          className="w-full max-w-md mx-auto space-y-6"
          type="submit"
        >
          Sign Up
        </ButtonPrimary>
      </Form>
    </Formik>
  );
};

export default FormComponent;
