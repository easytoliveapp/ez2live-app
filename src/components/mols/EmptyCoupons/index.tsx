"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { LoadingComponent } from "@/components/atoms";
import cx from "classnames";
interface IEmptyCoupons {
  icon: StaticImageData;
  title?: string;
  label?: string | false;
  href?: string | false;
  titleStyle?: string;
}

interface IRedirectLink {
  href: string;
  label: string;
}

const RedirectLink: React.FC<IRedirectLink> = ({ href, label }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <a
      onClick={() => setIsLoading(true)}
      className=" font-semibold cursor-pointer text-sm text-primary-main"
      href={href || ""}
    >
      {isLoading && <LoadingComponent fullSize={false} bgStyle="none" />}
      {label && !isLoading && <span>{label}</span>}
    </a>
  );
};

const EmptyCoupons: React.FC<IEmptyCoupons> = ({
  icon,
  title,
  titleStyle = "text-black text-lg text-generic-grayLighter",
  label,
  href,
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Image
        className="w-24 m-2 bg-white p-4 h-auto rounded-full"
        src={icon}
        alt="Imagem Cupom"
      />
      {title && (
        <span className={cx(titleStyle, "text-center mb-4")}>{title}</span>
      )}
      {label && (
        <>
          {href ? (
            <RedirectLink href={href} label={label} />
          ) : (
            <p className=" font-semibold text-primary-main">{label}</p>
          )}
        </>
      )}
    </div>
  );
};

export default EmptyCoupons;
