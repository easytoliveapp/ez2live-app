"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Ez2LiveLogo from "@/images/easytolive/logo/logocompleta-semfundoazulroxo.svg";
import { ButtonPrimary } from "@/components";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const SupplierRegistered = () => {
  const router = useRouter();

  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user.supplierInfo?.isVerified === true) {
      router.push("/app/dashboard");
    }
  }, []);

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col items-center justify-between">
      <span></span>
      <Image alt="Ez-2-live-logo" src={Ez2LiveLogo} className="w-auto h-28" />
      <div className="flex flex-col gap-1 w-full justify-center items-center">
        <h2 className="pt-2 text-lg font-semibold">
          Cadastro criado com succeso!
        </h2>
        <p className="p-4 max-w-xl">
          sua conta como parceiro EasyToLive foi enviada para análise do nosso
          time. quando for aprovada você receberá um e-mail com as instruções
          para acessar sua conta
        </p>
      </div>

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

export default SupplierRegistered;
