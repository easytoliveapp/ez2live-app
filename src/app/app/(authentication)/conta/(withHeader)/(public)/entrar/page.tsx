"use client";
import React, { useEffect } from "react";

import Link from "next/link";
import { SocialLoginComponent } from "@/components";
import FormComponent from "./FormComponent";
import { useSearchParams } from "next/navigation";
import { showToastify } from "@/hooks/showToastify";

const PageLogin = () => {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");
  const errorMessage = params.get("error");
  useEffect(() => {
    if (errorMessage === "AccessDenied") {
      showToastify({
        type: "error",
        label: `Ops! Parece que não foi possível concluir o seu login.
         Por favor, experimente utilizar uma outra forma de autenticação para acessar a sua conta`,
      });
    }
  });

  return (
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container mb-8 lg:mb-32">
        <div className="mt-8 mb-16 flex items-center justify-between">
          <h2 className=" pl-6 flex items-center text-2xl leading-[115%] md:text-5xl md:leading-[115%] font-bold text-black dark:text-neutral-100 justify-center">
            Entrar
          </h2>
          <div>
            <div className="relative rounded-full w-40 h-16 bg-gradient-to-r from-secondary-main to-secondary-ligther">
              <div className="absolute top-8 right-0 rounded-full w-16 h-16 bg-gradient-to-r from-secondary-main to-secondary-ligther"></div>
            </div>
          </div>
        </div>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <FormComponent />
          <span className="block text-center text-sm text-black font-semibold dark:text-neutral-300">
            Não tem uma conta?{" "}
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
              registrar
            </Link>
          </span>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 justify-center flex font-semibold text-sm items-center w-full dark:text-neutral-400 dark:bg-neutral-900">
              <div className="bg-white h-0.5 w-full mr-4"></div>
              <p className="w-4 ">OU</p>
              <div className="bg-white h-0.5 w-full ml-4"></div>
            </span>
          </div>
          {/* SOCIAL */}
          <SocialLoginComponent />
          {/* ==== */}

          <span className=" block pt-6 text-center text-sm font-medium text-black dark:text-neutral-300">
            <div className="bg-white h-0.5 w-auto m-auto mb-4"></div>
            <p> Tem um estabelecimento e quer se juntar a nós? </p>
            <Link
              className="text-primary-main text-sm font-semibold"
              href="/app/conta/cadastrar/parceiro"
            >
              Cadastre-se!
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
