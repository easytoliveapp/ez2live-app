"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonSecondary, FormItem } from "@/components/atoms";
import * as Yup from "yup";
import { ICreateCoupon } from '@/types/coupons';
import ToggleButton from '../toggleButton';

const CreateCoupon = () => {
  const [loading, setLoading] = useState(false)
  const [discount, setDiscount] = useState(40);
  const [couponsIlimited, setCouponsIlimited] = useState(false);
  const [ilimitedByUser, setIlimitedByUser] = useState(true);

  const CreateCouponValidationSchema = Yup.object().shape({
    title: Yup.string().required("Título requerido."),
    discount: Yup.number().required(
      "Selecione um desconto de 5% até 100%."
    ),
    coupon_limit: Yup.number().required(
      "Limite de cupons que podem ser utilizados."
    ),
    user_limit: Yup.number().required(
      "Limite de cupons por usuário."
    ),
    expiration_date: Yup.date().required(
      "Data de validade para geração do cupom."
    ),
    validation_date: Yup.date().required(
      "Data limite para utilização do cupom."
    ),
  });

  const handleFormSubmit = async (values: ICreateCoupon) => {
    setLoading(true)
    console.log(values)
    setLoading(false)
  };

  return (
    <div className=' m-2'>
      <div className='mt-8 mb-16 flex items-center justify-between'>
        <h2 className=" pl-6 flex items-center text-2xl leading-[115%] md:text-5xl md:leading-[115%] font-bold text-black dark:text-neutral-100 justify-center">
          Novo <br />
          cupom
        </h2>
        <div>
          <div className='relative rounded-full w-40 h-16 bg-gradient-to-r from-secondary-main to-secondary-lighter'>
            <div className='absolute top-8 right-0 rounded-full w-16 h-16 bg-gradient-to-r from-secondary-main to-secondary-lighter'>
            </div>
          </div>
        </div>
      </div>

      <Formik
        initialValues={{
          title: '',
          discount: discount,
          coupon_limit: '',
          user_limit: '',
          expiration_date: '',
          validation_date: '',
        }}
        validationSchema={CreateCouponValidationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ errors, touched, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <span className='w-32 text-3xl py-4 flex items-center justify-center font-semibold rounded-full border-[1px] border-black'>
              {discount}%
            </span>
            <Input
              type="range"
              min="5"
              max="100"
              step="5"
              name='discount'
              onChange={(e: any) => setDiscount(e.target.value)}>
            </Input>
            <FormItem
              label='título do cupom'
              errorMessage={errors.title}
              invalid={!!(errors.title && touched.title)}
            >
              <Field
                invalid={!!(errors.title && touched.title)}
                name="title"
                type="text"
                label="title"
                component={Input}
              />
            </FormItem>
            <div className='grid grid-cols-2 w-full'>
              <FormItem
                label='limite de cupons'
                errorMessage={errors.coupon_limit}
                invalid={!!(errors.coupon_limit && touched.coupon_limit)}
              >
                <Field
                  invalid={!!(errors.coupon_limit && touched.coupon_limit)}
                  name="coupon_limit"
                  type="text"
                  label="coupon_limit"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label='limite por usuário'
                errorMessage={errors.user_limit}
                invalid={!!(errors.user_limit && touched.user_limit)}
              >
                <Field
                  invalid={!!(errors.user_limit && touched.user_limit)}
                  name="user_limit"
                  type="text"
                  label="user_limit"
                  component={Input}
                />
              </FormItem>
              <ToggleButton
                onClick={() => setCouponsIlimited(!couponsIlimited)}
                toggle={couponsIlimited}
                label='ilimitado' />
              <ToggleButton
                onClick={() => setIlimitedByUser(!ilimitedByUser)}
                toggle={ilimitedByUser}
                label='ilimitado' />
            </div>
            <FormItem
              label='Cupom ativo até...'
              errorMessage={errors.expiration_date}
              invalid={!!(errors.expiration_date && touched.expiration_date)}
            >
              <Field
                invalid={!!(errors.expiration_date && touched.expiration_date)}
                name="expiration_date"
                type="date"
                label="expiration_date"
                component={Input}
              />
            </FormItem>
            <FormItem
              label='Validade para o uso'
              errorMessage={errors.validation_date}
              invalid={!!(errors.validation_date && touched.validation_date)}
            >
              <Field
                invalid={!!(errors.validation_date && touched.validation_date)}
                name="validation_date"
                type="date"
                label="validation_date"
                component={Input}
              />
            </FormItem>
            <ButtonSecondary
              type="submit"
              className="w-full mt-6"
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
