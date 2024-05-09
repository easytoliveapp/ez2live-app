import React from "react";
import { ButtonPrimary, SimpleModal } from "@/components";
import Image from "next/image";
import RefusedIcon from "@/images/easytolive/icons/refused-icon.svg";

interface IRejectedPaymentStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export const RejectedPaymentStep: React.FC<IRejectedPaymentStepProps> = ({
  setCurrentStep,
}) => {
  const STEPS = {
    PAYMENT: 0,
    LOADING_PAYMENT: 1,
    PAYMENT_ACCEPT: 2,
    PAYMENT_REJECT: 3,
  };
  return (
    <div className="flex flex-col items-center">
      <SimpleModal className="text-center">
        <Image alt="refused-icon" src={RefusedIcon} width={70} height={70} />
        <p className="text-xl font-extrabold"> Oooops, algo deu errado...</p>
        <p className="text-sm font-medium">
          Sua assinatura não pôde ser confirmada.
        </p>
        <p className="text-sm font-medium">
          Verifique os detalhes do seu cartão e <br />
          tente novamente ou confira outra forma <br />
          de pagamento.
        </p>
      </SimpleModal>
      <ButtonPrimary
        onClick={() => setCurrentStep(STEPS.PAYMENT)}
        className="w-full"
      >
        Tentar Novamente
      </ButtonPrimary>
    </div>
  );
};
