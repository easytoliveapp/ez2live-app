"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input, ButtonPrimary } from "@/components/atoms";
import * as Yup from "yup";
import { IRegisterAccount } from "@/types/auth";
import Auth from "@/service/auth.service";

const FormComponent = () => {
  const [loading, setLoading] = useState(false);

  const SignupValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
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

  const initialValues: any = {
    name: "",
    email: "",
    password: "",
    conf_password: "",
  };

  const handleFormSubmit = async (values: IRegisterAccount) => {
    setLoading(true);
    try {
      const result = await Auth.register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      //-- Toast login success --
    } catch (error) {
      //-- Toast Error --
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupValidationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Field
            name="name"
            type="text"
            label="Name"
            placeholder="Name"
            component={Input}
          />
          <ErrorMessage name="name" />
          <Field
            name="email"
            type="email"
            label="Email"
            placeholder="Email"
            component={Input}
          />
          <ErrorMessage name="email" />
          <Field
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            component={Input}
          />
          <ErrorMessage name="password" />
          <Field
            name="conf_password"
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            component={Input}
          />
          <ErrorMessage name="conf_password" />
          <ButtonPrimary
            title="Register"
            type="submit"
            className="w-full mt-4"
            disabled={loading}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
