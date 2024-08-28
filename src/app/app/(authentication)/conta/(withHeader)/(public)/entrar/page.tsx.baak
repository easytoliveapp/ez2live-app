"use client";
import React, { useEffect } from "react";

import LogoImage from "@/images/easytolive/logo/logotipo-semfundoazulroxo.svg";

import Image from "next/image";
import Link from "next/link";
import { SocialLoginComponent } from "@/components";
import FormComponent from "./FormComponent";
import { useSearchParams } from "next/navigation";
import { showToastify } from "@/hooks/showToastify";

import { motion } from "framer-motion";

const PageLogin = () => {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");
  const errorMessage = params.get("error");
  useEffect(() => {
    if (!!errorMessage) {
      showToastify({
        type: "error",
        label: `Ops! Parece que não foi possível concluir o seu login.
         Por favor, experimente utilizar uma outra forma de autenticação para acessar a sua conta`,
      });
    }
  });

  const variants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="nc-PageLogin bg-red-100 w-screen items-center justify-center h-screen flex"
      data-nc-id="PageLogin"
    >
      <motion.main
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
        className="bg-white w-[34rem] px-8 pb-16 pt-8 rounded-2xl overflow-y-scroll max-h-[90%]"
      >
        <div className="w-full h-fit mb-4">
          <button className="flex items-center justify-center">
            <Image src="/arrow.svg" alt="arrow icon" width={50} height={25} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image src={LogoImage} alt="logo" width={90} />

          <span className="mt-10">
            <h1 className="text-4xl">Um estilo de vida </h1>
            <h1 className="text-4xl">
              <strong>saudável e fácil</strong>
            </h1>
          </span>

          <form className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="ml-6 mb-2 text-lg" htmlFor="email">
                Email:
              </label>
              <input
                className="border-[2px] rounded-[20px] p-3"
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu email"
              />
            </div>
            <div className="flex flex-col">
              <label className="ml-6 mb-2 text-lg" htmlFor="password">
                Senha:
              </label>
              <input
                className="border-[2px] rounded-[20px] p-3"
                type="password"
                id="password"
                name="password"
                placeholder="Digite sua senha"
              />
            </div>

            <p className="font-bold underline">Esqueceu sua senha?</p>

            <button className="text-xl font-bold text-white bg-main-purple p-3 rounded-[20px]">
              ENTRAR
            </button>

            <span className="w-full flex items-center justify-center">
              <p className="text-xl font-semibold">OU</p>
            </span>

            <div
              id="social-wrapper"
              className="bg-white w-full h-[4rem] flex rounded-full hover:cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all"
            >
              <div
                id="icon-wrapper"
                className="bg-red-100 w-[4rem] h-[4rem] rounded-full"
              ></div>

              <div
                id="cta"
                className="flex-1 h-full items-center justify-center flex"
              >
                <p className="text-lg">Continuar com o Google</p>
              </div>
            </div>

            <hr />

            <span className="text-main-purple mt-2">
              Ainda não possui uma conta?{" "}
              <Link
                className="text-primary-main font-semibold cursor-pointer"
                href={
                  callbackUrl
                    ? `/app/conta/cadastrar/usuario?callbackUrl=${encodeURIComponent(
                        callbackUrl,
                      )}`
                    : "/app/conta/cadastrar/usuario"
                }
              >
                <strong>Clique aqui</strong>
              </Link>
            </span>
          </form>
        </div>
      </motion.main>
    </section>
  );
};

export default PageLogin;
