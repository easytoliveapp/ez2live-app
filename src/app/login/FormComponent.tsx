"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary, FormItem } from "@/components/atoms";
import * as Yup from "yup";
import { ILogIn } from "@/types/auth/request";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { showToastify } from "@/hooks/showToastify";
import { signIn } from "next-auth/react";

const FormComponent = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const SignUpValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email inválido")
      .required("Campo email é requerido"),
    password: Yup.string()
      .matches(
        /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
        "Deve conter pelo menos uma letra e um número",
      )
      .required(
        "Coloque uma combinação de numeros, letras e sinais de pontuação (como ! e &).",
      )
      .min(8, "Senha deve conter no mínimo 8 caracteres.")
      .max(36, "Senha não deve contar mais de 36 caracteres"),
  });

  const handleFormSubmit = async (values: ILogIn) => {
    setLoading(true);
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })
      .then((resp) => {
        console.log(resp);

        //const callbackUrl = useSearchParams().get('callbackUrl') as string || '/';

        if (resp && !resp?.error) {
          router.push("/");
        }

        if (resp && resp?.error) {
          return Promise.reject(JSON.parse(resp?.error));
        }
      })
      .catch((error) => {
        console.log(error);
        //handleToast error in login
        if (error?.code === 401) {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          showToastify({
            label:
              "Oops! Algo deu errado com seu login. Verifique as credenciais e tente novamente",
            type: "error",
          });
        }
      });
    setLoading(false);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
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
          <FormItem
            label="senha"
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
          <span className="flex justify-end  items-start text-sm">
            <Link
              className="text-primary-ez2live font-semibold"
              href="/forgot-password"
            >
              esqueci a senha
            </Link>
          </span>
          <ButtonPrimary
            type="submit"
            className="w-full mt-6"
            disabled={loading}
            loading={loading}
          >
            Continuar
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
