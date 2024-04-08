import React from "react";
import LogoEasyToLive from "@/images/easytolive/logo/logobranca-fundoprimary.svg";
import Image from "next/image";
import { ButtonFourth } from "@/components";
import HappyMen from "../images/png/sport-concept-smiling-handsome-tiny.png";

const NewSection6 = () => {
  return (
    <div className="container flex flex-wrap md:flex-nowrap gap-20 items-center">
      <div className="space-y-8">
        <Image
          src={LogoEasyToLive}
          alt="Logo EasyToLive"
          className="h-auto w-40 rounded-3xl"
        />
        <h2 className="text-white text-2xl md:text-3xl font-bold">
          Somos mais do que um aplicativo de cupons… <br />
          <span className="text-primary-main">Somos o futuro!</span>
        </h2>
        <div className="text-white flex flex-col gap-4 items-start">
          <p className="text-lg mb-4">
            E você pode começar agora mesmo a aproveitar todos <br />
            os descontos enquanto começa a viver quem você nasceu para ser.
          </p>
          <p className="pt-4">
            Aperte no botão abaixo e finalize seu cadastro!{" "}
          </p>
          <ButtonFourth href="/app/conta/acessar">
            Começar o meu teste gratuito
          </ButtonFourth>
        </div>
      </div>
      <div className="grow w-full h-full flex items-start justify-center">
        <Image
          src={HappyMen}
          alt="Happy Men Runnig"
          className="drop-shadow-xl shadow-black"
        />
      </div>
    </div>
  );
};

export default NewSection6;
