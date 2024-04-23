"use client";
import React, { useState } from "react";
import { CreditCardPayment, PixPayment, SimpleModal } from "@/components";
import EasyLogo from "@/images/easytolive/logo/logotipo-semfundoazulroxo.svg";
import Image from "next/image";
import CreditCardIcon from "@/images/easytolive/payment/credit-card-icon.svg";
import PixIcon from "@/images/easytolive/payment/pix-icon.svg";

const OneStepToSaveMoneyComponent = () => {
  return (
    <div>
      <SimpleModal>
        <Image alt="Logo-easy-to-live" src={EasyLogo} width={53} height={53} />
        <p className="text-lg font-bold text-center">
          Você está há 1 passo de economizar ainda mais!
        </p>
        <p className="text-center">
          Seja um assinante EasyToLive e tenha acesso aos melhores descontos em
          nosso app.
        </p>
        <span className="text-xs">
          <span className="text-xl font-bold">R$ 29,90</span>/mês
        </span>
      </SimpleModal>
    </div>
  );
};

const PaymentPage = () => {
  const [PaymentTab, SetPaymentTab] = useState("cartao");

  const PaymentMethod = () => {
    return (
      <div className="flex w-full justify-around">
        <div
          className={` flex flex-col justify-center items-center w-full ${
            PaymentTab === "cartao" ? "opacity-100" : "opacity-60"
          }`}
          onClick={() => SetPaymentTab("cartao")}
        >
          <Image
            alt="credit-card-icon"
            src={CreditCardIcon}
            width={16}
            height={13}
          />
          <p className="text-xs font-bold">Cartão de crédito</p>
        </div>
        <span className="bg-generic-grayLighter h-9 w-0.5"></span>
        <div
          className={`w-full flex flex-col justify-center items-center ${
            PaymentTab === "pix" ? "opacity-100" : "opacity-60"
          }`}
          onClick={() => SetPaymentTab("pix")}
        >
          <Image alt="pix-icon" src={PixIcon} width={16} height={13} />
          <p className="text-xs font-bold">PIX</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-grayLighter flex flex-col justify-center items-center">
      <OneStepToSaveMoneyComponent />
      <SimpleModal>
        <PaymentMethod />
        {PaymentTab === "cartao" ? <CreditCardPayment /> : <PixPayment />}
      </SimpleModal>
    </div>
  );
};

export default PaymentPage;
