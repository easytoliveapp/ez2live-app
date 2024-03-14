import { ButtonPrimary } from "@/components";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

const PartnersSlider: React.FC = () => {
  const partners = [
    { name: "Parceiro 1", logo: "https://logo.clearbit.com/trello.com" },
    { name: "Parceiro 2", logo: "https://logo.clearbit.com/faceit.com" },
    { name: "Parceiro 3", logo: "https://logo.clearbit.com/foodnetwork.com" },
    {
      name: "Parceiro 4",
      logo: "https://logo.clearbit.com/comidaereceitas.com.br",
    },
    {
      name: "Parceiro 5",
      logo: "https://logo.clearbit.com/comidasperuanas.net",
    },
    { name: "Parceiro 6", logo: "https://logo.clearbit.com/nytimes.com" },
    { name: "Parceiro 7", logo: "https://logo.clearbit.com/nypost.com" },
    // Add more partners here
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div>
      <h2 className="font-semibold text-white text-2xl xl:text-3xl 2xl:text-4xl mt-6 sm:mt-10 mb-24 text-center">
        Criamos um aplicativo com maiores e melhores lojas, naquele precinho e a
        poucos metros de você!
      </h2>

      <Slider {...settings}>
        {partners.map((partner, index) => (
          <div key={index}>
            <div className="flex gap-5 flex-col justify-center items-center mb-5">
              <div>
                <Image
                  className="rounded-full"
                  src={partner.logo}
                  alt={partner.name}
                  width="80"
                  height="80"
                />
              </div>
              <div>
                <span>{partner.name}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <ButtonPrimary
        href="/app/conta/cadastrar/parceiro"
        className="text-primary-main text-underline hover:font-semibold transition-all"
      >
        GARANTIR ACESSO
      </ButtonPrimary>
    </div>
  );
};

export default PartnersSlider;
