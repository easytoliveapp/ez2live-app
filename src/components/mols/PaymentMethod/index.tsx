import React from "react";
import Image from "next/image";
import CreditCardIcon from "@/images/easytolive/payment/credit-card-icon.svg";
import PixIcon from "@/images/easytolive/payment/pix-icon.svg";
import { PAYMENT } from "@/constants/paymentMethods";

interface PaymentMethodProps {
  SetPaymentTab: React.Dispatch<React.SetStateAction<"creditCard" | "pix">>;
  PaymentTab: "creditCard" | "pix";
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  SetPaymentTab,
  PaymentTab,
}) => {
  return (
    <div className="flex gap-4 w-full justify-around">
      <div
        className={`cursor-pointer flex flex-col justify-center items-center w-full ${
          PaymentTab === PAYMENT.creditCard
            ? "opacity-100 border-b-2 border-black"
            : "opacity-60 hover:bg-generic-gray"
        }`}
        onClick={() => SetPaymentTab("creditCard")}
      >
        <Image
          alt="credit-card-icon"
          src={CreditCardIcon}
          width={16}
          height={13}
        />
        <p className="text-xs font-semibold">Cartão de crédito</p>
      </div>
      <span className="bg-generic-grayLighter h-9 w-0.5"></span>
      <div
        className={`w-full cursor-pointer p-2 flex flex-col justify-center items-center ${
          PaymentTab === PAYMENT.pix
            ? "opacity-100 border-b-2 border-black"
            : "opacity-60 hover:bg-generic-gray"
        }`}
        onClick={() => SetPaymentTab("pix")}
      >
        <Image alt="pix-icon" src={PixIcon} width={16} height={13} />
        <p className="text-xs font-bold">PIX</p>
      </div>
    </div>
  );
};

export default PaymentMethod;
