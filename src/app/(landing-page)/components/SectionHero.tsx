import React, { FC } from "react";
import { ButtonFourth } from "@/components";
import IphoneCelular from "../images/png/06 IPhone Celular Smartphone Mockup PSD.png";
import Image from "next/image";
export interface SectionHero3Props {
  className?: string;
}

const SectionHero3: FC<SectionHero3Props> = ({ className = "" }) => {
  return (
    <div
      className={`relative ${className} container`}
      data-nc-id="SectionHero3"
    >
      <div className="flex flex-wrap md:flex-nowrap mt-34 lg:mt-10 space-y-5 justify-between">
        {/* 1st column */}
        <div className="flex flex-col col-span-2 md:items-start items-center space-y-5 pt-20 relative">
          <h2 className="font-bold text-white text-3xl lg:pt-20 text-center md:text-left md:text-4xl !leading-[115%] z-50">
            Viver e praticar uma
            <span className="text-primary-main"> vida saudável </span> <br />
            nunca foi tão
            <span className="text-primary-main"> fácil e barato.</span>
          </h2>
          <p className="text-white max-w-md z-50">
            Cadastre-se para acessar os maiores descontos das melhores lojas a
            um clique de distância!
          </p>
          <div>
            <ButtonFourth href="/app/conta/acessar" className="text-slate-2">
              GARANTIR ACESSO
            </ButtonFourth>
          </div>
        </div>

        {/* 2nd column */}
        <div className="w-full h-full grow m-auto flex justify-center items-center max-w-2xl">
          <Image src={IphoneCelular} alt="Iphone Cell" />
        </div>
      </div>
    </div>
  );
};

export default SectionHero3;
