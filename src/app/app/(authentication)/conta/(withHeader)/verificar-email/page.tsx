"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import { ButtonPrimary } from "@/components";
import Ez2LiveLogo from "@/images/easytolive/logo/logocompleta-semfundoazulroxo.svg";

const VerifyEmail = () => {
  const router = useRouter();

  const params = useSearchParams();
  const paramsObject = Object.fromEntries(params.entries());

  const [isEmailVerified, setIsEmailVerified] = React.useState(false);
  const [verifiedError, setVerifiedError] = React.useState(false);

  const handleVerifyEmail = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email?token=${paramsObject.token}`,
    );

    if (!response.ok) {
      setIsEmailVerified(false);
      setVerifiedError(true);
      return;
    }

    setIsEmailVerified(true);
    router.push("/app/conta/entrar");
  };

  React.useEffect(() => {
    if (params) {
      handleVerifyEmail();
    }
  }, [params]);

  // Return a user email verified message
  return (
    <div className="flex h-[calc(100vh-120px)] flex-col items-center justify-between">
      <span></span>
      <Image alt="Ez-2-live-logo" src={Ez2LiveLogo} className="w-auto h-28" />
      {paramsObject.token && isEmailVerified && (
        <div className="flex flex-col gap-1 w-full justify-center items-center">
          <h2 className="pt-2 text-lg font-semibold">
            Cadastro criado com succeso!
          </h2>
          <p className="p-4 max-w-xl">
            Você acabou de verificar seu e-mail, agora você pode acessar sua
            conta
          </p>
        </div>
      )}

      {!(paramsObject.token || isEmailVerified) && (
        <div className="flex flex-col gap-1 w-full justify-center items-center">
          <h2 className="pt-2 text-lg font-semibold">Verificando e-mail</h2>
          <p className="p-4 max-w-xl">
            Aguarde um momento enquanto verificamos seu e-mail
          </p>
        </div>
      )}

      {paramsObject.token && !isEmailVerified && verifiedError && (
        <div className="flex flex-col gap-1 w-full justify-center items-center">
          <h2 className="pt-2 text-lg font-semibold">Erro ao verificar</h2>
          <p className="p-4 max-w-xl">
            Tivemos um erro para verificar seu e-mail, por favor tente novamente
          </p>
        </div>
      )}

      <ButtonPrimary
        onClick={() => {
          router.push("/app/conta/entrar");
        }}
      >
        Voltar
      </ButtonPrimary>
    </div>
  );
};

export default VerifyEmail;
