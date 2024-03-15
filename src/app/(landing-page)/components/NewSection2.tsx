import React from "react";
import LogoImage from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";
import Image from "next/image";

const NewSection2 = () => {
  return (
    <div className="w-full flex flex-col gap-6 md:gap-20 p-6 py-14 md:pt-32">
      <div className="flex flex-wrap justify-center items-center gap-8">
        <div className="flex flex-col gap-2 text-white">
          <h2 className=" font-bold text-2xl">
            A sua forma de levar a vida <br /> pode ser muito melhor... <br />e
            mais em conta.
          </h2>
          <p className="max-w-[380px] text-[14px]">
            Quando você pensa em mudar seu estilo de vida, tomar um suplemento,
            realizar um procedimento ou até praticar um esporte, o que vem na
            sua cabeça?
          </p>
        </div>
        <div className="flex flex-col gap-5 text-secondary-main font-bold text-2xl">
          <span className="flex gap-6 items-center">
            <div className="h-4 w-4 bg-secondary-main rounded-full"></div>
            Que é caro?
          </span>
          <span className="flex gap-6 items-center">
            <div className="h-4 w-4 bg-secondary-main rounded-full"></div>
            Que é difícil ter acesso?
          </span>
          <span className="flex gap-6 items-center">
            <div className="h-4 w-4 bg-secondary-main rounded-full"></div>
            Que é muito complicado?
          </span>
        </div>
      </div>
      <div className="flex justify-center flex-wrap gap-14 md:flex-nowrap items-center">
        <Image
          src={LogoImage}
          className=" w-56 md:w-[400px]  rounded-full"
          alt="Logo Easy"
        />
        <div className="flex flex-col gap-3">
          <h2 className=" font-bold text-2xl text-secondary-main">
            Nós viemos para <br />
            revolucionar o mercado <br />e mudar esse pensamento.
          </h2>
          <p className="text-white max-w-md">
            Criamos um movimento de milhões de pessoas que estão dispostas a
            quebrar o padrão e mudar de vida.
          </p>
          <p className="text-white max-w-md">
            E para transformar os nossos sonhos em realidade, fechamos parceria
            com AS MELHORES lojas de Fortaleza.
          </p>
          <p className="text-white max-w-md">
            Todas disponibilizando descontos exlusivos para que você possa
            aproveitar com a gente para atingir a sua melhor versão.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewSection2;
