"use client";
import React, { useState } from "react";
import { PaymentStep } from "./PaymentStep";
import { WaitingApprovalStep } from "./WaitingApprovalStep";
import { AcceptedPaymentStep } from "./AcceptedPaymentStep";
import { RejectedPaymentStep } from "./RejectedPaymentStep";
import { PAYMENT } from "@/constants/paymentMethods";
import { IPaymentResponseData } from "@/types/payment";

const PaymentPage = () => {
  const STEPS = {
    PAYMENT: 0,
    LOADING_PAYMENT: 1,
    PAYMENT_ACCEPT: 2,
    PAYMENT_REJECT: 3,
  };

  const [currentStep, setCurrentStep] = useState<number>(STEPS.PAYMENT);
  const [paymentResponseData, setPaymentResponseData] =
    useState<IPaymentResponseData>({
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
            setPaymentResponseData={setPaymentResponseData}
          />
        );
      case STEPS.LOADING_PAYMENT:
        return (
          <WaitingApprovalStep
            paymentTab={paymentTab}
            setCurrentStep={setCurrentStep}
            paymentResponseData={paymentResponseData}
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
            setPaymentResponseData={setPaymentResponseData}
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
