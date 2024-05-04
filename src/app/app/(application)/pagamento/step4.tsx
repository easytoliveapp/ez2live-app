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
        <p className="text-lg font-bold">Pagamento Recusado</p>
        <p className="text-sm font-medium">
          Sua assinatura não pôde ser confirmada. <br /> O pagamento não foi
          aprovado e você <br /> pode tentar novamente.
        </p>
        <p className="text-sm font-medium">
          Seu pagamento não foi concluído. <br />
          Verifique os detalhes do cartão ou tente <br />
          outro método de pagamento. Estamos <br />
          aqui para ajudar se você precisar. Tentar Novamente
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
