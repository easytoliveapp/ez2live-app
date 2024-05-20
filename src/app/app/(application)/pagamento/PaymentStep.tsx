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
  paymentTab: string;
  setPaymentTab: React.Dispatch<React.SetStateAction<string>>;
  setPixData: React.Dispatch<React.SetStateAction<IPixResponseData>>;
}

export const PaymentStep: React.FC<IPaymentStepProps> = ({
  setCurrentStep,
  paymentTab,
  setPaymentTab,
  setPixData,
}) => {
  return (
    <div>
      <OneStepToPayment />
      <SimpleModal className="!p-0">
        <PaymentMethod paymentTab={paymentTab} SetPaymentTab={setPaymentTab} />
        {paymentTab === PAYMENT.creditCard ? (
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
