"use client";
import React, { useState } from "react";
import { StepOne } from "./step1";
import { StepTwo } from "./step2";
import { StepThree } from "./step3";
import { StepFour } from "./step4";

const PaymentPage = () => {
  const STEPS = {
    PAYMENT: 0,
    LOADING_PAYMENT: 1,
    PAYMENT_ACCEPT: 2,
    PAYMENT_REJECT: 3,
  };

  const [currentStep, setCurrentStep] = useState<number>(STEPS.PAYMENT);
  const [paymentTab, setPaymentTab] = useState<"creditCard" | "pix">(
    "creditCard",
  );
  const renderStep = (step: number) => {
    switch (step) {
      case STEPS.PAYMENT:
        return (
          <StepOne
            PaymentTab={paymentTab}
            SetPaymentTab={setPaymentTab}
            setCurrentStep={setCurrentStep}
          />
        );
      case STEPS.LOADING_PAYMENT:
        return <StepTwo PaymentTab={paymentTab} />;
      case STEPS.PAYMENT_ACCEPT:
        return <StepThree />;
      case STEPS.PAYMENT_REJECT:
        return <StepFour setCurrentStep={setCurrentStep} />;
      default:
        return (
          <StepOne
            PaymentTab={paymentTab}
            SetPaymentTab={setPaymentTab}
            setCurrentStep={setCurrentStep}
          />
        );
    }
  };

  return (
    <div className="bg-generic-gray h-full min-h-[calc(100vh-66px)] flex flex-col justify-center items-center">
      {renderStep(currentStep)}
    </div>
  );
};

export default PaymentPage;
