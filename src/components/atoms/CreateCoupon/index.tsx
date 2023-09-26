"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonSecondary, FormItem } from "@/components/atoms";
import * as Yup from "yup";
import { ICreateCoupon } from '@/types/coupons';
import ToggleButton from '../toggleButton';
// import couponService from '@/service/coupons.service';
// import { useToastify } from '@/hooks/useToastify';

const CreateCoupon = () => {
  const [loading, setLoading] = useState(false)
  const [couponsIlimited, setCouponsIlimited] = useState(false);
  const [ilimitedByUser, setIlimitedByUser] = useState(false);

  const CreateCouponValidationSchema = Yup.object().shape({
    title: Yup.string().required("Título requerido."),
    discount: Yup.number().required(
      "Selecione um desconto de 5% até 100%."
    ),
    coupon_limit: Yup.string().required(
      "Limite de cupons que podem ser utilizados."
    ),
    user_limit: Yup.string().required(
      "Limite de cupons por usuário."
    ),
    expiration_date: Yup.date().required(
      "Data de validade para geração do cupom."
    )
    .min(new Date() , 'Selecione uma data maior que a atual'),
    validation_date: Yup.date().required(
      "Data limite para utilização do cupom."
    ).min(new Date() , 'Selecione uma data maior que a atual'),
  });

  

  const handleFormSubmit = async (values: ICreateCoupon) => {
    setLoading(true)
    //-----------TO DO-------------
    //  WAITING BACK-END RECIVE VALUES LIKE EXPIRATION DATE, USER LIMIT AND ETC...
    // await couponService.createCoupon(values)
    // .then()
    // .catch((error)=> {
    //   if(error?.response?.data?.code === 400){
    //     useToastify({ label: 'Ocorreu um erro ao criar cupom. Por favor verificar os campos.', type: 'error' });
    //   }
    //   if(error?.response?.data?.code === 401){
    //     useToastify({ label: 'Você não tem permisão para criar cupom.', type: 'error' });
    //   }
    // })
    setLoading(false)
    return values
  };

  return (
    <div className='w-full'>
      <div className='mb-6 mt-4 flex justify-between'>
        <h2 className="pl-2 flex items-center text-3xl leading-[115%] md:leading-[115%] font-bold text-black dark:text-neutral-100 justify-center">
          Novo <br />
          cupom
        </h2>
        <div className='pr-2'>
          <div className='relative rounded-full w-40 h-16 bg-gradient-to-r from-secondary-main to-secondary-lighter'>
            <div className='absolute top-8 right-0 rounded-full w-16 h-16 bg-gradient-to-r from-secondary-main to-secondary-lighter'>
            </div>
          </div>
        </div>
      </div>

      <Formik
        initialValues={{
          title: '',
          discount: 20,
          coupon_limit: '',
          user_limit: '',
          expiration_date: '',
          validation_date: '',
        }}
        validationSchema={CreateCouponValidationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, errors, touched, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <FormItem
              className='w-32 !text-3xl py-3 flex items-center justify-center font-semibold rounded-full border-[1px] border-black'
              label={values.discount + '%'}
              errorMessage={errors.discount}
              invalid={!!(errors.discount && touched.discount)}
            >
              <Field
                invalid={!!(errors.discount && touched.discount)}
                className="accent-primary-main !focus:border-none !hover:border-none focus:ring-0"
                name="discount"
                min="5"
                max="95"
                step="5"
                type="range"
                label="discount"
                component={Input}
              />
            </FormItem>
            <FormItem
              label='Título do cupom'
              errorMessage={errors.title}
              invalid={!!(errors.title && touched.title)}
            >
              <Field
                invalid={!!(errors.title && touched.title)}
                name="title"
                type="text"
                label="title"
                component={Input}
                className='bg-white'
              />
            </FormItem>
            <div className='grid grid-cols-2 w-full'>
              <FormItem
                label='Limite de cupons'
                errorMessage={errors.coupon_limit}
                invalid={!!(errors.coupon_limit && touched.coupon_limit)}
              >
                <Field
                  disabled= {couponsIlimited}
                  invalid={!!(errors.coupon_limit && touched.coupon_limit)}
                  name="coupon_limit"
                  value={couponsIlimited? values.coupon_limit = 'ilimitado' : values.coupon_limit == 'ilimitado'? values.coupon_limit = '' : values.coupon_limit}
                  type="text"
                  label="coupon_limit"
                  component={Input}
                  className='bg-white'
                />
              </FormItem>
              <FormItem
                label='Limite por usuário'
                errorMessage={errors.user_limit}
                invalid={!!(errors.user_limit && touched.user_limit)}
              >
                <Field
                  disabled= {ilimitedByUser}
                  invalid={!!(errors.user_limit && touched.user_limit)}
                  name="user_limit"
                  value= {ilimitedByUser? values.user_limit = 'ilimitado' : values.user_limit == 'ilimitado'? values.user_limit = '' : values.user_limit}
                  type="text"
                  label="user_limit"
                  component={Input}
                  className='bg-white'
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
                className='bg-white'
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
                className='bg-white'
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
