"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FormikProps } from "formik";
import { Input, ButtonPrimary, FormItem, Select } from "@/components";
import * as Yup from "yup";
import { IRegisterAccount } from "@/types/auth/request";
import { useRouter } from "next/navigation";
import Auth from "@/service/auth.service";
import Supplier from "@/service/supplier.service";
import { ICategoryProps } from "@/types/supplier";
import { showToastify } from "@/hooks/showToastify";
import { MASKS } from "@/constants/masks";

export interface IStepOneProps {
  next: (e: any) => void;
  data: IRegisterAccount;
  key: number;
}

const FormComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [firstCategory, setFirstCategory] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [initialValues, setInitialValues] = useState({
    name: "",
    document: "",
    email: "",
    password: "",
    phoneNumber: "",
    supplierInfo: {
      supplierCategory: firstCategory,
      address: {
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        zipcode: "",
      },
    },
  });

  const getSupplierCatogires = async () => {
    const res: any = await Supplier.getSupplierCategories();
    return res;
  };

  useEffect(() => {
    getSupplierCatogires()
      .then((res) => {
        setCategories(res.data.supplierCategories.results),
          setFirstCategory(res.data.supplierCategories.results[0].id);
      })
      .catch((error) => {
        if (error?.response?.data?.code === 401) {
          showToastify({ label: "Usuário não autenticado.", type: "error" });
        }
        if (error?.response?.data?.code === 404) {
          showToastify({
            label: "Não foi encontrado nenhuma categoria.",
            type: "error",
          });
        }
      });
    setInitialValues((prev) => ({ ...prev, supplierCategory: firstCategory }));
  }, [firstCategory]);

  const FirstStepValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Nome muito curto!")
      .max(50, "Nome muito longo!")
      .required("Campo nome é requerido"),
    document: Yup.string()
      .min(14, "Muito curto!")
      .max(18, "Muito longo!")
      .required("Campo requerido"),
    supplierInfo: Yup.object().shape({
      supplierCategory: Yup.string()
        .nonNullable()
        .required("Escolha a categoria da empresa"),
    }),
    phoneNumber: Yup.string().required(
      "Insira um número de telefone para contato",
    ),
    email: Yup.string().email("Email inválido").required("Email requerido"),
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

  const SecondStepValidationSchema = Yup.object().shape({
    supplierInfo: Yup.object().shape({
      address: Yup.object().shape({
        street: Yup.string().required("Campo requerido"),
        number: Yup.string().required("Campo requerido"),
        neighborhood: Yup.string().required("Campo requerido"),
        city: Yup.string().required("Campo requerido"),
        state: Yup.string().required("Campo requerido"),
        zipcode: Yup.string().required("Campo requerido"),
      }),
    }),
  });

  const handleNextStep = (newData: Partial<IRegisterAccount>) => {
    setInitialValues((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleFormSubmit = async (values: IRegisterAccount) => {
    setLoading(true);
    await Auth.register({
      name: values.name,
      email: values.email,
      password: values.password,
      document: values.document,
      phoneNumber: values.phoneNumber,
      supplierInfo: {
        address: values.supplierInfo.address,
        supplierCategory: values.supplierInfo.supplierCategory,
      },
    })
      .then(() => {
        router.push("/app/conta/parceiro-cadastrado");
      })
      .catch((error) => {
        if (error?.response?.data?.code === 400) {
          return showToastify({
            label:
              "Impossível criar sua conta pois já existe um e-mail cadastrado.",
            type: "error",
          });
        } else {
          showToastify({
            label: "Impossível criar sua conta. Por favor, tente novamente.",
            type: "error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const StepOne = (props: IStepOneProps) => {
    const handleSubmit = (values: Partial<IRegisterAccount>) => {
      props.next(values);
    };

    return (
      <Formik
        validateOnBlur={false}
        initialValues={initialValues}
        validationSchema={FirstStepValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleSubmit }: FormikProps<IRegisterAccount>) => (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <FormItem
              label="Nome da empresa"
              errorMessage={errors.name}
              invalid={!!(errors.name && touched.name)}
            >
              <Field
                invalid={!!(errors.name && touched.name)}
                name="name"
                type="text"
                label="Name"
                component={Input}
              />
            </FormItem>
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
              label="Telefone"
              errorMessage={errors.phoneNumber}
              invalid={!!(errors.phoneNumber && touched.phoneNumber)}
            >
              <Field
                invalid={!!(errors.phoneNumber && touched.phoneNumber)}
                name="phoneNumber"
                type="text"
                label="Telefone"
                component={Input}
                mask={MASKS.PHONE}
              />
            </FormItem>
            <FormItem
              label="CNPJ"
              errorMessage={errors.document}
              invalid={!!(errors.document && touched.document)}
            >
              <Field
                invalid={!!(errors.document && touched.document)}
                name="document"
                type="text"
                label="document"
                component={Input}
                mask={MASKS.CNPJ}
              />
            </FormItem>
            <FormItem
              label="Categoria"
              errorMessage={errors.supplierInfo?.supplierCategory}
              invalid={
                !!(
                  errors.supplierInfo?.supplierCategory &&
                  touched.supplierInfo?.supplierCategory
                )
              }
            >
              <Field
                invalid={
                  !!(
                    errors.supplierInfo?.supplierCategory &&
                    touched.supplierInfo?.supplierCategory
                  )
                }
                name="supplierInfo.supplierCategory"
                component={Select}
              >
                <option value={undefined}>selecione uma categoria</option>
                {categories.map((categorie: ICategoryProps, index) => (
                  <option key={index} value={categorie.id}>
                    {categorie.title}
                  </option>
                ))}
              </Field>
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
            <ButtonPrimary
              type="submit"
              className="w-full mt-4"
              disabled={loading}
            >
              Avançar
            </ButtonPrimary>
          </Form>
        )}
      </Formik>
    );
  };
  const StepTwo: any = () => {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={SecondStepValidationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ errors, touched, handleSubmit }: FormikProps<IRegisterAccount>) => (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <FormItem
              errorMessage={errors.supplierInfo?.address?.zipcode}
              invalid={
                !!(
                  errors.supplierInfo?.address?.zipcode &&
                  touched.supplierInfo?.address?.zipcode
                )
              }
              label="CEP"
            >
              <Field
                invalid={
                  !!(
                    errors.supplierInfo?.address?.zipcode &&
                    touched.supplierInfo?.address?.zipcode
                  )
                }
                name="supplierInfo.address.zipcode"
                type="text"
                label="CEP"
                component={Input}
                mask={MASKS.CEP}
              />
            </FormItem>

            <FormItem
              label="endereço"
              errorMessage={errors.supplierInfo?.address?.street}
              invalid={
                !!(
                  errors.supplierInfo?.address?.street &&
                  touched.supplierInfo?.address?.street
                )
              }
            >
              <Field
                invalid={
                  !!(
                    errors.supplierInfo?.address?.street &&
                    touched.supplierInfo?.address?.street
                  )
                }
                name="supplierInfo.address.street"
                type="text"
                label="street"
                component={Input}
              />
            </FormItem>

            <FormItem
              label="numero"
              errorMessage={errors.supplierInfo?.address?.number}
              invalid={
                !!(
                  errors.supplierInfo?.address?.number &&
                  touched.supplierInfo?.address?.number
                )
              }
            >
              <Field
                invalid={
                  !!(
                    errors.supplierInfo?.address?.number &&
                    touched.supplierInfo?.address?.number
                  )
                }
                name="supplierInfo.address.number"
                type="text"
                label="number"
                component={Input}
              />
            </FormItem>
            <FormItem
              label="bairro"
              errorMessage={errors.supplierInfo?.address?.neighborhood}
              invalid={
                !!(
                  errors.supplierInfo?.address?.neighborhood &&
                  touched.supplierInfo?.address?.neighborhood
                )
              }
            >
              <Field
                invalid={
                  !!(
                    errors.supplierInfo?.address?.neighborhood &&
                    touched.supplierInfo?.address?.neighborhood
                  )
                }
                name="supplierInfo.address.neighborhood"
                type="text"
                label="Bairro"
                component={Input}
              />
            </FormItem>
            <FormItem
              label="cidade"
              errorMessage={errors.supplierInfo?.address?.city}
              invalid={
                !!(
                  errors.supplierInfo?.address?.city &&
                  touched.supplierInfo?.address?.city
                )
              }
            >
              <Field
                invalid={
                  !!(
                    errors.supplierInfo?.address?.city &&
                    touched.supplierInfo?.address?.city
                  )
                }
                name="supplierInfo.address.city"
                type="text"
                label="Cidade"
                component={Input}
              />
            </FormItem>
            <FormItem
              label="estado"
              errorMessage={errors.supplierInfo?.address?.state}
              invalid={
                !!(
                  errors.supplierInfo?.address?.state &&
                  touched.supplierInfo?.address?.state
                )
              }
            >
              <Field
                invalid={
                  !!(
                    errors.supplierInfo?.address?.state &&
                    touched.supplierInfo?.address?.state
                  )
                }
                name="supplierInfo.address.state"
                type="text"
                label="Estado"
                component={Input}
              />
            </FormItem>
            <ButtonPrimary
              type="submit"
              className="w-full mt-4"
              disabled={loading}
            >
              Avançar
            </ButtonPrimary>
          </Form>
        )}
      </Formik>
    );
  };
  const steps = [
    <StepOne key={0} next={handleNextStep} data={initialValues} />,
    <StepTwo key={1} data={initialValues} />,
  ];
  return <div>{steps[currentStep]}</div>;
};

export default FormComponent;
