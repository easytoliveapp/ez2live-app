import React, { FC } from "react";
import rightImgDemo from "../images/promo2.png";
import backgroundLineSvg from "../images/Moon.svg";
import LogoImage from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";
import { ButtonPrimary } from "@/components";
import Image from "next/image";

export interface SectionPromo2Props {
  className?: string;
}

const SectionPromo2: FC<SectionPromo2Props> = ({ className = "lg:pt-10" }) => {
  return (
    <div className={`nc-SectionPromo2 ${className}`} id="EasyToLive">
      <div className="relative flex flex-col lg:flex-row lg:justify-end bg-yellow-50 dark:bg-slate-800 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
        <div className="absolute inset-0">
          <Image
            className="absolute w-full h-full object-contain dark:opacity-5"
            src={backgroundLineSvg}
            alt="backgroundLineSvg"
          />
        </div>

        <div className="lg:w-[45%] max-w-lg relative">
          <Image src={LogoImage} className="w-28" alt="Logo Easy" />
          <h2 className="font-semibold text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-6 sm:mt-10 !leading-[1.13] tracking-tight">
            A Easy quer
            <br />
            facilitar sua vida
          </h2>
          <span className="block mt-6 text-slate-500 dark:text-slate-400">
            Através de descontos em diversas áreas, nós vamos te conectar com os
            melhores produtos pelos melhor preço
          </span>
          <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
            <ButtonPrimary
              href="/app/conta/acessar"
              className="dark:bg-slate-200 dark:text-slate-900"
            >
              Procurar descontos
            </ButtonPrimary>
          </div>
        </div>

        <Image
          className="relative block lg:absolute lg:left-0 lg:bottom-0 mt-10 lg:mt-0 max-w-xl lg:max-w-[calc(55%-40px)]"
          src={rightImgDemo}
          alt="Promo Image"
        />
      </div>
    </div>
  );
};

export default SectionPromo2;
