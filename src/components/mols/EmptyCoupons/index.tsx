"use client";

import React, { useState } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { LoadingComponent } from "@/components/atoms";
interface IEmptyCoupons {
  couponColor: StaticImport;
  title: string;
  label?: string;
  href?: string;
}

const EmptyCoupons: React.FC<IEmptyCoupons> = ({
  couponColor,
  title,
  label,
  href,
}) => {
  const [stateLabel, setStateLabel] = useState<any>(label);

  const onClick = () => {
    setStateLabel(<LoadingComponent fullSize={false} bgColor="none" />);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Image
        className="w-24 m-8 bg-white p-4 h-auto rounded-full "
        src={couponColor}
        alt="Imagem Cupom"
      />
      <h3 className="text-lg font-semibold mb-10">{title}</h3>
      {label && href && href ? (
        <a
          onClick={onClick}
          className=" font-semibold cursor-pointer text-primary-main"
          href={href}
        >
          {stateLabel}
        </a>
      ) : (
        <p className=" font-semibold text-primary-main">{label}</p>
      )}
    </div>
  );
};

export default EmptyCoupons;
