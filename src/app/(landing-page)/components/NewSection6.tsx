import React from "react";
import LogoEasyToLive from "@/images/easytolive/logo/logobranca-fundoprimary.svg";
import Image from "next/image";
import { ButtonFourth } from "@/components";

const NewSection6 = () => {
  return (
    <div className="container flex justify-between items-center">
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
        <div className="text-white flex flex-col gap-4 items-center">
          <p className="text-lg mb-4">
            E você pode começar agora mesmo a aproveitar todos <br />
            os descontos enquanto começa a viver quem você nasceu para ser.
          </p>
          <p className="pt-4">
            Aperte no botão abaixo e finalize seu cadastro!{" "}
          </p>
          <ButtonFourth>Começar o meu teste gratuito</ButtonFourth>
        </div>
      </div>

      <div className="w-full h-auto md:w-96 md:h-96 rounded-3xl border-2 border-secondary-main flex items-center justify-center text-white">
        Imagem
      </div>
    </div>
  );
};

export default NewSection6;
