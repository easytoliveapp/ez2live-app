"use client";

import { StaticImageData } from "next/image";
import React, { useState } from "react";
import Image from "next/image";
import NextLink, { LinkProps } from "next/link";
import { UrlObject } from "url";
import { motion } from "framer-motion";
import LoadingComponent from "../Loading";
import cx from "classnames";

interface IFloatButtonNavProps {
  icon: StaticImageData;
  backgroundStyle: "main" | "secondary";
  label?: string;
  href: UrlObject | string;
  hasCouponActive?: boolean;
  position?: 1 | 2 | 3;
}

const FloatButtonNav: React.FC<IFloatButtonNavProps & LinkProps<any>> = ({
  href,
  label,
  backgroundStyle,
  icon,
  hasCouponActive = false,
  position = 1,
}) => {
  const [isloading, setIsLoading] = useState(false);

  const bottomPosition = {
    1: "bottom-[100px]",
    2: "bottom-[180px]",
    3: "bottom-[260px]",
  };

  return (
    <NextLink
      onClick={() => setIsLoading(true)}
      href={href}
      className={cx(
        backgroundStyle === "main"
          ? "from-primary-main to-primary-lighter"
          : "from-secondary-main to-secondary-lighter",
        `${bottomPosition[position]}`,
        "flex items-center bg-gradient-to-r rounded-l-full pl-4 py-4 pr-5 fixed right-0 z-50 min-h-8",
      )}
    >
      {isloading ? (
        <LoadingComponent bgStyle="none" fullSize={false} size="small" />
      ) : (
        <Image className="w-auto h-7" alt="icon-image" src={icon}></Image>
      )}
      {hasCouponActive ? (
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
      ) : (
        <div className="w-9 h-9"></div>
      )}
      <div
        className={cx(
          backgroundStyle === "main"
            ? "text-secondary-main"
            : "text-primary-main",
        )}
      >
        <span className="md:[display:block] hidden">{label}</span>
      </div>
    </NextLink>
  );
};

export default FloatButtonNav;
