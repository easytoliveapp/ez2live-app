"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary } from "@/components/atoms";
import * as Yup from "yup";

const FormComponent = () => {
  const SignupValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    document: Yup.string()
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
    document: "",
    email: "",
    password: "",
    conf_password: "",
  };

  const handleFormSubmit = (values: any) => {
    console.log("Usuario registrado", values);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupValidationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched, isSubmitting, handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
        >
          <Field
            name="name"
            type="text"
            label="Name"
            placeholder="Name"
            component={Input}
          />
          <Field
            name="document"
            type="text"
            label="Document"
            placeholder="Document"
            component={Input}
          />
          <Field
            name="email"
            type="email"
            label="Email"
            placeholder="Email"
            component={Input}
          />
          <Field
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            component={Input}
          />
          <Field
            name="conf_password"
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            component={Input}
          />
          <ButtonPrimary
            title="Register"
            type="submit"
            className="w-full mt-4"
            disabled={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  )
};

export default FormComponent;
