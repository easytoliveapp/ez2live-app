import React, { FC } from "react";
import backgroundLineSvg from "../images/Moon.svg";
import imageRightPng2 from "../images/hero-2-right-1.png";
import { ButtonPrimary, ButtonThird } from "@/components";
import Image from "next/image";

export interface SectionHero3Props {
  className?: string;
}

const SectionHero3: FC<SectionHero3Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionHero3 relative ${className}`}
      data-nc-id="SectionHero3"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-[80%] mx-auto my-5">
        {/* 1st column */}
        <div className="flex flex-col items-start space-y-5">
          <span className="sm:text-lg md:text-xl font-semibold text-neutral-900">
            Conheça a EasyToLive 🔥
          </span>
          <h2 className="font-bold text-black text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl !leading-[115%]">
            Os melhores descontos nas melhores lojas
          </h2>
          <div className="pt-4 gap-3">
            <ButtonPrimary href="/app/conta/acessar">
              Criar minha conta
            </ButtonPrimary>

            <ButtonThird
              href="#EasyToLive"
              className="text-sm sm:text-base lg:text-lg font-medium text-primary-lighter hover:text-primary-main"
            >
              Conhecer mais
            </ButtonThird>
          </div>
        </div>

        {/* 2nd column */}
        <div className="relative">
          <Image
            className="absolute w-full h-full object-contain"
            src={backgroundLineSvg}
            alt="hero"
          />
          <Image
            className="w-full object-contain h-[500px]"
            src={imageRightPng2}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default SectionHero3;
