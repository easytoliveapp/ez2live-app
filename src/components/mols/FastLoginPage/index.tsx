"use client";

import { ButtonPrimary, SocialLoginComponent } from "@/components";
import React, { useState } from "react";
import PreLoginImage from "@/images/easytolive/home/fast-login-background.jpeg";
import Image from "next/image";
import Logo from "@/images/easytolive/logo/logotipo-semfundoazulroxo.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const FastLoginPage = () => {
  const [loadingLogin, setLoadingLogin] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");

  const handleRedirectToLogin = async () => {
    setLoadingLogin(true);
    router.push(
      callbackUrl
        ? `/app/conta/entrar?callbackUrl=${encodeURIComponent(callbackUrl)}`
        : "/app/conta/entrar",
    );
    setTimeout(() => {
      setLoadingLogin(false);
    }, 1500);
  };

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
      <div className="absolute w-full opacity-50 h-full bg-neutral-200"></div>
      <motion.div
        className="flex min-h-[90vh] flex-col w-full justify-between px-4 pb-6 pt-48 md:pt-28 md:pb-16 md:px-36 xl:px-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 25, 50, 75, 100] }}
        transition={{ ease: "easeIn", duration: 2 }}
      >
        <div className="z-50">
          <Image
            className="w-auto h-40 pt-12"
            alt="easy to live logo"
            src={Logo}
          />
          <div className="flex py-12 flex-col gap-5 ">
            <p className="font-bold max-w-[250px] md:max-w-sm text-black text-2xl">
              Realize seu login ou crie sua conta abaixo E acesse os melhores
              cupons Criados pensando em você!
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:max-w-xs">
          <SocialLoginComponent />
          <ButtonPrimary
            onClick={() => handleRedirectToLogin()}
            loading={loadingLogin}
            className="!p-3 hover:translate-y-[-2px]"
          >
            Entrar com email/senha
          </ButtonPrimary>
        </div>
      </motion.div>
    </div>
  );
};

export default FastLoginPage;
