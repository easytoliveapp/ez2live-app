"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary, FormItem } from "@/components";
import * as Yup from "yup";
import Image from "next/image";
import PixImage from "@/images/easytolive/payment/pix-image.svg";
import { IPixPayment } from "@/types/payment";

interface IPixPaymentProps {
  currentStepPayment: React.Dispatch<React.SetStateAction<number>>;
}

const PixPayment: React.FC<IPixPaymentProps> = ({ currentStepPayment }) => {
  const [loading, setLoading] = useState(false);

  const PixPaymentValidationSchema = Yup.object().shape({
    cpf: Yup.string().required("Digite seu CPF"),
    TermsOfUse: Yup.boolean()
      .required()
      .oneOf(
        [true],
        "Você precisa concordar com os termos de uso para prosseguir.",
      ),
  });

  const handleSubmit = async (values: IPixPayment) => {
    setLoading(true);
    console.log(values);
    currentStepPayment(1);
    // setTimeout(() => {
    //   currentStepPayment(3);
    // }, 5000);
    setLoading(false);
  };

  const initialValues: IPixPayment = {
    cpf: "",
    TermsOfUse: true,
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PixPaymentValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values, errors, touched, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="space-y-3">
          <div className="w-full flex justify-center my-3">
            <Image alt="Pix Image" src={PixImage} width={82} height={33} />
          </div>
          <FormItem
            errorMessage={errors.cpf}
            invalid={!!(errors.cpf && touched.cpf)}
            className=""
          >
            <Field
              invalid={!!(errors.cpf && touched.cpf)}
              name="cpf"
              type="text"
              placeholder="CPF do comprador"
              component={Input}
            />
          </FormItem>
          <p className="text-xs">
            Pague direto da sua conta, de forma rápida e segura. O PIX permite
            transferência de dinheiro entre contas sem limite de horário, 24
            horas por dia, 7 dias por semana.
          </p>
          <p className="text-xs">
            Sua assinatura será confirmada após a identificação da transferência
            pelo nosso sistema.
          </p>
          <div className="flex gap-2 ">
            <FormItem
              errorMessage={errors.TermsOfUse}
              invalid={!!(errors.TermsOfUse && touched.TermsOfUse)}
              className="flex mt-[31px]"
            >
              <div className="flex w-full gap-1 items-center ">
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
            loading={loading}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Realizando pagamento" : "Efetuar Pagamento"}
          </ButtonPrimary>
          <p className="text-[10px] leading-3 italic text-center">
            Os pagamentos serão realizados de forma recorrente a cada renovoção.
            Você poderá cancelar a qualquer momento em seu perfil.
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default PixPayment;
