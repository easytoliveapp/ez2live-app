import React, { FC } from "react";
import backgroundLineSvg from "../images/Moon.svg";
import imageRightPng2 from "../images/hero-2-right-1.png";
import { ButtonPrimary } from "@/components";
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
        <div className="flex flex-col md:items-start items-center space-y-5 pt-24">
          <h2 className="font-bold text-black text-3xl text-center md:text-left sm:text-4xl md:text-4xl xl:text-5xl 2xl:text-6xl !leading-[115%]">
            Viver e praticar uma vida saudável nunca foi tão fácil e barato.
          </h2>
          <div className="pt-4 gap-3 grid">
            <div>
              <ButtonPrimary href="/app/conta/acessar" className="text-slate-2">
                GARANTIR ACESSO
              </ButtonPrimary>
            </div>
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
