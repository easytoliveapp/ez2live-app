"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary, FormItem, Select } from "@/components";
import * as Yup from "yup";
import valid from "card-validator";
import Image from "next/image";
import CardFlag from "@/images/easytolive/payment/card-flag.svg";
import { MONTHS } from "@/constants/months";
import { isCreditCardExpirationValid } from "@/utils/creditCard";
import { ICreditCardPayment } from "@/types/payment";

interface ICreditCardForm {
  loading: boolean;
  handleSubmit: (values: ICreditCardPayment) => Promise<void>;
  buttonLabel: string;
  loadingButonLabel: string;
}

const CreditCardForm: React.FC<ICreditCardForm> = ({
  loading,
  handleSubmit,
  buttonLabel,
  loadingButonLabel,
}) => {
  const [formattedcreditCard, setFormattedcreditCard] = useState("");

  const CreditCardvalidationSchema = Yup.object().shape({
    creditCard: Yup.string()

      .test(
        "test-number",
        "Número de cartão inválido",
        (value) => valid.number(value).isValid,
      )
      .required("Número de cartão inválido"),
    cvv: Yup.string().test(
      "test-cvv",
      "Verifique a validade do cartão ou CVV",
      (value) => valid.cvv(value).isValid,
    ),
    fullName: Yup.string()
      .required("Nome do titular inválido")
      .test(
        "test-name",
        "Nome do titular inválido",
        (value) => valid.cardholderName(value).isValid,
      ),
    cardMonth: Yup.string()
      .required()
      .test(
        "is-expired",
        "Verifique a validade do cartão ou CVV",
        function (value) {
          return isCreditCardExpirationValid({
            month: value,
            year: this.parent.cardYear,
          });
        },
      ),
    cardYear: Yup.string()
      .required()
      .test((value) => valid.expirationYear(value).isValid),
    termsOfUse: Yup.boolean()
      .required("Você precisa concordar com os termos de uso para prosseguir.")
      .oneOf(
        [true],
        "Você precisa concordar com os termos de uso para prosseguir.",
      ),
  });

  const initialValues: ICreditCardPayment = {
    creditCard: "",
    cvv: "",
    fullName: "",
    cardMonth: "1",
    cardYear: String(new Date().getFullYear()),
    termsOfUse: true,
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={CreditCardvalidationSchema}
      validateOnBlur={false}
    >
      {({ setFieldValue, values, errors, touched, handleSubmit }) => {
        const handlecreditCardChange = (e: any) => {
          const { value } = e.target;

          const formattedValue = value
            .replace(/\s/g, "")
            .replace(/(\d{4})(?=\d)/g, "$1 ");
          setFormattedcreditCard(formattedValue);
          setFieldValue("creditCard", value);
        };

        return (
          <Form onSubmit={handleSubmit} className="px-8 my-4">
            <FormItem
              errorMessage={errors.creditCard}
              invalid={!!(errors.creditCard && touched.creditCard)}
            >
              <p className="mb-2"> Número do Cartão </p>
              <Field
                invalid={!!(errors.creditCard && touched.creditCard)}
                name="creditCard"
                maxLength={23}
                type="text"
                className="rounded-[10px]"
                data-iugu="number"
                onChange={handlecreditCardChange}
                value={formattedcreditCard}
                component={Input}
              />
              <div className="w-full -ml-2 flex">
                <Image alt="Card Flags" src={CardFlag} />
              </div>
            </FormItem>

            <FormItem
              errorMessage={errors.cvv || errors.cardMonth}
              invalid={
                !!(errors.cvv && touched.cvv) ||
                !!(errors.cardMonth && touched.cardMonth)
              }
              className="-mt-4"
            >
              <div className="grid grid-cols-3 gap-2 md:gap-4 w-full">
                <div className="flex flex-col">
                  <label htmlFor="cardMonth" className="mb-2">
                    Mês
                  </label>
                  <Field
                    invalid={!!(errors.cardMonth && touched.cardMonth)}
                    name="cardMonth"
                    id="cardMonth"
                    data-iugu="expiration_month"
                    component={Select}
                    className="text-center pl-2 w-full rounded-[10px] border-[#a6a6a6]"
                  >
                    {MONTHS.map((eachMonth, idx) => (
                      <option value={idx + 1} key={idx}>
                        {(idx + 1).toString().concat(" - ").concat(eachMonth)}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="cardYear" className="mb-2">
                    Ano
                  </label>
                  <Field
                    name="cardYear"
                    id="cardYear"
                    component={Select}
                    className="text-center pl-2 w-full rounded-[10px]"
                    data-iugu="expiration_year"
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
                </div>
                <div className="flex flex-col">
                  <label htmlFor="cvv" className="mb-2">
                    CVV
                  </label>
                  <Field
                    invalid={!!errors.cvv && touched.cvv}
                    name="cvv"
                    id="cvv"
                    type="text"
                    placeholder="CVV"
                    data-iug=""
                    className="text-center w-full rounded-[10px]"
                    component={Input}
                  />
                </div>
              </div>
            </FormItem>
            <FormItem
              className="-mt-8"
              errorMessage={errors.fullName}
              invalid={!!(errors.fullName && touched.fullName)}
            >
              <p className="mb-2"> Nome do titular</p>
              <Field
                invalid={!!(errors.fullName && touched.fullName)}
                name="fullName"
                data-iugu="fullName"
                type="text"
                placeholder=""
                className="rounded-[10px]"
                component={Input}
              />
            </FormItem>

            <div className="mb-4">
              <p>Detalhes da compra</p>
              <hr className="mt-2 mb-3" />
              <span className="w-full justify-between flex">
                <strong className="text-sm">Assinatura Easy to Live</strong>
                <small>R$ 29,00/mês</small>
              </span>
            </div>

            <ButtonPrimary
              type="submit"
              className="w-full my-2 rounded-[10px] bg-[#00AD1A] "
              disabled={loading}
              loading={loading}
            >
              {loading ? loadingButonLabel : buttonLabel}
            </ButtonPrimary>

            <div className="flex gap-2 mb-2">
              <FormItem
                errorMessage={null}
                invalid={!!errors.termsOfUse && touched.termsOfUse}
                className="flex"
                hasErrorSpacement={false}
              >
                <div className="flex w-full gap-1 justify-center items-center">
                  <Field
                    invalid={!!(errors.termsOfUse && touched.termsOfUse)}
                    name="termsOfUse"
                    type="checkbox"
                    className="!w-4 !h-4 !rounded-none !p-0 !m-0"
                    component={(props: any) => {
                      return <Input {...props} />;
                    }}
                    checked={values.termsOfUse}
                    onChange={(e: any) => {
                      setFieldValue("termsOfUse", e.target.checked);
                    }}
                  />
                  <label
                    htmlFor="termsOfUse"
                    className="text-[10px] w-full leading-3"
                    onClick={() =>
                      setFieldValue("termsOfUse", !values.termsOfUse)
                    }
                  >
                    Ao realizar a assinatura você concorda com os Termos de Uso
                  </label>
                </div>
              </FormItem>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreditCardForm;
