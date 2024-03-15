import React from "react";
import LogoEasyToLive from "@/images/easytolive/logo/logobranca-fundoprimary.svg";
import Image from "next/image";
import { ButtonFourth } from "@/components";

const NewSection6 = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-wrap gap-10 items-center">
        <Image
          src={LogoEasyToLive}
          alt="Logo EasyToLive"
          className="h-auto w-40 rounded-3xl"
        />
        <h2 className="text-white text-2xl md:text-3xl">
          Somos mais do que um aplicativo de cupons… <br />
          <span className="text-primary-main">Somos o futuro!</span>
        </h2>
      </div>
      <div className="flex flex-wrap gap-14 pt-10 items-center justify-center">
        <div className="text-white flex flex-col gap-4 items-center">
          <p className="text-lg mb-8">
            E você pode começar agora mesmo a aproveitar todos <br />
            os descontos enquanto começa a viver quem você nasceu para ser.
          </p>
          <p className=" pt-10">
            {" "}
            Aperte no botão abaixo e finalize seu cadastro!{" "}
          </p>
          <ButtonFourth>Começar o meu teste gratuito</ButtonFourth>
        </div>
        <div className="w-80 h-80 rounded-3xl border-2 border-secondary-main flex items-center justify-center text-white">
          {" "}
          Imagem{" "}
        </div>
      </div>
    </div>
  );
};

export default NewSection6;
