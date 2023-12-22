"use client";

import { StaticImageData } from "next/image";
import React, { useState } from "react";
import Image from "next/image";
import NextLink, { LinkProps } from "next/link";
import { UrlObject } from "url";
import { motion } from "framer-motion";
import LoadingComponent from "../Loading";

interface IFloatButtonNavProps {
  icon: StaticImageData;
  backgroundStyle: "main" | "secondary";
  label?: string;
  href: UrlObject | string;
  hasCouponActive?: boolean;
}

const FloatButtonNav: React.FC<IFloatButtonNavProps & LinkProps<any>> = ({
  href,
  label,
  backgroundStyle,
  icon,
  hasCouponActive = false,
}) => {
  const [isloading, setIsLoading] = useState(false);

  return (
    <NextLink
      onClick={() => setIsLoading(true)}
      href={href}
      className={`${
        backgroundStyle === "main"
          ? "from-primary-main to-primary-lighter"
          : "from-secondary-main to-secondary-lighter"
      } ${
        hasCouponActive ? "pr-4" : "pr-8"
      } flex items-center bg-gradient-to-r rounded-l-full pl-4 py-4 fixed bottom-28 right-0 z-50 min-h-8 p-3`}
    >
      <Image className="w-auto h-9" alt="icon-image" src={icon}></Image>
      {hasCouponActive && (
        <div className="w-9 h-9 rouded-full flex items-center relative">
          <motion.div
            className="flex items-center justify-center ml-2 w-5 h-5 rounded-full bg-generic-alertGreenLigther"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 20, 40, 20, 0, 0] }}
            transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
          >
            <div className="flex items-center justify-center w-3 h-3 rounded-full bg-generic-alertGreenLight"></div>
          </motion.div>
          <div className="absolute right-[15px] w-1.5 h-1.5 rounded-full bg-generic-alertGreen"></div>
        </div>
      )}
      <div
        className={`ml-3 ${
          backgroundStyle === "main"
            ? "text-secondary-main"
            : "text-primary-main"
        }`}
      >
        {isloading ? (
          <LoadingComponent bgStyle="none" fullSize={false} />
        ) : (
          <span className="md:[display:block] hidden">{label}</span>
        )}
      </div>
    </NextLink>
  );
};

export default FloatButtonNav;
