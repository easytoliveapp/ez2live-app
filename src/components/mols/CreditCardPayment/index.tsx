"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary, FormItem, Select } from "@/components";
import { ICreditCardPayment } from "@/types/payment";
import * as Yup from "yup";
import valid from "card-validator";
import Image from "next/image";
import CardFlag from "@/images/easytolive/payment/card-flag.svg";
import { MONTHS } from "@/constants/months";
import useIugu from "@/payment/iugu";

interface ICreditCardPaymentProps {
  currentStepPayment: React.Dispatch<React.SetStateAction<number>>;
}

const CreditCardPayment: React.FC<ICreditCardPaymentProps> = ({
  currentStepPayment,
}) => {
  const [loading, setLoading] = useState(false);
  const [formattedCardNumber, setFormattedCardNumber] = useState("");
  const Iugu = useIugu(process.env.IUGU_ID);
  const CreditCardvalidationSchema = Yup.object().shape({
    cardNumber: Yup.string()
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
          const currentYear = new Date().getFullYear();
          const currentMonth = new Date().getMonth() + 1;

          if (
            parseInt(value) < currentMonth &&
            parseInt(this.parent.cardYear) <= currentYear
          ) {
            return false;
          }

          return true;
        },
      ),
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
    creditCard: "",
    cvv: "",
    fullName: "",
    cardMonth: "1",
    cardYear: String(new Date().getFullYear()),
    TermsOfUse: true,
  };

  const handleSubmit = async (values: ICreditCardPayment) => {
    const fragmentedName = values.fullName.split(" ");
    const firstName = fragmentedName[0];
    const lastName = fragmentedName.at(-1);

    const iuguData = {
      number: values.creditCard,
      first_name: firstName,
      last_name: lastName,
      verification_value: values.cvv,
      month: values.cardMonth,
      year: values.cardYear,
    };
    setLoading(true);
    Iugu.setTestMode(true);
    await Iugu.createPaymentToken(iuguData);
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
          <Form onSubmit={handleSubmit} className="px-4 my-4">
            <div className="w-full flex justify-center mb-5">
              <Image alt="Card Flags" src={CardFlag} />
            </div>
            <FormItem
              errorMessage={errors.fullName}
              invalid={!!(errors.fullName && touched.fullName)}
            >
              <Field
                invalid={!!(errors.fullName && touched.fullName)}
                name="fullName"
                type="text"
                placeholder="Nome do titular"
                component={Input}
              />
            </FormItem>
            <FormItem
              errorMessage={errors.creditCard}
              invalid={!!(errors.creditCard && touched.creditCard)}
            >
              <Field
                invalid={!!(errors.creditCard && touched.creditCard)}
                name="creditCard"
                type="text"
                placeholder="Número do cartão"
                onChange={handleCardNumberChange}
                value={formattedCardNumber}
                component={Input}
              />
            </FormItem>
            <FormItem
              errorMessage={errors.cvv || errors.cardMonth}
              invalid={
                !!(errors.cvv && touched.cvv) ||
                !!(errors.cardMonth && touched.cardMonth)
              }
            >
              <div className="flex justify-between gap-2 w-full">
                <Field
                  invalid={!!(errors.cardMonth && touched.cardMonth)}
                  name="cardMonth"
                  component={Select}
                  className="text-center pl-2 w-full max-w-[140px]"
                >
                  {MONTHS.map((eachMonth, idx) => (
                    <option value={idx + 1} key={idx}>
                      {(idx + 1).toString().concat(" - ").concat(eachMonth)}
                    </option>
                  ))}
                </Field>
                <Field
                  name="cardYear"
                  component={Select}
                  className="text-center pl-2 !w-28"
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

                <Field
                  invalid={!!errors.cvv && touched.cvv}
                  name="cvv"
                  type="text"
                  placeholder="CVV"
                  className="text-center !w-24 "
                  component={Input}
                />
              </div>
            </FormItem>

            <div className="flex gap-2">
              <FormItem
                errorMessage={null}
                invalid={!!errors.TermsOfUse && touched.TermsOfUse}
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
                  />
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