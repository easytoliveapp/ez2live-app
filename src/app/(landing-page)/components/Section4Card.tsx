import React from "react";
import Image, { StaticImageData } from "next/image";

interface Section4CardProps {
  icon: StaticImageData;
  label: string;
}

const Section4Card: React.FC<Section4CardProps> = ({ icon, label }) => {
  return (
    <div className=" p-12 border-2 border-secondary-main hover:border-primary-main">
      <Image src={icon} alt="alternative Icon Image" className="w-10 h-auto" />
      <p className="max-w-md">{label}</p>
    </div>
  );
};

export default Section4Card;
