"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary, FormItem } from "@/components/atoms";
import * as Yup from "yup";
import { IForgotPassword } from "@/types/auth/request";
import authService from "@/service/auth.service";
import { useToastify } from "@/hooks/useToastify";

const FormComponent = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const SignUpValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email inválido")
      .required("Campo email é requerido"),
  });

  const initialValues: IForgotPassword = {
    email: "",
  };

  const handleFormSubmit = async (values: IForgotPassword) => {
    setLoading(true);

    await authService
      .forgotPassword({ email: values.email })
      .then(() => {
        useToastify({
          label:
            "Se o e-mail está cadastrado em nosso app, você receberá uma mensagem em alguns minutos.",
          type: "success",
        });
        setEmailSent(true);
        setLoading(false);
      })
      .catch(() => {
        useToastify({
          label: "Oops! Algo deu errado. Verifique os campos e tente novamente",
          type: "error",
        });
        setLoading(true);
      });
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
            label="email"
            errorMessage={errors.email}
            invalid={!!(errors.email && touched.email)}
          >
            <Field
              invalid={!!(errors.email && touched.email)}
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
            loading={loading}
          >
            {emailSent ? "E-mail enviado ✓" : "Recuperar senha"}
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
