"use client";

import {
  CreditCardPayment,
  OneStepToPayment,
  PixPayment,
  SimpleModal,
  PaymentMethod,
} from "@/components";
import { INVOICE_STATUS } from "@/constants/payment";
import { PAYMENT } from "@/constants/paymentMethods";
import subscriptionService from "@/service/subscription.service";
import { IPaymentResponseData } from "@/types/payment";
import { useEffect } from "react";

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
  const getLastInvoiceInfo = async () => {
    subscriptionService.getLastInvoice().then((res: any) => {
      if (res.data.status === INVOICE_STATUS.PENDING) {
        setPaymentTab(res.data.payableWith);
        setCurrentStep(1);
        setPaymentResponseData({
          invoiceId: res.data.id,
          ...(res.data.payableWith === PAYMENT.pix && {
            qrCodeValue: {
              image: res.data.subscriptionResponse.pix.qrCode,
              text: res.data.subscriptionResponse.pix.qrCodeText,
            },
          }),
        });
      }
    });
  };

  useEffect(() => {
    getLastInvoiceInfo();
  }, []);

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
