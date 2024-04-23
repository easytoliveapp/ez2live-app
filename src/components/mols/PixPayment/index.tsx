import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary, FormItem } from "@/components";
import * as Yup from "yup";
import Image from "next/image";
import PixImage from "@/images/easytolive/payment/pix-image.svg";

const PixPayment = () => {
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

  const handleSubmit = async (values: any) => {
    setLoading(true);
    console.log(values);
    setLoading(false);
  };

  const initialValues = {
    cpf: "",
    TermsOfUse: false,
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PixPaymentValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Image alt="Pix Image" src={PixImage} width={82} height={33} />
          <FormItem
            label="Nome"
            errorMessage={errors.cpf}
            invalid={!!(errors.cpf && touched.cpf)}
          >
            <Field
              invalid={!!(errors.cpf && touched.cpf)}
              name="cpf"
              type="text"
              label="Name"
              component={Input}
            />
          </FormItem>
          <p>
            Pague direto da sua conta, de forma rápida e segura. O PIX permite
            transferência de dinheiro entre contas sem limite de horário, 24
            horas por dia, 7 dias por semana.
          </p>
          <p>
            Sua assinatura será confirmada após a identificação da transferência
            pelo nosso sistema.
          </p>
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

          <ButtonPrimary loading={loading} disabled={loading}>
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

export default PixPayment;
