"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary, FormItem } from "@/components/atoms";
import * as Yup from "yup";
import { IResetPassword } from "@/types/auth";
import { useRouter } from 'next/navigation'
import Auth from "@/service/auth.service";


const resetPassord = (token : string) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const SignUpValidationSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
        "deve conter pelo menos uma letra e um número"
      )
      .required(
        "coloque uma combinação de numeros, letras e sinais de pontuação (como ! e &)."
      )
      .min(8, "senha deve conter no mínimo 8 caracteres.")
      .max(36, "senha não deve contar mais de 36 caracteres"),
      conf_password: Yup.string()
      .required("confirme sua senha.")
      .oneOf([Yup.ref("password")], "senhas devem ser iguais."),
  });

  const initialValues: IResetPassword = {
    password: "",
    conf_password: ""
  };

  const handleFormSubmit = async (values : any) => {
    setLoading(true);
    try {
        await Auth.resetPassword( values.password , token);
      //handleToast login success
      router.push('/')
    } catch (error : any) {
      console.log(error)
      //handleToast error console error
    }
    setLoading(false);
  };

  return (
    <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-black dark:text-neutral-100 justify-center">
          Nova senha
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          {/* FORM */}
          <Formik
      initialValues={initialValues}
      validationSchema={SignUpValidationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <FormItem
            label='nova senha'
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
          <FormItem
            label='repetir nova senha'
            errorMessage={errors.conf_password}
            invalid={!!(errors.conf_password && touched.conf_password)}
          >
            <Field
              invalid={!!(errors.conf_password && touched.conf_password)}
              name="conf_password"
              type="password"
              label="Password"
              component={Input}
            />
          </FormItem>
          <ButtonPrimary
            type="submit"
            className="w-full mt-6"
            disabled={loading}
          >Criar nova senha</ButtonPrimary>
        </Form>
      )}
    </Formik>

        </div>
      </div>
    </div>
    
  );
};
 

export default resetPassord