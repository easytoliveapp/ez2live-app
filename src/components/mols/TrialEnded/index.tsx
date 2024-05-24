import React from "react";
import Image from "next/image";
import LogoEasy from "@/images/easytolive/logo/logotipo-semfundoazulroxo.svg";
import { ButtonPrimary } from "@/components/atoms";

const TrialEnded = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center space-y-6 sm:px-14 px-2">
      <Image src={LogoEasy} alt="easy-logo" className="h-20 w-auto" />
      <h2 className="font-black text-lg sm:px-12 px-3 py-2 bg-generic-limeGreen rounded-full text-white">
        Você está há 1 passo de <br /> economizar ainda mais!
      </h2>
      <span className="text-generic-alertRed font-semibold text-base">
        {"Seu período de testes acabou :("}
      </span>
      <p className="font-medium">
        Agora você pode tornar-se assinante{" "}
        <strong className="text-primary-main font-black">EasyToLive</strong> e
        continue tendo acesso aos <strong>melhores descontos</strong> em nosso
        app.
      </p>
      <div className="sm:px-5 w-full">
        <ButtonPrimary href="/app/pagamento" className=" w-full">
          {" "}
          Quero os melhores descontos
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default TrialEnded;
