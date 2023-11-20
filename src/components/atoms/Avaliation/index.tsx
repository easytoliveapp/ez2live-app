import React, { FC } from "react";
import Image from "next/image";
import Star from "@/images/easytolive/icons/Star.svg";
interface AvaliationProps {
  rating?: string;
}

const Avaliation: FC<AvaliationProps> = ({ rating }) => {
  if (!rating) return <></>;

  return (
    <div className="flex flex-wrap justify-end gap-1 items-center">
      <Image className="w-5 h-auto" src={Star} alt="Star" />
      {rating && <span className="font-semibold text-xs">{rating}</span>}
    </div>
  );
};

export default Avaliation;
