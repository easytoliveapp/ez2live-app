"use client";

import {
  CreditCardPayment,
  OneStepToPayment,
  PixPayment,
  SimpleModal,
  PaymentMethod,
} from "@/components";

interface IStepOneProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  PaymentTab: "creditCard" | "pix";
  SetPaymentTab: React.Dispatch<React.SetStateAction<"creditCard" | "pix">>;
}

export const StepOne: React.FC<IStepOneProps> = ({
  setCurrentStep,
  PaymentTab,
  SetPaymentTab,
}) => {
  return (
    <div>
      <OneStepToPayment />
      <SimpleModal>
        <PaymentMethod PaymentTab={PaymentTab} SetPaymentTab={SetPaymentTab} />
        {PaymentTab === "creditCard" ? (
          <CreditCardPayment currentStepPayment={setCurrentStep} />
        ) : (
          <PixPayment currentStepPayment={setCurrentStep} />
        )}
      </SimpleModal>
    </div>
  );
};
