"use client";

import { ButtonPrimary, ButtonThird } from "@/components";
import React from "react";
import SocialLoginComponent from "../auth/(public)/login/SocialLoginComponent";
import PreLoginImage from "@/images/easytolive/home/pre-login-backGround.jpg";
import Image from "next/image";
import Logo from "@/images/easytolive/logo/logocompleta-semfundoazulroxo.svg";

const PreLoginPage = () => {
  return (
    <div className="p-4 m-auto relative bg-gradient-to-b from-generic-gray to-[#DFE1E3]">
      <Image
        className="md:max-w-[500px] absolute right-0"
        alt="pre login back-ground"
        src={PreLoginImage}
        objectFit="cover"
      />
      <div className="flex min-h-[90vh] md:max-w-[600px] flex-col w-full justify-between px-3 pb-6">
        <Image
          className="z-50 w-36 h-auto pt-12"
          alt="easy to live logo"
          src={Logo}
        />
        <div className="z-50 max-w-xs flex mb-30 flex-col gap-2 ">
          <p className="font-semibold text-black text-2xl">
            Falta pouco para você aproveitar o seu desconto...
          </p>
          <p className="font-semibold text-xs text-black">
            preencha seus dados ou crie sua conta
          </p>
        </div>
        <span></span>
        <span></span>
        <div className="flex w-full items-center flex-col gap-3">
          <SocialLoginComponent />
          <ButtonPrimary className="!p-3">Já tenho uma conta</ButtonPrimary>
          <ButtonThird className="!text-black !p-0 m-1">
            Cadastrar nova conta
          </ButtonThird>
        </div>
      </div>
    </div>
  );
};

export default PreLoginPage;
