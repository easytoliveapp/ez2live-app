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
      <Slider {...settings}>
        {partners.map((partner, index) => (
          <div key={index}>
            <div className="flex gap-5 flex-col justify-center items-center mb-5 text-white">
              <div>
                <Image
                  className="rounded-full shadow-black shadow-2xl"
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
    </div>
  );
};

export default PartnersSlider;
