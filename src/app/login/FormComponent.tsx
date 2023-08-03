"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary, FormItem } from "@/components/atoms";
import * as Yup from "yup";
import { ILogIn } from "@/types/auth";
import { useRouter } from 'next/navigation'
import Auth from "@/service/auth.service";

const FormComponent = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const SignUpValidationSchema = Yup.object().shape({
    email: Yup.string().email("email inválido").required("email requerido"),
    password: Yup.string()
      .matches(
        /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
        "Deve conter pelo menos uma letra e um número"
      )
      .required(
        "Coloque uma combinação de numeros, letras e sinais de pontuação (como ! e &)."
      )
      .min(8, "Senha deve conter no mínimo 8 caracteres.")
      .max(36, "Senha não deve contar mais de 36 caracteres"),
  });

  const initialValues: ILogIn = {
    email: "",
    password: "",
  };

  const handleFormSubmit = async (values: ILogIn) => {
    setLoading(true);
    try {
        await Auth.login({
        email: values.email,
        password: values.password,
      });
      //handleToast login success
      router.push('/')
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
          <FormItem
            label='senha'
            errorMessage={errors.password}
            invalid={!!(errors.password && touched.password)}
          >
            <Field
              invalid={!!(errors.password && touched.password)}
              name="password"
              type="password"
              label="Password"
              component={Input}
            />
          </FormItem>
          <ButtonPrimary
            type="submit"
            className="w-full mt-6"
            disabled={loading}
          >Continuar</ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;