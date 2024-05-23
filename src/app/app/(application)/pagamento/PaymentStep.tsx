"use client";

import {
  CreditCardPayment,
  OneStepToPayment,
  PixPayment,
  SimpleModal,
  PaymentMethod,
} from "@/components";
import { PAYMENT } from "@/constants/paymentMethods";
import { IPaymentResponseData } from "@/types/payment";

interface IPaymentStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  paymentTab: string;
  setPaymentTab: React.Dispatch<React.SetStateAction<string>>;
  setPaymentResponseData: React.Dispatch<
    React.SetStateAction<IPaymentResponseData>
  >;
}

export const PaymentStep: React.FC<IPaymentStepProps> = ({
  setCurrentStep,
  paymentTab,
  setPaymentTab,
  setPaymentResponseData,
}) => {
  return (
    <div>
      <OneStepToPayment />
      <SimpleModal className="!p-0">
        <PaymentMethod paymentTab={paymentTab} SetPaymentTab={setPaymentTab} />
        {paymentTab === PAYMENT.creditCard ? (
          <CreditCardPayment
            currentStepPayment={setCurrentStep}
            setPaymentResponseData={setPaymentResponseData}
          />
        ) : (
          <PixPayment
            currentStepPayment={setCurrentStep}
            setPaymentResponseData={setPaymentResponseData}
          />
        )}
      </SimpleModal>
    </div>
  );
};
