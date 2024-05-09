"use client";

import {
  CreditCardPayment,
  OneStepToPayment,
  PixPayment,
  SimpleModal,
  PaymentMethod,
} from "@/components";
import { PAYMENT } from "@/constants/paymentMethods";

interface IPaymentStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  PaymentTab: string;
  SetPaymentTab: React.Dispatch<React.SetStateAction<string>>;
}

export const PaymentStep: React.FC<IPaymentStepProps> = ({
  setCurrentStep,
  PaymentTab,
  SetPaymentTab,
}) => {
  return (
    <div>
      <OneStepToPayment />
      <SimpleModal className="!p-0">
        <PaymentMethod PaymentTab={PaymentTab} SetPaymentTab={SetPaymentTab} />
        {PaymentTab === PAYMENT.creditCard ? (
          <CreditCardPayment currentStepPayment={setCurrentStep} />
        ) : (
          <PixPayment currentStepPayment={setCurrentStep} />
        )}
      </SimpleModal>
    </div>
  );
};
