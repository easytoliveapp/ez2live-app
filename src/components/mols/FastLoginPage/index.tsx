"use client";

import { ButtonPrimary, SocialLoginComponent } from "@/components";
import React, { useState } from "react";
import PreLoginImage from "@/images/easytolive/home/fast-login-background.jpeg";
import Image from "next/image";
// import Logo from "logobranca";
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

  const variants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-red-100 w-scren h-screen select-none">
      <aside className=" w-[34rem] h-full bg-main-purple">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5 }}
          className="p-16 bg-main-gray w-full h-[75%] rounded-b-[30px] flex flex-col gap-8 shadow-xl"
        >
          <Image
            src="/logobranca.svg"
            alt="logo branca"
            width={100}
            height={90}
          />
          <h1 className="text-white leading-[3rem] text-[40px]">
            <strong>Você está a 1 passo</strong> de facilitar sua rotina
            saudável!
          </h1>

          <p className="text-xl text-white font-semibold">Continue abaixo:</p>

          <div
            id="social-wrapper"
            className="bg-white w-full h-[5rem] flex rounded-full hover:cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all"
          >
            <div
              id="icon-wrapper"
              className="bg-red-100 w-[5rem] h-[5rem] rounded-full"
            ></div>

            <div
              id="cta"
              className="flex-1 h-full items-center justify-center flex"
            >
              <p className="text-xl">Continuar com o Google</p>
            </div>
          </div>

          <div
            id="social-wrapper"
            className="bg-main-purple w-full h-[5rem] flex rounded-full hover:cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all"
          >
            <div
              id="icon-wrapper"
              className="bg-red-100 w-[5rem] h-[5rem] rounded-full"
            ></div>

            <button
              id="cta"
              className="flex-1 h-full items-center justify-center flex"
              onClick={() => handleRedirectToLogin()}
            >
              <p className="text-xl font-semibold text-white">
                Entrar com e-mail e senha
              </p>
            </button>
          </div>

          <p className="text-lg text-white">
            Ainda não possui uma conta?{" "}
            <strong className="text-[#A47AFF] hover:cursor-pointer">
              Clique aqui
            </strong>
          </p>
        </motion.div>

        <div className="p-16 flex flex-col items-center justify-center gap-4">
          <p className="text-xl text-white">Tenho uma empresa</p>

          <button className="px-8 py-2 border-4 rounded-full border-white text-xl text-white hover:scale-105 transition-all">
            <strong>QUERO SER PARCEIRO</strong>
          </button>
        </div>
      </aside>
    </section>
  );
};

export default FastLoginPage;
