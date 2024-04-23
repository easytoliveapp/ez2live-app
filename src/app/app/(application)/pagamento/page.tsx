"use client";
import React, { useState } from "react";
import {
  ButtonFourth,
  ButtonPrimary,
  ButtonThird,
  CreditCardPayment,
  LoadingPayment,
  OneStepToPayment,
  PixPayment,
  SimpleModal,
} from "@/components";
import Image from "next/image";
import PixImage from "@/images/easytolive/payment/pix-image.svg";
import CreditCardIcon from "@/images/easytolive/payment/credit-card-icon.svg";
import PixIcon from "@/images/easytolive/payment/pix-icon.svg";
import CheckIcon from "@/images/easytolive/icons/checkIcon.svg";
import RefusedIcon from "@/images/easytolive/icons/refused-icon.svg";
import QRCode from "react-qr-code";

const PaymentPage = () => {
  const STEPS = {
    PAYMENT: 0,
    LOADING_PAYMENT: 1,
    PAYMENT_ACCEPT: 2,
    PAYMENT_REJECT: 3,
  };

  const [PaymentTab, SetPaymentTab] = useState("cartao");
  const [currentStep, setCurrentStep] = useState<number>(STEPS.PAYMENT);

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

  const StepOne = () => {
    return (
      <div>
        <OneStepToPayment />
        <SimpleModal>
          <PaymentMethod />
          {PaymentTab === "cartao" ? <CreditCardPayment /> : <PixPayment />}
        </SimpleModal>
      </div>
    );
  };

  const StepTwo = () => {
    return (
      <div>
        <LoadingPayment paymentMethod={PaymentTab} />
        {PaymentTab === "pix" && (
          <SimpleModal>
            <div className="w-full flex justify-center my-3">
              <Image alt="Pix Image" src={PixImage} width={82} height={33} />
            </div>
            <p className="font-bold text-generic-dark">QR Code</p>
            <QRCode
              value="123123123123123"
              className="w-32 h-32"
              height={128}
              width={128}
            />
            <p className="font-bold text-generic-dark my-5">Copia e Cola</p>
            <p>asdasd1q23e2121qweqweqwe23</p>

            <ButtonFourth className="!border-generic-limeGreen !text-generic-limeGreen">
              Copiar Código PIX
            </ButtonFourth>
          </SimpleModal>
        )}
      </div>
    );
  };

  const StepThree = () => {
    return (
      <div className="max-w-sm w-full">
        <SimpleModal>
          <Image alt="accept-icon" src={CheckIcon} width={84} height={84} />
          <p className="text-lg font-bold">Pagamento Aprovado</p>
          <p className="text-center">
            Sua assinatura está confirmada! <br />
            Você agora é um <strong>assinante EasyToLive</strong> e já possui
            acesso aos melhores descontos
          </p>
        </SimpleModal>
        <SimpleModal className="space-y-4 text-center">
          <div>
            <p>Nome</p>
            <p>
              <strong>{"João Victor"}</strong>
            </p>
          </div>
          <div>
            <p>E-mail</p>
            <p>
              <strong>{"joaovictornutri@gmail.com"}</strong>
            </p>
          </div>
          <div>
            <p>Status Assinatura</p>
            <p>
              <strong className="text-generic-alertGreen">Ativa</strong>
            </p>
          </div>
          <div>
            <p>Próxima cobrança</p>
            <p>
              <strong>{"04/06/2024"}</strong>
            </p>
          </div>
        </SimpleModal>
        <div className="flex flex-col">
          <ButtonPrimary href="/app/meus-cupons">
            Quero meu desconto
          </ButtonPrimary>
          <ButtonThird className="!text-generic-dark" href="/app/minha-conta">
            Visitar perfil
          </ButtonThird>
        </div>
      </div>
    );
  };

  const StepFour = () => {
    return (
      <div>
        <SimpleModal className="text-center space-y-2">
          <Image alt="refused-icon" src={RefusedIcon} width={36} height={36} />
          <p className="text-lg font-bold">Pagamento Recusado</p>
          <p className="text-sm font-medium">
            Sua assinatura não pôde ser confirmada. <br /> O pagamento não foi
            aprovado e você <br /> pode tentar novamente.
          </p>
          <p className="text-sm font-medium">
            Seu pagamento não foi concluído. <br />
            Verifique os detalhes do cartão ou tente <br />
            outro método de pagamento. Estamos <br />
            aqui para ajudar se você precisar. Tentar Novamente
          </p>
        </SimpleModal>
        <ButtonPrimary
          onClick={() => setCurrentStep(STEPS.PAYMENT)}
          className="w-full"
        >
          Tentar Novamente
        </ButtonPrimary>
      </div>
    );
  };

  const renderStep = (step: number) => {
    switch (step) {
      case STEPS.PAYMENT:
        return <StepOne />;
      case STEPS.LOADING_PAYMENT:
        return <StepTwo />;
      case STEPS.PAYMENT_ACCEPT:
        return <StepThree />;
      case STEPS.PAYMENT_REJECT:
        return <StepFour />;
      default:
        return <StepOne />;
    }
  };

  return (
    <div className="bg-generic-gray h-full min-h-[calc(100vh-66px)] flex flex-col justify-center items-center">
      {renderStep(currentStep)}
    </div>
  );
};

export default PaymentPage;
