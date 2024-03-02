"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Checked from "@/images/easytolive/icons/checked-success.svg";
import { ButtonPrimary } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const SupplierRegistered = () => {
  const router = useRouter();
  const params = useSearchParams();

  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user.supplierInfo?.isVerified === true) {
      router.push("/app/dashboard");
    }
  }, []);
  // by url query param
  const isSupplier = params.get("isSupplier") === "1";
  const message = isSupplier
    ? "Sua conta foi criada para análise do nosso time. Quando for aprovada você receberá um e-mail com as instruções para acessar sua conta."
    : "Cadastro criado com sucesso! Verifique seu e-mail para acessar sua conta.";
  return (
    <div className="flex flex-col items-center justify-between pt-24 gap-8">
      <span></span>
      <Image alt="Ez-2-live-logo" src={Checked} className="w-auto h-14" />
      <div className="flex flex-col gap-1 w-full justify-center items-center">
        <h2 className="pt-2 text-lg font-semibold">Bem-vindo a EasyToLive</h2>
        <p className="p-4 max-w-xl text-center">{message}</p>
      </div>

      <ButtonPrimary
        onClick={() => {
          router.push("/");
        }}
      >
        Visite nosso site
      </ButtonPrimary>
    </div>
  );
};

export default SupplierRegistered;
