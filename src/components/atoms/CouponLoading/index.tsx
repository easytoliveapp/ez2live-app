"use client";

import React from "react";
import Image from "next/image";
import CouponYellow from "@/images/easytolive/icons/couponyellow.svg";
import CouponPrimary from "@/images/easytolive/icons/couponPrimary.svg";
import cx from "classnames";
import { motion } from "framer-motion";

interface CouponGeneratingProps {
  title: string;
  subTitle?: string;
  couponColor: "primary" | "secondary";
  couponAnimation?: boolean;
  backGround: "primary" | "secondary";
  containerClassnames?: string;
}

const CouponGenerating: React.FC<CouponGeneratingProps> = ({
  title,
  subTitle,
  couponColor,
  couponAnimation = false,
  backGround,
  containerClassnames = "bg-white",
}) => {
  return (
    <div
      className={cx(
        containerClassnames,
        "min-h-[75vh] flex flex-col justify-around",
      )}
    >
      <span></span>
      <div className="flex flex-col items-center ">
        <div className="relative rounded-full overflow-hidden w-40 h-40">
          {couponAnimation ? (
            <>
              <motion.div
                className={`w-40 h-40 rounded-full bg-gradient-to-r ${
                  backGround === "primary"
                    ? "from-primary-main to-primary-white"
                    : "from-secondary-dark to-secondary-lighter"
                } `}
                animate={{
                  rotate: 360,
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              ></motion.div>
              <motion.div
                className="absolute flex items-center -left-24 top-8 opacity-100"
                animate={{
                  translateX: 240,
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Image
                  className="w-24 opacity-100 h-auto"
                  alt="coupon-image"
                  src={couponColor === "primary" ? CouponPrimary : CouponYellow}
                ></Image>
              </motion.div>
            </>
          ) : (
            <div
              className={`w-40 h-40 flex items-center justify-center rounded-full bg-gradient-to-r ${
                backGround === "primary"
                  ? "from-primary-main to-primary-white"
                  : "from-secondary-dark to-secondary-lighter"
              } `}
            >
              <Image
                className="w-24 opacity-100 h-auto"
                alt="coupon-image"
                src={couponColor === "primary" ? CouponPrimary : CouponYellow}
              ></Image>
            </div>
          )}
        </div>
        <h1 className=" text-lg font-bold mt-10 mb-3">{title}</h1>
        <p className="text-xs text-neutral-400">{subTitle}</p>
      </div>
      <span></span>
    </div>
  );
};

export default CouponGenerating;
