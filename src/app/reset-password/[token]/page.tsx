"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary, FormItem } from "@/components/atoms";
import * as Yup from "yup";
import { IResetPassword } from "@/types/auth";
import { useRouter } from 'next/navigation'
import Auth from "@/service/auth.service";

interface tokenProps {
  params: {
    token: string
  }
}

const resetPassord = ({ params } : tokenProps) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const SignUpValidationSchema = Yup.object().shape({
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
      conf_password: Yup.string()
      .required("Confirme sua senha.")
      .oneOf([Yup.ref("password")], "Senhas devem ser iguais."),
  });

  const initialValues: IResetPassword = {
    password: "",
    conf_password: ""
  };

  const handleFormSubmit = async (values : IResetPassword) => {
    setLoading(true);
    await Auth.resetPassword(  params.token, values.password)
    .then(()=>{
      //handleToast password resetada com successo
      router.push('/login')
    })
    .catch(()=>{
      //handle toast error
    })
    setLoading(false);
  };

  return (
    <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
      <div className="container mb-8 lg:mb-32">
      <div className='mt-8 mb-16 flex items-center justify-between'>
        <h2 className=" pl-6 flex items-center text-2xl leading-[115%] md:text-5xl md:leading-[115%] font-bold text-black justify-center">
          Nova senha
        </h2>
        <div>
          <div className='relative rounded-full w-40 h-16 bg-gradient-to-r from-secondary-ez2live to-secondary-ez2livebg'>
            <div className='absolute top-8 right-0 rounded-full w-16 h-16 bg-gradient-to-r from-secondary-ez2live to-secondary-ez2livebg'>
            </div>
          </div>
        </div>          
        </div>
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
 

export default resetPassord;
