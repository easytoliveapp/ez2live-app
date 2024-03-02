"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Checked from "@/images/easytolive/icons/checked-success.svg";
import { ButtonPrimary, ButtonSecondary } from "@/components";
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
    <div className="flex flex-col items-center justify-between pt-24 gap-8">
      <span></span>
      <Image alt="Ez-2-live-logo" src={Checked} className="w-auto h-14" />
      <div className="flex flex-col gap-1 w-full justify-center items-center">
        <h2 className="pt-2 text-lg font-semibold">Bem-vindo ao EasyToLive</h2>
        <p className="p-4 max-w-xl text-center">
          Sua conta como <b>parceiro EasyToLive</b> foi enviada para análise do
          nosso time. Quando for aprovada você receberá um e-mail com as
          instruções para acessar sua conta.
        </p>
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
