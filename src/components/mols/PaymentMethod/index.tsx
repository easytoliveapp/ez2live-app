import React from "react";
import Image from "next/image";
import CreditCardIcon from "@/images/easytolive/payment/credit-card-icon.svg";
import PixIcon from "@/images/easytolive/payment/pix-icon.svg";
import { PAYMENT } from "@/constants/paymentMethods";

interface PaymentMethodProps {
  SetPaymentTab: React.Dispatch<React.SetStateAction<string>>;
  PaymentTab: string;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  SetPaymentTab,
  PaymentTab,
}) => {
  return (
    <div className="flex w-full justify-center">
      <div
        className={`cursor-pointer flex flex-col justify-center items-center w-full px-4 py-5 ${
          PaymentTab === PAYMENT.creditCard
            ? "opacity-100 border-b-2 border-black"
            : "opacity-50 bg-generic-gray"
        }`}
        onClick={() => SetPaymentTab(PAYMENT.creditCard)}
      >
        <Image
          alt="credit-card-icon"
          src={CreditCardIcon}
          width={16}
          height={13}
        />
        <p className="text-xs font-bold">Cartão de crédito</p>
      </div>
      <span className="bg-generic-grayDarker z-50 w-1"></span>
      <div
        className={`cursor-pointer flex flex-col justify-center items-center w-full px-4 py-5  ${
          PaymentTab === PAYMENT.pix
            ? "opacity-100 border-b-2 border-black"
            : "opacity-50 bg-generic-gray"
        }`}
        onClick={() => SetPaymentTab(PAYMENT.pix)}
      >
        <Image alt="pix-icon" src={PixIcon} width={16} height={13} />
        <p className="text-xs font-bold">PIX</p>
      </div>
    </div>
  );
};

export default PaymentMethod;
