"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary, FormItem } from "@/components/atoms";
import * as Yup from "yup";
import { IForgotPassword } from "@/types/auth";
import Auth from "@/service/auth.service";

const FormComponent = () => {
  const [loading, setLoading] = useState(false)
  const SignUpValidationSchema = Yup.object().shape({
    email: Yup.string().email("email inválido").required("requerido"),
  });

  const initialValues: IForgotPassword = {
    email: "",
  };

  const handleFormSubmit = async (values: IForgotPassword) => {
    setLoading(true);
    try {
        await Auth.forgotPassword({
        email: values.email,
      });
      //handleToast success. Foi enviado email para redefinir senha foi enviado
    } catch (error : any) {
      console.log(error)
      //handleToast error console error
    }
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
            disabled={loading}
          >Recuperar senha
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;