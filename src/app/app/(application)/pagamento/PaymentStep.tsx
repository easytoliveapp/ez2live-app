"use client";

import {
  CreditCardPayment,
  OneStepToPayment,
  PixPayment,
  SimpleModal,
  PaymentMethod,
} from "@/components";
import { PAYMENT } from "@/constants/paymentMethods";
import { IPixResponseData } from "@/types/payment";

interface IPaymentStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  PaymentTab: string;
  setPaymentTab: React.Dispatch<React.SetStateAction<string>>;
  setPixData: React.Dispatch<React.SetStateAction<IPixResponseData>>;
}

export const PaymentStep: React.FC<IPaymentStepProps> = ({
  setCurrentStep,
  PaymentTab,
  setPaymentTab,
  setPixData,
}) => {
  return (
    <div>
      <OneStepToPayment />
      <SimpleModal className="!p-0">
        <PaymentMethod PaymentTab={PaymentTab} SetPaymentTab={setPaymentTab} />
        {PaymentTab === PAYMENT.creditCard ? (
          <CreditCardPayment currentStepPayment={setCurrentStep} />
        ) : (
          <PixPayment
            currentStepPayment={setCurrentStep}
            setPixData={setPixData}
          />
        )}
      </SimpleModal>
    </div>
  );
};
