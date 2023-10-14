"use client";

import { ButtonPrimary, ButtonThird, HeaderLogged } from "@/components";
import React from "react";
import PreLoginImage from "@/images/easytolive/home/fast-login-background.jpeg";
import Image from "next/image";
import Logo from "@/images/easytolive/logo/logocompleta-semfundoazulroxo.svg";
import SocialLoginComponent from "@/app/auth/(public)/login/SocialLoginComponent";

const FastLoginPage = () => {
  return (
    <div className="m-auto">
      <Image
        className="absolute right-0"
        alt="pre login back-ground"
        src={PreLoginImage}
        objectFit="cover"
        objectPosition="center"
        fill={true}
      />
      <div className="absolute -mt-[66px] w-full opacity-50 h-full bg-neutral-200"></div>
      <div className="absolute top-1 z-50 w-full">
        <HeaderLogged hasLogoImage={false} />
      </div>
      <div className="flex min-h-[90vh] flex-col w-full justify-between px-4 pb-6 pt-48 md:pt-28 md:pb-16 md:px-36 xl:px-60">
        <div className="z-50">
          <Image
            className="w-60 h-auto pt-12"
            alt="easy to live logo"
            src={Logo}
          />
          <div className="flex pt-8 flex-col gap-5 ">
            <p className="font-bold max-w-[250px] md:max-w-sm text-black text-2xl">
              Falta pouco para você aproveitar o seu desconto!
            </p>
            <p className="font-bold text-xs text-black">
              preencha seus dados ou crie sua conta
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:max-w-xs">
          <SocialLoginComponent />
          <ButtonPrimary href="/auth/login" className="!p-3">
            Já tenho uma conta
          </ButtonPrimary>
          <ButtonThird
            className="!p-0 m-1 !text-neutral-950"
            href="/auth/register/user"
          >
            Cadastrar nova conta
          </ButtonThird>
        </div>
      </div>
    </div>
  );
};

export default FastLoginPage;
