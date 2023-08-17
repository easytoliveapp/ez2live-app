"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary, FormItem } from "@/components/atoms";
import * as Yup from "yup";
import { IRegisterAccount } from "@/types/auth/request";
import { useRouter } from 'next/navigation'
import Auth from "@/service/auth.service";
import { useToastify } from "@/hooks/useToastify";

const FormComponent = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const SignUpValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Nome muito curto!")
      .max(36, "Nome muito longo!")
      .required("Campo nome é requerido"),
    email: Yup.string().email("Email inválido").required("Email requerido"),
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

  const initialValues: Partial<IRegisterAccount> = {
    name: "",
    email: "",
    password: "",
  };

  const handleFormSubmit = async (values: Partial<IRegisterAccount>) => {
    setLoading(true);
    await Auth.register({
      name: values.name,
      email: values.email,
      password: values.password,
      }).then(()=>{
        //handleToast login success
        router.push('/')
      })
      .catch((error)=> {
        console.log(error)
        //handleToast error in login
        if (error?.response?.data?.code === 400) {
          useToastify({ label: 'Impossível criar sua conta pois já existe um e-mail cadastrado.', type: 'error' })
        }
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
            label='nome'
            errorMessage={errors.name}
            invalid={!!(errors.name && touched.name)}
          >
            <Field
              invalid = {!!(errors.name && touched.name)}
              name="name"
              type="text"
              label="Name"
              component={Input}
            />
          </FormItem>
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
          >Cadastrar</ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
