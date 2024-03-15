import React from "react";
import { ButtonFourth } from "@/components";
import CommunitImage from "@/images/easytolive/user/user_circle_color_primary.svg";
import CouponImage from "@/images/easytolive/icons/couponPrimary.svg";
import ComunicationImage from "@/images/easytolive/icons/email-primary.svg";
import Section4Card from "./Section4Card";

const NewSection4 = () => {
  const CARDS_CONTENT = [
    {
      icon: CouponImage,
      label:
        "Cupons exclusivos de descontos entregues com descrição em todas as nossas empresas parceiras",
    },
    {
      icon: ComunicationImage,
      label:
        "Comunicações feitas para você, te avisando quando o que você mais procura entrar em promoção",
    },
    {
      icon: CommunitImage,
      label: `Acesso a uma comunidade para atingir seus
              objetivos, recebendo o apoio de todos
              os membros.
              `,
    },
  ];

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6 md:gap-20 p-6 py-14 md:pt-8">
      <h2 className="text-white text-3xl md:text-2xl">
        Fomos criados para te ajudar a <br />
        <span className="text-primary-main">
          se tornar a sua melhor versão!
        </span>
      </h2>
      <p className="pt-2 text-secondary-main">
        Assinando a Easy to Live você receberá acesso a:
      </p>
      <div className="flex flex-wrap gap-10">
        {CARDS_CONTENT.map((card, index) => (
          <Section4Card icon={card.icon} key={index} label={card.label} />
        ))}
      </div>
      <ButtonFourth href="/app/conta/acessar">
        QUERO PARTICIPAR DA EASY TO LIVE
      </ButtonFourth>
    </div>
  );
};

export default NewSection4;
