"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Input,
  ButtonSecondary,
  FormItem,
  ToggleButton,
} from "@/components/atoms";
import * as Yup from "yup";
import { ICreateCoupon } from "@/types/coupons";
import couponService from "@/service/coupons.service";
import { showToastify } from "@/hooks/showToastify";

const CreateCoupon = () => {
  const [loading, setLoading] = useState(false);
  const [couponsIlimited, setCouponsIlimited] = useState(false);
  const [ilimitedByUser, setIlimitedByUser] = useState(false);

  const CreateCouponValidationSchema = Yup.object().shape({
    title: Yup.string().required("Título requerido."),
    discount: Yup.string().required("Selecione um desconto de 5% até 100%."),
    maxTotal: Yup.string().required(
      "Limite de cupons que podem ser utilizados.",
    ),
    maxPerUser: Yup.string().required("Limite de cupons por usuário."),
    expirationGenerationDate: Yup.date()
      .required("Data de validade para geração do cupom.")
      .min(new Date(), "Selecione uma data maior que a atual"),
    expirationUseDate: Yup.date()
      .required("Data limite para utilização do cupom.")
      .min(new Date(), "Selecione uma data maior que a atual"),
  });

  const handleFormSubmit = async (values: ICreateCoupon) => {
    setLoading(true);
    await couponService
      .createCoupon({
        title: values.title,
        discount: String(values.discount),
        maxPerUser:
          values.maxPerUser == "ilimitado" ? -1 : Number(values.maxPerUser),
        maxTotal: values.maxTotal == "ilimitado" ? -1 : Number(values.maxTotal),
        expirationGenerationDate: new Date(values.expirationGenerationDate),
        expirationUseDate: new Date(values.expirationUseDate),
      })
      .then(() =>
        showToastify({ label: "cupom gerado com sucesso", type: "success" }),
      )
      .catch((error) => {
        if (error?.response?.data?.code === 400) {
          showToastify({
            label:
              "Ocorreu um erro ao criar cupom. Por favor verificar os campos.",
            type: "error",
          });
        }
        if (error?.response?.data?.code === 401) {
          showToastify({
            label: "Você não tem permisão para criar cupom.",
            type: "error",
          });
        }
      });
    setLoading(false);
    return values;
  };

  return (
    <div className="w-full">
      <div className="mb-6 mt-4 flex justify-between">
        <h2 className="pl-2 flex items-center text-3xl leading-[115%] md:leading-[115%] font-bold text-black dark:text-neutral-100 justify-center">
          Novo <br />
          cupom
        </h2>
        <div className="pr-2">
          <div className="relative rounded-full w-40 h-16 bg-gradient-to-r from-secondary-main to-secondary-lighter">
            <div className="absolute top-8 right-0 rounded-full w-16 h-16 bg-gradient-to-r from-secondary-main to-secondary-lighter"></div>
          </div>
        </div>
      </div>

      <Formik
        validateOnBlur={false}
        initialValues={{
          title: "",
          discount: "20",
          maxTotal: "",
          maxPerUser: "",
          expirationGenerationDate: new Date("2022-01-01"),
          expirationUseDate: new Date("2022-01-01"),
        }}
        validationSchema={CreateCouponValidationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, errors, touched, isValidating, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <FormItem
              className="w-32 !text-3xl py-3 flex items-center justify-center font-semibold rounded-full border-[1px] border-black"
              label={values.discount + "%"}
              errorMessage={errors.discount}
              invalid={!!(errors.discount && touched.discount)}
            >
              <Field
                invalid={!!(errors.discount && touched.discount)}
                className="accent-primary-main !focus:border-none !hover:border-none focus:ring-0"
                name="discount"
                min="5"
                max="95"
                step="1"
                type="range"
                label="discount"
                component={Input}
              />
            </FormItem>
            <FormItem
              label="Título do cupom"
              errorMessage={errors.title}
              invalid={!!(errors.title && touched.title)}
            >
              {!!isValidating && <ErrorMessage name="title" />}
              <Field
                invalid={!!(errors.title && touched.title)}
                name="title"
                type="text"
                label="title"
                component={Input}
                className="bg-white"
              />
            </FormItem>
            <div className="grid grid-cols-2 w-full">
              <FormItem
                label="Limite de cupons"
                errorMessage={!couponsIlimited && errors.maxTotal}
                invalid={
                  !couponsIlimited && !!(errors.maxTotal && touched.maxTotal)
                }
              >
                <Field
                  disabled={couponsIlimited}
                  invalid={
                    !couponsIlimited && !!(errors.maxTotal && touched.maxTotal)
                  }
                  name="maxTotal"
                  value={
                    couponsIlimited
                      ? (values.maxTotal = "ilimitado")
                      : values.maxTotal == "ilimitado"
                      ? (values.maxTotal = "")
                      : values.maxTotal
                  }
                  type="text"
                  label="maxTotal"
                  component={Input}
                  className="bg-white disabled:bg-white"
                />
              </FormItem>
              <FormItem
                label="Limite por usuário"
                errorMessage={!ilimitedByUser && errors.maxPerUser}
                invalid={
                  !ilimitedByUser && !!(errors.maxPerUser && touched.maxPerUser)
                }
              >
                <Field
                  disabled={ilimitedByUser}
                  invalid={
                    !ilimitedByUser &&
                    !!(errors.maxPerUser && touched.maxPerUser)
                  }
                  name="maxPerUser"
                  value={
                    ilimitedByUser
                      ? (values.maxPerUser = "ilimitado")
                      : values.maxPerUser == "ilimitado"
                      ? (values.maxPerUser = "")
                      : values.maxPerUser
                  }
                  type="text"
                  label="maxPerUser"
                  component={Input}
                  className="bg-white disabled:bg-white"
                />
              </FormItem>
              <div>
                <ToggleButton
                  onClick={() => setCouponsIlimited(!couponsIlimited)}
                  toggle={couponsIlimited}
                  label="ilimitado"
                />
              </div>
              <div>
                <ToggleButton
                  onClick={() => setIlimitedByUser(!ilimitedByUser)}
                  toggle={ilimitedByUser}
                  label="ilimitado"
                />
              </div>
            </div>
            <FormItem
              label="Cupom ativo até..."
              errorMessage={errors.expirationGenerationDate}
              invalid={
                !!(
                  errors.expirationGenerationDate &&
                  touched.expirationGenerationDate
                )
              }
            >
              <Field
                invalid={
                  !!(
                    errors.expirationGenerationDate &&
                    touched.expirationGenerationDate
                  )
                }
                name="expirationGenerationDate"
                type="date"
                label="expirationGenerationDate"
                component={Input}
                className="bg-white cursor-pointer"
              />
            </FormItem>
            <FormItem
              label="Validade para o uso"
              errorMessage={errors.expirationUseDate}
              invalid={
                !!(errors.expirationUseDate && touched.expirationUseDate)
              }
            >
              <Field
                invalid={
                  !!(errors.expirationUseDate && touched.expirationUseDate)
                }
                name="expirationUseDate"
                type="date"
                label="expirationUseDate"
                component={Input}
                className="bg-white cursor-pointer"
              />
            </FormItem>
            <ButtonSecondary
              type="submit"
              className="w-full mt-20"
              disabled={loading}
              loading={loading}
            >
              Salvar cupom
            </ButtonSecondary>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCoupon;
