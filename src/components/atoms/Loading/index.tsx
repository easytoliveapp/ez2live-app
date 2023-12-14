"use client";

import { motion } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";
import cx from "classnames";

interface ILoadingComponent {
  fullSize?: boolean;
  bgColor?: "main" | "secondary" | "none";
  Icon?: StaticImport;
}

const LoadingComponent: React.FC<ILoadingComponent> = ({
  fullSize = true,
  bgColor = "main",
  Icon,
}) => {
  const backGroundColor = () => {
    switch (bgColor) {
      case "main":
        return "bg-primary-main";
      case "secondary":
        return "bg-secondary-main";
      case "none":
        return "bg-none";
      default:
        return "main";
    }
  };
  const fullSizeLoadingComponent = () => {
    switch (fullSize) {
      case true:
        return "min-h-[93vh]";
      case false:
        return "";
    }
  };

  return (
    <div
      className={cx(
        backGroundColor(),
        fullSizeLoadingComponent(),
        "flex flex-col items-center justify-around",
      )}
    >
      <span></span>
      <div className="relative">
        <motion.div
          className={cx(
            fullSize ? "w-40 h-40" : "w-12 h-12",
            "relative border-opacity-60 border-collapse pb-primary-main  rounded-full border-b-primary-main border-4 border-neutral-200 opacity-50 ",
          )}
          animate={{
            rotate: 360,
          }}
          transition={{ duration: 1, repeat: Infinity }}
        ></motion.div>
        {Icon && (
          <Image
            className="w-24 rounded-full h-auto absolute left-8 top-8"
            src={Icon}
            alt="logo-branca"
          />
        )}
      </div>
      <span></span>
    </div>
  );
};

export default LoadingComponent;
