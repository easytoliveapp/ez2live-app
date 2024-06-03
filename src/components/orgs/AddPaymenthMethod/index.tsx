"use client";
import React, { useState } from "react";
import { CreditCardForm, Modal, PaymentMethodEmpty } from "@/components";
import { ICreditCardPayment } from "@/types/payment";
import useIugu from "@/payment/iugu";
import subscriptionService from "@/service/subscription.service";
import { showToastify } from "@/hooks/showToastify";

interface IAddPaymentMethodProps {
  handlePaymentMethodInfo: (e: any) => void;
}

const AddPaymentMethod: React.FC<IAddPaymentMethodProps> = ({
  handlePaymentMethodInfo,
}) => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const Iugu = useIugu(process.env.NEXT_PUBLIC_IUGU_ID);

  const handleSubmit = async (values: ICreditCardPayment) => {
    const fragmentedName = values.fullName.split(" ");
    const firstName = fragmentedName[0];
    const lastName = fragmentedName.slice(1).join(" ");

    const iuguData = {
      number: values.creditCard,
      first_name: firstName,
      last_name: lastName,
      full_name: values.fullName,
      verification_value: values.cvv,
      month: values.cardMonth,
      year: values.cardYear,
    };
    setLoading(true);
    Iugu.setTestMode(process.env.NEXT_PUBLIC_TEST_MODE);
    const iuguJsToken = await Iugu.createPaymentToken(iuguData);
    await subscriptionService
      .createPaymentMethod(iuguJsToken.id)
      .then(() => {
        subscriptionService.getPaymentMethod().then((res: any) => {
          handlePaymentMethodInfo({
            data: {
              brand: res.data.data.brand,
              lastDigits: res.data.data.lastDigits,
              month: res.data.data.month,
              year: res.data.data.year,
              holderName: res.data.data.holderName,
            },
          });
          setOpenModal(false);
        });
        showToastify({
          type: "success",
          label: "Seu cartão foi salvo com sucesso.",
        });
      })
      .catch(() => {
        showToastify({
          type: "error",
          label:
            "Ocorreu um erro ao criar um método de pagamento. Verifique os dados e tente novamente",
        });
      });

    setLoading(false);
  };
  return (
    <div>
      <Modal
        show={openModal}
        closeOnBlur={true}
        onCloseModal={() => setOpenModal(false)}
      >
        <h2 className="text-lg font-bold text-center">
          Adicionar meio de pagamento
        </h2>
        <CreditCardForm loading={loading} handleSubmit={handleSubmit} />
      </Modal>
      <PaymentMethodEmpty onClick={() => setOpenModal(true)} />
    </div>
  );
};

export default AddPaymentMethod;
