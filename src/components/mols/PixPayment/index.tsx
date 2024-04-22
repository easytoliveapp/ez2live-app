import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, ButtonPrimary, FormItem } from "@/components";
import * as Yup from "yup";

const PixPayment = () => {
  const [loading, setLoading] = useState(false);

  const PixPaymentValidationSchema = Yup.object().shape({
    name: Yup.string().required("Campo nome é requerido"),
  });

  const handleSubmit = async (values: any) => {
    setLoading(true);
    console.log(values);
    setLoading(false);
  };

  const initialValues = {
    cpf: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PixPaymentValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
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
          <ButtonPrimary loading={loading} disabled={loading}>
            Gerar QR Code
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
};

export default PixPayment;
