import React from "react";
import EasyLogo from "@/images/easytolive/logo/logotipo-semfundoazulroxo.svg";
import Image from "next/image";
import { SimpleModal } from "@/components";

const OneStepToPayment = () => {
  return (
    <SimpleModal>
      <Image alt="Logo-easy-to-live" src={EasyLogo} width={53} height={53} />
      <p className="text-lg font-bold text-center">
        Você está há 1 passo de economizar ainda mais!
      </p>
      <p className="text-center">
        Seja um assinante EasyToLive e tenha acesso aos melhores descontos em
        nosso app.
      </p>
      <span className="text-xs">
        <span className="text-xl font-bold">R$ 29,90</span>/mês
      </span>
    </SimpleModal>
  );
};

export default OneStepToPayment;
