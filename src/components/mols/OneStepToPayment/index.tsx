import React from "react";
import EasyLogo from "@/images/easytolive/logo/logotipo-semfundoazulroxo.svg";
import Image from "next/image";
import { SimpleModal } from "@/components";

const OneStepToPayment = () => {
  return (
    <SimpleModal>
      <Image alt="Logo-easy-to-live" src={EasyLogo} width={53} height={53} />
      <p className="text-lg font-bold text-center text-white rounded-full px-5 py-1 bg-generic-limeGreen">
        Você está há 1 passo de <br /> economizar ainda mais!
      </p>
      <p className="text-center px-12">
        Seja um assinante{" "}
        <strong className="text-primary-main">EasyToLive</strong> e tenha acesso
        aos <strong>melhores descontos</strong> em nosso app.
      </p>
      <span className="text-xs">
        <span className="text-2xl font-bold">R$ 29,90</span>/mês
      </span>
    </SimpleModal>
  );
};

export default OneStepToPayment;
