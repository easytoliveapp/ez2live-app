"use client";

import { ButtonPrimary, ButtonThird } from "@/components";
import React from "react";
import SocialLoginComponent from "../auth/(public)/login/SocialLoginComponent";
import PreLoginImage from "@/images/easytolive/home/pre-login-backGround.jpg";
import Image from "next/image";
import Logo from "@/images/easytolive/logo/logocompleta-semfundoazulroxo.svg";

const PreLoginPage = () => {
  return (
    <div className="p-4 m-auto md:max-w-[600px] relative">
      <Image
        className="md:max-w-[600px] m-auto"
        alt="pre login back-ground"
        src={PreLoginImage}
        objectFit="cover"
        objectPosition="center"
        layout="fill"
      />
      <div className="flex min-h-[90vh] flex-col w-full justify-between pb-4">
        <Image
          className="z-50 mx-auto pt-12"
          alt="easy to live logo"
          src={Logo}
        />
        <div className="z-50 max-w-xs flex mb-30 flex-col gap-2 ">
          <p className="font-semibold text-black text-xl">
            Falta pouco para você aproveitar o seu desconto...
          </p>
          <p className="font-semibold text-xs text-black">
            Preencha seus dados ou crie sua conta
          </p>
        </div>
        <span></span>
        <span></span>
        <div className="flex w-full flex-col gap-3">
          <SocialLoginComponent />
          <ButtonPrimary className="!p-3">Já tenho uma conta</ButtonPrimary>
          <ButtonThird className="!text-primary-main !p-0 m-1">
            Cadastrar nova conta
          </ButtonThird>
        </div>
      </div>
    </div>
  );
};

export default PreLoginPage;
