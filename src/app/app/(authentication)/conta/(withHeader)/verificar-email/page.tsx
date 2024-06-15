"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import { ButtonPrimary, LoadingComponent } from "@/components";
import CheckIcon from "@/images/easytolive/icons/checked-success.svg";
import EmptyIcon from "@/images/easytolive/icons/empty-icon.svg";
import { getItemByLocalStorage } from "@/utils/localStorageHelper";

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
  };

  const callBackUrl = getItemByLocalStorage("callbackCouponUrl");

  React.useEffect(() => {
    if (params) {
      handleVerifyEmail();
    }
  }, [params]);

  return (
    <div className="flex flex-col gap-8 pt-24 items-center justify-between">
      <span></span>
      {paramsObject.token && isEmailVerified && (
        <>
          <Image alt="Ez-2-live-logo" src={CheckIcon} className="w-auto h-14" />
          <div className="flex flex-col gap-1 w-full justify-center items-center">
            <h2 className="pt-2 text-lg font-semibold">
              Cadastro criado com succeso!
            </h2>
            <p className="p-4 max-w-xl text-center">
              Você acabou de verificar seu e-mail, agora você pode acessar sua
              conta e encontrar os melhores descontos com a EasyToLive.
            </p>
          </div>
        </>
      )}

      {!(paramsObject.token || isEmailVerified) && (
        <>
          <LoadingComponent fullSize={false} bgStyle="none" size="medium" />
          <div className="flex flex-col gap-1 w-full justify-center items-center">
            <h2 className="pt-2 text-lg font-semibold">Verificando e-mail</h2>
            <p className="p-4 max-w-xl text-center">
              Aguarde um momento enquanto verificamos seu e-mail
            </p>
          </div>
        </>
      )}

      {paramsObject.token && !isEmailVerified && verifiedError && (
        <>
          <Image alt="Ez-2-live-logo" src={EmptyIcon} className="w-auto h-14" />
          <div className="flex flex-col gap-1 w-full justify-center items-center">
            <h2 className="pt-2 text-lg font-semibold">
              Não foi possível validar sua conta
            </h2>
            <p className="p-4 max-w-xl text-center">
              Tivemos um erro para verificar seu e-mail, por favor tente
              novamente ou entre em contato com o suporte em
              contato@easytolive.com.br
            </p>
          </div>
        </>
      )}

      <ButtonPrimary
        onClick={() => {
          router.push(
            `/app/conta/entrar${callBackUrl && "?callbackUrl=" + encodeURIComponent(callBackUrl)}`,
          );
        }}
      >
        Entrar com email/senha
      </ButtonPrimary>
    </div>
  );
};

export default VerifyEmail;
