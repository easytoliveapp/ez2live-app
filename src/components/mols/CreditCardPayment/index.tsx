"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary, FormItem, Select, Checkbox } from "@/components";
import { ICreditCardPayment } from "@/types/payment";
import * as Yup from "yup";
import valid from "card-validator";
import Image from "next/image";
import CardFlag from "@/images/easytolive/payment/card-flag.svg";

const CreditCardPayment = () => {
  const [loading, setLoading] = useState(false);

  const CreditCardvalidationSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .test(
        "test-number",
        "Credit Card number is invalid",
        (value) => valid.number(value).isValid,
      )
      .required(),
    cvv: Yup.string().test("test-cvv", (value) => valid.cvv(value).isValid),
    nameOnCard: Yup.string().label("Name on card").required(),
    cardMonth: Yup.string()
      .required()
      .test((value) => valid.expirationMonth(value).isValid),
    cardYear: Yup.string()
      .required()
      .test((value) => valid.expirationYear(value).isValid),
    TermsOfUse: Yup.boolean()
      .required()
      .oneOf(
        [true],
        "Você precisa concordar com os termos de uso para prosseguir.",
      ),
  });
  const initialValues: ICreditCardPayment = {
    cardNumber: "",
    cvv: "",
    nameOnCard: "",
    cardMonth: "",
    cardYear: "",
    TermsOfUse: false,
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
        <Form onSubmit={handleSubmit} className="space-y-3">
          <div className="w-full flex justify-center my-3">
            <Image alt="Card Flags" src={CardFlag} width={287} height={40} />
          </div>
          <FormItem
            errorMessage={errors.cardNumber}
            invalid={!!(errors.cardNumber && touched.cardNumber)}
          >
            <Field
              invalid={!!(errors.cardNumber && touched.cardNumber)}
              name="cardNumber"
              type="number"
              placeholder="Número do cartão"
              component={Input}
            ></Field>
          </FormItem>
          <FormItem
            errorMessage={errors.nameOnCard}
            invalid={!!(errors.nameOnCard && touched.nameOnCard)}
          >
            <Field
              invalid={!!(errors.nameOnCard && touched.nameOnCard)}
              name="nameOnCard"
              type="text"
              placeholder="Nome do titular"
              component={Input}
            ></Field>
          </FormItem>
          <div className="w-full grid grid-cols-3 gap-2">
            <FormItem
              errorMessage={errors.cardMonth}
              invalid={!!(errors.cardMonth && touched.cardMonth)}
            >
              <Field
                invalid={!!(errors.cardMonth && touched.cardMonth)}
                name="cardMonth"
                component={Select}
                className="text-center"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m, i) => (
                  <option key={i} value={m}>
                    {m}
                  </option>
                ))}
              </Field>
            </FormItem>
            <FormItem
              errorMessage={
                touched.cardYear && errors.cardYear ? errors.cardYear : null
              }
              invalid={!!(touched.cardYear && errors.cardYear)}
            >
              <Field name="cardYear" component={Select} className="text-center">
                {Array.from(
                  { length: 10 },
                  (_, index) => new Date().getFullYear() + index,
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Field>
            </FormItem>
            <FormItem
              errorMessage={errors.cvv}
              invalid={!!(errors.cvv && touched.cvv)}
            >
              <Field
                invalid={!!(errors.cvv && touched.cvv)}
                name="cvv"
                type="number"
                placeholder="CVV"
                className="text-center"
                component={Input}
              ></Field>
            </FormItem>
          </div>

          <div className="flex gap-2 mx-2">
            <FormItem
              errorMessage={errors.TermsOfUse}
              invalid={!!(errors.TermsOfUse && touched.TermsOfUse)}
              className="flex"
            >
              <div className="flex w-full gap-1 justify-center items-center">
                <Field
                  invalid={!!(errors.TermsOfUse && touched.TermsOfUse)}
                  name="TermsOfUse"
                  component={Checkbox}
                ></Field>
                <label
                  htmlFor="TermsOfUse"
                  className="text-[10px] w-full leading-3"
                >
                  Ao realizar a assinatura você concorda com os Termos de Uso
                </label>
              </div>
            </FormItem>
          </div>
          <ButtonPrimary
            type="submit"
            className="w-full my-2"
            disabled={loading}
            loading={loading}
          >
            {loading ? "Realizando pagamento" : "Efetuar Pagamento"}
          </ButtonPrimary>
          <p className=" text-[10px] leading-3 text-center italic">
            Os pagamentos serão realizados de forma recorrente a cada renovoção.
            Você poderá cancelar a qualquer momento em seu perfil.
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default CreditCardPayment;
