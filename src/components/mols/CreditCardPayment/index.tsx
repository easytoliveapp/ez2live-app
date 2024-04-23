import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary, FormItem, Select } from "@/components";
import { ICreditCardPayment } from "@/types/payment";
import * as Yup from "yup";
import valid from "card-validator";
import Image from "next/image";
import CardFlag from "@/images/easytolive/payment/card-flag.svg";

const CreditCardPayment = () => {
  const [loading, setLoading] = useState(false);

  const CreditCardvalidationSchema = {
    cardNumber: Yup.string()
      .test(
        "test-number",
        "Credit Card number is invalid",
        (value) => valid.number(value).isValid,
      )
      .required(),
    cvc: Yup.string().test("test-cvv", (value) => valid.cvv(value).isValid),
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
  };
  const initialValues: ICreditCardPayment = {
    cardNumber: "",
    cvc: "",
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
        <Form onSubmit={handleSubmit}>
          <Image alt="Card Flags" src={CardFlag} width={287} height={40} />
          <FormItem
            label="cardNumber"
            errorMessage={errors.cardNumber}
            invalid={!!(errors.cardNumber && touched.cardNumber)}
          >
            <Field
              invalid={!!(errors.cardNumber && touched.cardNumber)}
              name="cardNumber"
              type="number"
              label="Número do cartão"
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

          <div className="flex gap-4">
            <FormItem
              label="cardMonth"
              errorMessage={errors.cardMonth}
              invalid={!!(errors.cardMonth && touched.cardMonth)}
            >
              <Field
                invalid={!!(errors.cardMonth && touched.cardMonth)}
                name="cardMonth"
                component={Select}
              >
                <option value={undefined}>mês</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m, i) => (
                  <option key={i} value={m}></option>
                ))}
              </Field>
            </FormItem>
            <FormItem
              label="Ano de Vencimento"
              errorMessage={
                touched.cardYear && errors.cardYear ? errors.cardYear : null
              }
              invalid={!!(touched.cardYear && errors.cardYear)}
            >
              <Field
                name="cardYear"
                component={Select}
                placeholder="Selecione o ano"
              >
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
              label="cvc"
              errorMessage={errors.cvc}
              invalid={!!(errors.cvc && touched.cvc)}
            >
              <Field
                invalid={!!(errors.cvc && touched.cvc)}
                name="cvc"
                type="number"
                label="CVC"
                component={Input}
              ></Field>
            </FormItem>
          </div>

          <div className="flex gap-2">
            <FormItem
              label="TermsOfUse"
              errorMessage={errors.TermsOfUse}
              invalid={!!(errors.TermsOfUse && touched.TermsOfUse)}
            >
              <Field></Field>
            </FormItem>
            <input
              type="checkbox"
              name="TermsOfUse"
              id="TermsOfUse"
              className="bg-generic-alertGreen"
            />
            <label htmlFor="TermsOfUse">
              Ao realizar a assinatura você concorda com os Termos de Uso
            </label>
          </div>
          <ButtonPrimary
            type="submit"
            className="w-full mt-6"
            disabled={loading}
            loading={loading}
          >
            Efetuar Pagamento
          </ButtonPrimary>
          <span className="text-xs">
            Os pagamentos serão realizados de forma recorrente a cada renovoção.
            Você poderá cancelar a qualquer momento em seu perfil.
          </span>
        </Form>
      )}
    </Formik>
  );
};

export default CreditCardPayment;
