import React from "react";
import Image from "next/image";
import CreditCardIcon from "@/images/easytolive/payment/credit-card-icon.svg";
import PixIcon from "@/images/easytolive/payment/pix-icon.svg";
import { PAYMENT } from "@/constants/paymentMethods";

interface PaymentMethodProps {
  SetPaymentTab: React.Dispatch<React.SetStateAction<string>>;
  paymentTab: string;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  SetPaymentTab,
  paymentTab,
}) => {
  return (
    <div className="flex w-full justify-center">
      <div
        className={`cursor-pointer bg-main-purple rounded-t-[20px] flex flex-col justify-center items-center w-full px-4 py-5 ${
          paymentTab === PAYMENT.creditCard
        }`}
        onClick={() => SetPaymentTab(PAYMENT.creditCard)}
      >
        <span className="text-white flex flex-col items-center">
          <h1 className="text-3xl font-bold">Quase lá</h1>

          <p className="mt-4">Seja Easy por apenas</p>
          <p>
            <strong className="text-4xl">R$ 29,90</strong>/mês
          </p>
        </span>
      </div>
    </div>
  );
};

export default PaymentMethod;
