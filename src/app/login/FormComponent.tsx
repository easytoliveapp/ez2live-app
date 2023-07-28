"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary, FormItem } from "@/components/atoms";
import * as Yup from "yup";
import { ILogIn } from "@/types/auth";
import Auth from "@/service/auth.service";

const FormComponent = () => {
  const [loading, setLoading] = useState(false);

  const SignInValidationSchema = Yup.object().shape({
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
  });

  const initialValues: ILogIn = {
    email: "",
    password: "",
  };

  const handleFormSubmit = async (values: ILogIn) => {
    setLoading(true);
    try {
      const result = await Auth.login(values);
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
      validationSchema={SignInValidationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <FormItem
            errorMessage={errors.email}
            invalid={!!(errors.email && touched.email)}
          >
            <Field
              invalid = {!!(errors.email && touched.email)}
              name="email"
              type="email"
              label="Email"
              placeholder="Email"
              component={Input}
            />
          </FormItem>
          <FormItem
            errorMessage={errors.password}
            invalid={!!(errors.password && touched.password)}
          >
            <Field
              invalid={!!(errors.password && touched.password)}
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              component={Input}
            />
          </FormItem>
          <ButtonPrimary
            title="Register"
            type="submit"
            className="w-full mt-4"
            disabled={loading}
          >
            Login
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
