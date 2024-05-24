import React, { useEffect } from "react";
import Image from "next/image";
import LogoEasy from "@/images/easytolive/logo/logotipo-semfundoazulroxo.svg";
import { ButtonPrimary } from "@/components/atoms";
import { setItemToLocalStorage } from "@/utils/localStorageHelper";

const TrialEnded = () => {
  useEffect(() => {
    setItemToLocalStorage("sawTrialEndedCTM", true);
  });

  return (
    <div className="flex flex-col justify-center items-center text-center space-y-5">
      <Image src={LogoEasy} alt="easy-logo" className="h-12 w-auto my-6" />
      <h2 className="font-black text-base">
        Você está há 1 passo de economizar ainda mais!
      </h2>
      <span className="text-generic-alertRed font-bold text-sm">
        {"Seu período de testes acabou :("}
      </span>
      <p>
        Agora você pode tornar-se assinante{" "}
        <strong className="text-primary-main font-medium">EasyToLive</strong> e
        continue tendo acesso aos <strong>melhores descontos</strong> em nosso
        app
      </p>

      <ButtonPrimary href="/app/pagamento" className="!text-xs">
        {" "}
        Quero os melhores descontos
      </ButtonPrimary>
    </div>
  );
};

export default TrialEnded;
