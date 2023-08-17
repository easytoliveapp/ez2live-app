"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary, FormItem } from "@/components/atoms";
import * as Yup from "yup";
import { IForgotPassword } from "@/types/auth/request";
import Auth from "@/service/auth.service";

const FormComponent = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const SignUpValidationSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Campo email é requerido"),
  });

  const initialValues: IForgotPassword = {
    email: "",
  };

  const handleFormSubmit = async (values: IForgotPassword) => {
    setLoading(true);

    await Auth.forgotPassword({email: values.email,})
    .then(()=> {
      //handle toast success um email para resetar senha foi enviado
      setEmailSent(true);
    })
    .catch(()=> {
      //handle toast error
    })
    setLoading(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignUpValidationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <FormItem
            label='email'
            errorMessage={errors.email}
            invalid={!!(errors.email && touched.email)}
          >
            <Field
              invalid = {!!(errors.email && touched.email)}
              name="email"
              type="email"
              label="Email"
              component={Input}
            />
          </FormItem>
          <ButtonPrimary
            type="submit"
            className="w-full mt-6"
            disabled={loading || emailSent}
          >
            {emailSent ? 'E-mail enviado' : 'Recuperar senha'}
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
