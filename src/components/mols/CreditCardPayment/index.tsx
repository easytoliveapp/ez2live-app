"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary, FormItem, Select } from "@/components";
import { ICreditCardPayment } from "@/types/payment";
import * as Yup from "yup";
import valid from "card-validator";
import Image from "next/image";
import CardFlag from "@/images/easytolive/payment/card-flag.svg";

interface ICreditCardPaymentProps {
  currentStepPayment: React.Dispatch<React.SetStateAction<number>>;
}

const CreditCardPayment: React.FC<ICreditCardPaymentProps> = ({
  currentStepPayment,
}) => {
  const [loading, setLoading] = useState(false);
  const [formattedCardNumber, setFormattedCardNumber] = useState("");

  const Months = [
    " - JAN",
    " - FEV",
    " - MAR",
    " - ABR",
    " - MAI",
    " - JUN",
    " - JUL",
    " - AGO",
    " - SET",
    " - OUT",
    " - NOV",
    " - DEZ",
  ];

  const CreditCardvalidationSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .test(
        "test-number",
        "Número de cartão inválido",
        (value) => valid.number(value).isValid,
      )
      .required("Digite o número do cartão"),
    cvv: Yup.string().test(
      "test-cvv",
      "CVV inválido",
      (value) => valid.cvv(value).isValid,
    ),
    nameOnCard: Yup.string()
      .required("Digite o nome do titular")
      .test(
        "test-name",
        "Nome inválido",
        (value) => valid.cardholderName(value).isValid,
      ),
    cardMonth: Yup.string()
      .required()
      .test("is-expired", "O cartão está vencido", function (value) {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        if (
          parseInt(value) < currentMonth &&
          parseInt(this.parent.cardYear) <= currentYear
        ) {
          return false;
        }

        return true;
      }),
    cardYear: Yup.string()
      .required()
      .test((value) => valid.expirationYear(value).isValid),
    TermsOfUse: Yup.boolean()
      .required("Você precisa concordar com os termos de uso para prosseguir.")
      .oneOf(
        [true],
        "Você precisa concordar com os termos de uso para prosseguir.",
      ),
  });
  const initialValues: ICreditCardPayment = {
    cardNumber: "",
    cvv: "",
    nameOnCard: "",
    cardMonth: "1",
    cardYear: String(new Date().getFullYear()),
    TermsOfUse: true,
  };

  const handleSubmit = async (values: ICreditCardPayment) => {
    setLoading(true);
    console.log(values);
    currentStepPayment(1);
    setTimeout(() => {
      currentStepPayment(2);
    }, 2000);
    setLoading(false);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={CreditCardvalidationSchema}
      validateOnBlur={false}
    >
      {({ setFieldValue, values, errors, touched, handleSubmit }) => {
        const handleCardNumberChange = (e: any) => {
          const { value } = e.target;

          const formattedValue = value
            .replace(/\s/g, "")
            .replace(/(\d{4})(?=\d)/g, "$1 ");
          setFormattedCardNumber(formattedValue);
          setFieldValue("cardNumber", value); // Define o valor sem espaços no campo do Formik
        };

        return (
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
                type="text"
                placeholder="Número do cartão"
                onChange={handleCardNumberChange}
                value={formattedCardNumber}
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
            <div className="w-full flex justify-between gap-2">
              <FormItem
                errorMessage={errors.cardMonth}
                invalid={!!(errors.cardMonth && touched.cardMonth)}
              >
                <Field
                  invalid={!!(errors.cardMonth && touched.cardMonth)}
                  name="cardMonth"
                  component={Select}
                  className="text-center pl-2 !w-24"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m, i) => (
                    <option key={i} value={m}>
                      {m}
                      {Months[m - 1]}
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
                <Field
                  name="cardYear"
                  component={Select}
                  className="text-center pl-2 !w-24"
                >
                  {Array.from(
                    { length: 20 },
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
                invalid={!!errors.cvv && touched.cvv}
              >
                <Field
                  invalid={!!errors.cvv && touched.cvv}
                  name="cvv"
                  type="text"
                  placeholder="CVV"
                  className="text-center !w-24 "
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
                    type="checkbox"
                    className="!w-4 !h-4 !rounded-none !p-0 !m-0"
                    component={Input}
                    checked={values.TermsOfUse}
                    onChange={(e: any) => {
                      setFieldValue("TermsOfUse", e.target.checked);
                    }}
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
              {loading ? "Aguardando pagamento" : "Efetuar Pagamento"}
            </ButtonPrimary>
            <p className=" text-[10px] leading-3 text-center italic">
              Os pagamentos serão realizados de forma recorrente a cada
              renovoção. Você poderá cancelar a qualquer momento em seu perfil.
            </p>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreditCardPayment;
