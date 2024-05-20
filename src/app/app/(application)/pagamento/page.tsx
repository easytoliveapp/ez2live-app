"use client";
import React, { useState } from "react";
import { PaymentStep } from "./PaymentStep";
import { WaitingApprovalStep } from "./WaitingApprovalStep";
import { AcceptedPaymentStep } from "./AcceptedPaymentStep";
import { RejectedPaymentStep } from "./RejectedPaymentStep";
import { PAYMENT } from "@/constants/paymentMethods";
import { IPixResponseData } from "@/types/payment";

const PaymentPage = () => {
  const STEPS = {
    PAYMENT: 0,
    LOADING_PAYMENT: 1,
    PAYMENT_ACCEPT: 2,
    PAYMENT_REJECT: 3,
  };

  const [currentStep, setCurrentStep] = useState<number>(STEPS.PAYMENT);
  const [pixData, setPixData] = useState<IPixResponseData>({
    invoiceId: "",
    qrCodeValue: {
      image: "",
      text: "",
    },
  });
  const [paymentTab, setPaymentTab] = useState(PAYMENT.creditCard);
  const renderStep = (step: number) => {
    switch (step) {
      case STEPS.PAYMENT:
        return (
          <PaymentStep
            paymentTab={paymentTab}
            setPaymentTab={setPaymentTab}
            setCurrentStep={setCurrentStep}
            setPixData={setPixData}
          />
        );
      case STEPS.LOADING_PAYMENT:
        return (
          <WaitingApprovalStep
            paymentTab={paymentTab}
            setCurrentStep={setCurrentStep}
            pixData={pixData}
          />
        );
      case STEPS.PAYMENT_ACCEPT:
        return <AcceptedPaymentStep />;
      case STEPS.PAYMENT_REJECT:
        return <RejectedPaymentStep setCurrentStep={setCurrentStep} />;
      default:
        return (
          <PaymentStep
            paymentTab={paymentTab}
            setPaymentTab={setPaymentTab}
            setCurrentStep={setCurrentStep}
            setPixData={setPixData}
          />
        );
    }
  };

  return (
    <div className="bg-generic-gray h-full min-h-[calc(100vh-66px)] flex flex-col pt-14 items-center">
      {renderStep(currentStep)}
    </div>
  );
};

export default PaymentPage;
