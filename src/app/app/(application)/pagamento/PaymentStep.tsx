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
  setPaymentTab: React.Dispatch<React.SetStateAction<string>>;
  setQrCode: React.Dispatch<React.SetStateAction<string>>;
}

export const PaymentStep: React.FC<IPaymentStepProps> = ({
  setCurrentStep,
  PaymentTab,
  setPaymentTab,
  setQrCode,
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
            setQrCode={setQrCode}
          />
        )}
      </SimpleModal>
    </div>
  );
};
