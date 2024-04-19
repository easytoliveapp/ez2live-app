import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary, FormItem } from "@/components";
import { ICreditCardPayment } from "@/types/payment";
import * as Yup from "yup";

const CreditCardPayment = () => {
  const [loading, setLoading] = useState(false);

  const CreditCardvalidationSchema = {
    cardNumber: Yup.string().label("Card number").max(16).required(),
    cvc: Yup.string().label("CVC").min(3).max(4).required(),
    nameOnCard: Yup.string().label("Name on card").required(),
    expirationDate: Yup.date().required(),
  };
  const initialValues: ICreditCardPayment = {
    cardNumber: "",
    cvc: "",
    nameOnCard: "",
    expirationDate: "",
  };

  const handleSubmit = async (values: ICreditCardPayment) => {
    setLoading(true);
    console.log(values);
    setLoading(false);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={CreditCardvalidationSchema}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <FormItem
            label="cardNumber"
            errorMessage={errors.cardNumber}
            invalid={!!(errors.cardNumber && touched.cardNumber)}
          >
            <Field
              invalid={!!(errors.cardNumber && touched.cardNumber)}
              name="cardNumber"
              type="text"
              label="Número do cartão"
              component={Input}
            ></Field>
          </FormItem>
          <FormItem
            label="cvc"
            errorMessage={errors.cvc}
            invalid={!!(errors.cvc && touched.cvc)}
          >
            <Field
              invalid={!!(errors.cvc && touched.cvc)}
              name="cvc"
              type="text"
              label="CVC"
              component={Input}
            ></Field>
          </FormItem>
          <FormItem
            label="nameOnCard"
            errorMessage={errors.nameOnCard}
            invalid={!!(errors.nameOnCard && touched.nameOnCard)}
          >
            <Field
              invalid={!!(errors.nameOnCard && touched.nameOnCard)}
              name="nameOnCard"
              type="text"
              label="Nome do titular"
              component={Input}
            ></Field>
          </FormItem>
          <FormItem
            label="expirationDate"
            errorMessage={errors.expirationDate}
            invalid={!!(errors.expirationDate && touched.expirationDate)}
          >
            <Field
              invalid={!!(errors.expirationDate && touched.expirationDate)}
              name="expirationDate"
              type="text"
              label="Data de expiração"
              component={Input}
            ></Field>
          </FormItem>
          <ButtonPrimary
            type="submit"
            className="w-full mt-6"
            disabled={loading}
            loading={loading}
          >
            Cadastrar
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
};

export default CreditCardPayment;
