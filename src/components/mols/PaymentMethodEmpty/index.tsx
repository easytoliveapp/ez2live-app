import React from "react";
import SumIcon from "@/images/easytolive/icons/sum-circle-icon-primary-main.svg";
import Image from "next/image";

interface IPaymentMethodEmptyProps {
  onClick: (e?: any) => void;
}

const PaymentMethodEmpty: React.FC<IPaymentMethodEmptyProps> = ({
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick()}
      className="bg-generic-grayLighter flex justify-center items-center gap-2 rounded-2xl cursor-pointer hover:scale-105 hover:opacity-90 w-48 h-32"
    >
      <Image src={SumIcon} alt="sum-icon" />
      <p className="text-primary-main font-semibold ">Adicionar Cartão</p>
    </div>
  );
};

export default PaymentMethodEmpty;
