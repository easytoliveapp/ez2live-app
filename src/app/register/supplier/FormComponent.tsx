"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary } from "@/components/atoms";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
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
const FormComponent = () => (
  <div>
    <Formik
      initialValues={{
        name: "",
        document: "",
        email: "",
        password: "",
        conf_password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="grid grid-cols-1 gap-6">
          <label className="block" htmlFor="name">
            <span className="text-neutral-800 dark:text-neutral-200">Name</span>
            <Field name="name" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
          </label>

          <label htmlFor="document" className='block'>
            <span className="text-neutral-800 dark:text-neutral-200">Document</span>
          <Field name="document" />
          {errors.document && touched.document ? (
            <div>{errors.document}</div>
          ) : null}
          </label>

          <label htmlFor="email" className='block'>
            <span className="text-neutral-800 dark:text-neutral-200">Email</span>
          <Field name="email" type="email" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          </label>

          <label htmlFor="password" className='block'>
            <span className="text-neutral-800 dark:text-neutral-200">Password</span>
          <Field name="password" type="password" />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}          
          </label>

          <label htmlFor="conf_password" className='block'>
            <span className="text-neutral-800 dark:text-neutral-200">Confirm your password</span>
          <Field name="conf_password" type="password" />
          {errors.conf_password && touched.conf_password ? (
            <div>{errors.conf_password}</div>
          ) : null}    
          </label>
          <ButtonPrimary
            className="w-full max-w-md mx-auto space-y-6"
            type="submit"
          >
            Submit
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  </div>
);

export default FormComponent;
