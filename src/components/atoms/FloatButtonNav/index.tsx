import { StaticImageData } from "next/image";
import React from "react";
import Image from "next/image";
import NextLink, { LinkProps } from "next/link";
import { UrlObject } from "url";

interface IFloatButtonNavProps {
  icon: StaticImageData;
  backGround: "main" | "secondary";
  href: UrlObject | string;
}

const FloatButtonNav: React.FC<IFloatButtonNavProps & LinkProps<any>> = ({
  href,
  backGround,
  icon,
}) => {
  return (
    <NextLink
      href={href}
      className={`${
        backGround == "main"
          ? "from-primary-main to-white"
          : "from-secondary-dark to-secondary-lighter"
      } bg-gradient-to-t rounded-l-full w-24 fixed bottom-28 right-0 z-50 min-h-8 p-3`}
    >
      <Image className="w-8 h-auto" alt="icon-image" src={icon}></Image>
    </NextLink>
  );
};

export default FloatButtonNav;
