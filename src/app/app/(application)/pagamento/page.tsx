"use client";
import React, { useState } from "react";
import { PaymentStep } from "./PaymentStep";
import { WaitingApprovalStep } from "./WaitingApprovalStep";
import { AcceptedPaymentStep } from "./AcceptedPaymentStep";
import { RejectedPaymentStep } from "./RejectedPaymentStep";
import { PAYMENT } from "@/constants/paymentMethods";

const PaymentPage = () => {
  const STEPS = {
    PAYMENT: 0,
    LOADING_PAYMENT: 1,
    PAYMENT_ACCEPT: 2,
    PAYMENT_REJECT: 3,
  };

  const [currentStep, setCurrentStep] = useState<number>(STEPS.PAYMENT);
  const [qrCode, setQrCode] = useState("");
  const [paymentTab, setPaymentTab] = useState(PAYMENT.creditCard);
  const renderStep = (step: number) => {
    switch (step) {
      case STEPS.PAYMENT:
        return (
          <PaymentStep
            PaymentTab={paymentTab}
            setPaymentTab={setPaymentTab}
            setCurrentStep={setCurrentStep}
            setQrCode={setQrCode}
          />
        );
      case STEPS.LOADING_PAYMENT:
        return (
          <WaitingApprovalStep PaymentTab={paymentTab} qrCodeValue={qrCode} />
        );
      case STEPS.PAYMENT_ACCEPT:
        return <AcceptedPaymentStep />;
      case STEPS.PAYMENT_REJECT:
        return <RejectedPaymentStep setCurrentStep={setCurrentStep} />;
      default:
        return (
          <PaymentStep
            PaymentTab={paymentTab}
            setPaymentTab={setPaymentTab}
            setCurrentStep={setCurrentStep}
            setQrCode={setQrCode}
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
