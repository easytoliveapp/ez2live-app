"use client";

import React, { useState } from "react";
import { Formik, Form, Field, FormikProps } from "formik";
import { Input, ButtonPrimary, FormItem } from "@/components/atoms";
import * as Yup from "yup";
import { IRegisterAccount } from "@/types/auth";
import { useRouter } from 'next/navigation'
import Auth from "@/service/auth.service";

const FormComponent = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const SignUpValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "muito curto!")
      .max(50, "muito longo!")
      .required("campo requerido"),
    document: Yup.string()
      .min(14, "muito curto!")
      .max(18, "muito longo!")
      .required("campo requerido"),
    supplierCategory: Yup.string().required('escolha a categoria da empresa'),
    email: Yup.string().email("email inválido").required("Required"),
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
    address: Yup.object().shape({
      street: Yup.string().required("campo requerido"),
      number: Yup.string().required("campo requerido"),
      neighborhood: Yup.string().required("campo requerido"),
      city: Yup.string().required("campo requerido"),
      state: Yup.string().required("campo requerido"),
      zipcode: Yup.string().required("campo requerido"),
    }),
  });

  const initialValues: IRegisterAccount = {
    name: "",
    document: "",
    email: "",
    password: "",
    supplierCategory: "",
    isSupplier: true,
    address: {
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      zipcode: "",
    },
  };

  const handleFormSubmit = async (values: IRegisterAccount) => {
    setLoading(true);
    try {
      const result = await Auth.register({
        name: values.name,
        email: values.email,
        password: values.password,
        document: values.document,
        isSupplier: values.isSupplier,
        address: values.address,
      });
      //-- Toast login success --
      router.push('/')
    } catch (error) {
      //-- Toast error --
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignUpValidationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched, handleSubmit } : FormikProps<IRegisterAccount>) => (
        
        <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <FormItem
            label='nome da empresa'
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
            label='CNPJ'
            errorMessage={errors.document}
            invalid={!!(errors.document && touched.document)}
          >
            <Field
              invalid = {!!(errors.document && touched.document)}
              name="document"
              type="text"
              label="document"

              component={Input}
            />
          </FormItem>
          <FormItem
            label='categoria'
            errorMessage={errors.supplierCategory}
            invalid={!!(errors.supplierCategory && touched.supplierCategory)}
          >
            <Field
              invalid = {!!(errors.supplierCategory && touched.supplierCategory)}
              name="supplierCategory"
              type="text"
              label="Supplier Category"
              component={Input}
            />
          </FormItem>
          <FormItem
            errorMessage={errors.address?.zipcode}
            invalid={!!(errors.address?.zipcode && touched.address?.zipcode)}
            label='CEP'
          >
            <Field
              invalid = {!!(errors.address?.zipcode && touched.address?.zipcode)}
              name="address.zipcode"
              type="text"
              label="CEP"
              component={Input}
            />
          </FormItem>
          
          <FormItem
            label='endereço'
            errorMessage={errors.address?.street}
            invalid={!!(errors.address?.street && touched.address?.street)}
          >
            <Field
              invalid = {!!(errors.address?.street && touched.address?.street)}
              name="address.street"
              type="text"
              label="street"
              component={Input}
            />
          </FormItem>

          <FormItem
            label='numero'
            errorMessage={errors.address?.number}
            invalid={!!(errors.address?.number && touched.address?.number)}
          >
            <Field
              invalid = {!!(errors.address?.number && touched.address?.number)}
              name="address.number"
              type="text"
              label="number"
              component={Input}
            />
          </FormItem>
          <FormItem
            label='bairro'
            errorMessage={errors.address?.neighborhood}
            invalid={!!(errors.address?.neighborhood && touched.address?.neighborhood)}
          >
            <Field
              invalid = {!!(errors.address?.neighborhood && touched.address?.neighborhood)}
              name="address.neighborhood"
              type="text"
              label="Bairro"
              component={Input}
            />
          </FormItem>
          <FormItem
            label='cidade'
            errorMessage={errors.address?.city}
            invalid={!!(errors.address?.city && touched.address?.city)}
          >
            <Field
              invalid = {!!(errors.address?.city && touched.address?.city)}
              name="address.city"
              type="text"
              label="Cidade"
              component={Input}
            />
          </FormItem>
          <FormItem
            label='estado'
            errorMessage={errors.address?.state}
            invalid={!!(errors.address?.state && touched.address?.state)}
          >
            <Field
              invalid = {!!(errors.address?.state && touched.address?.state)}
              name="address.state"
              type="text"
              label="Estado"
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
            className="w-full mt-4"
            disabled={loading}
          >Cadastrar</ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
