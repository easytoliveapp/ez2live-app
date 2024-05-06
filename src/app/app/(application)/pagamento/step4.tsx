import React from "react";
import { ButtonPrimary, SimpleModal } from "@/components";
import Image from "next/image";
import RefusedIcon from "@/images/easytolive/icons/refused-icon.svg";

interface IStepFourProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export const StepFour: React.FC<IStepFourProps> = ({ setCurrentStep }) => {
  const STEPS = {
    PAYMENT: 0,
    LOADING_PAYMENT: 1,
    PAYMENT_ACCEPT: 2,
    PAYMENT_REJECT: 3,
  };
  return (
    <div>
      <SimpleModal className="text-center space-y-2">
        <Image alt="refused-icon" src={RefusedIcon} width={36} height={36} />
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
