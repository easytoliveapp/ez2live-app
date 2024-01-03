import React, { FC } from "react";
import Image from "next/image";
import rightImgDemo from "../images/promo3.png";
import backgroundLineSvg from "../images/BackgroundLine.svg";
import { ButtonPrimary } from "@/components";

export interface SectionPromo3Props {
  className?: string;
}

const SectionPromo3: FC<SectionPromo3Props> = ({ className = "lg:pt-10" }) => {
  return (
    <div className={`nc-SectionPromo3 ${className}`}>
      <div className="relative flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-800 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
        <div className="absolute inset-0">
          <img
            className="absolute w-full h-full object-contain object-bottom dark:opacity-5"
            src={backgroundLineSvg}
            alt="backgroundLineSvg"
          />
        </div>

        <div className="lg:w-[50%] max-w-lg relative">
          <h2 className="font-semibold text-4xl md:text-5xl">
            Não perca tempo, a melhor oferta pode estar acabando
          </h2>
          <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
            Cadastra-se para ter acesso primeiro ao app EasyToLive
          </span>
          <form className="mt-10 relative max-w-sm">
            <ButtonPrimary type="submit">Criar minha conta agora</ButtonPrimary>
          </form>
        </div>

        <Image
          className="relative block lg:absolute lg:right-0 lg:bottom-0 mt-10 lg:mt-0 max-w-lg lg:max-w-[calc(50%-40px)]"
          src={rightImgDemo}
        />
      </div>
    </div>
  );
};

export default SectionPromo3;
