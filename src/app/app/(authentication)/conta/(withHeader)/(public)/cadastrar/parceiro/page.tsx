import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoImage from "@/images/easytolive/logo/logotipo-semfundoazulroxo.svg";
import FormComponent from "./FormComponent";
import Supplier from "@/images/easytolive/home/home_4.svg";

const SupplierRegisterPage = () => {
  return (
    <section className="bg-red-100 w-screen items-center justify-center h-screen flex bg-[url('/background-4th-tela.png')] bg-cover bg-center">
      <main className="bg-white w-[34rem] px-8 pb-16 pt-8 rounded-2xl overflow-y-scroll max-h-[90%] max-w-[90%]">
        <div className="w-full h-fit mb-4">
          <button className="flex items-center justify-center">
            <Image src="/arrow.svg" alt="arrow icon" width={50} height={25} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image src={LogoImage} alt="logo" width={90} />

          <span className="mt-10">
            <h1 className="text-4xl">
              <strong>Expanda seus negócios!</strong>
            </h1>

            <p className="text-center text-lg leading-[1.5rem] mt-4">
              Ser parceiro Easy é facilitar a vida de {<br />} quem nunca te
              abandona
            </p>
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

            <button className="text-xl mt-4 h-[3rem] font-bold text-white bg-main-purple p-3 rounded-[20px]">
              CRIAR CONTA
            </button>

            <button className="text-md font-bold h-[3rem] text-white bg-main-gray p-3 rounded-[20px]">
              ENTRAR EM CONTA JÁ EXISTENTE
            </button>
          </form>
        </div>
      </main>
    </section>
  );
};

export default SupplierRegisterPage;
