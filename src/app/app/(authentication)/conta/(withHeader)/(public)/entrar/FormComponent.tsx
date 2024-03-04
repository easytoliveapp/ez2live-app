"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary, FormItem } from "@/components";
import * as Yup from "yup";
import { ILogIn } from "@/types/auth/request";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { showToastify } from "@/hooks/showToastify";
import { getSession, signIn } from "next-auth/react";
import { Route } from "next";

const FormComponent = () => {
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
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
      .then(async (resp: any) => {
        const callbackUrl = params.get("callbackUrl");
        if (resp && !resp?.error) {
          const session = await getSession();

          let destination = "/app";

          if (session?.user?.role === "supplier") {
            destination = "/app/dashboard";
          }

          if (session?.user?.role === "admin") {
            destination = "/app/admin";
          }

          if (session?.user?.role === "user") {
            destination = "/app/meus-cupons";
          }

          router.push((callbackUrl as any) ?? (destination as Route));
        }

        if (resp && resp?.error) {
          setLoading(false);
          return Promise.reject(JSON.parse(resp?.error));
        }
      })
      .catch((error) => {
        if (error?.code === "R01") {
          router.push("/app/conta/conta-cadastrada?isSupplier=1");
        }
        if (error?.code === "R02") {
          localStorage.setItem("LastUserCreated", JSON.stringify(error.user));
          router.push(`/app/conta/conta-cadastrada?id=${error.user.id}`);
        }
        //handleToast error in login
        if (error?.code === 401) {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          showToastify({
            label:
              "Oops! Algo deu errado com seu login. Verifique as credenciais e tente novamente",
            type: "error",
          });
        }

        setLoading(false);
      });
  };

  return (
    <Formik
      validateOnBlur={false}
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
            label="Email"
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
            label="Senha"
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
              className="text-primary-main font-semibold"
              href="/app/conta/esqueci-a-senha"
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
