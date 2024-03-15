import React from "react";
import Image, { StaticImageData } from "next/image";

interface Section4CardProps {
  icon: StaticImageData;
  label: string;
}

const Section4Card: React.FC<Section4CardProps> = ({ icon, label }) => {
  return (
    <div className="flex flex-col p-12 border-2 rounded-3xl border-secondary-main hover:border-primary-main hover:shadow-md justify-center items-center pt-14 text-white">
      <Image
        src={icon}
        alt="alternative Icon Image"
        className="w-20 h-auto rounded-full"
      />
      <p className="max-w-xs pt-20">{label}</p>
    </div>
  );
};

export default Section4Card;
