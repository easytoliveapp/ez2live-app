"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { LoadingComponent } from "@/components/atoms";
interface IEmptyCoupons {
  icon: StaticImageData;
  title: string;
  label?: string;
  href?: string;
}

const EmptyCoupons: React.FC<IEmptyCoupons> = ({
  icon,
  title,
  label = "",
  href = "",
}) => {
  const [isloading, setIsLoading] = useState(false);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Image
        className="w-24 m-8 bg-white p-4 h-auto rounded-full "
        src={icon}
        alt="Imagem Cupom"
      />
      <h3 className="text-lg font-semibold mb-10">{title}</h3>
      {label && href && href ? (
        <a
          onClick={() => setIsLoading(true)}
          className=" font-semibold cursor-pointer text-primary-main"
          href={href}
        >
          {isloading ? (
            <LoadingComponent fullSize={false} bgStyle="none" />
          ) : (
            label
          )}
        </a>
      ) : (
        <p className=" font-semibold text-primary-main">{label}</p>
      )}
    </div>
  );
};

export default EmptyCoupons;
