"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import classNames from "classnames";

import CouponPrimary from "@/images/easytolive/icons/couponPrimary.svg";
import CouponGreen from "@/images/easytolive/icons/coupongreen.svg";
import ShoppingCartGreen from "@/images/easytolive/icons/shopping_cart_green.svg";
import ClockCircleRed from "@/images/easytolive/icons/clock_circleRed.svg";
import getDateDiffInDays from "@/utils/getDiffInDays";

interface ICouponCardProps {
  discount: string;
  couponTitle: string;
  maxUnitsTotal?: number;
  activationDate?: string;
  expirationUseDate?: string;
  mainImage?: string | StaticImageData;
  icon: string | StaticImageData;
  setShowCouponModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CouponCard: React.FC<ICouponCardProps> = ({
  discount,
  couponTitle,
  maxUnitsTotal,
  activationDate,
  expirationUseDate,
  mainImage,
  icon,
  setShowCouponModal,
}) => {
  return (
    <div
      onClick={() => setShowCouponModal && setShowCouponModal(true)}
      className={`bg-primary-main h-auto pl-5 rounded-full flex items-center gap-2 cursor-pointer`}
    >
      <h2 className={`text-white font-semibold text-xl`}>{discount}%</h2>
      <div
        className={classNames(
          "rounded-full bg-white w-full py-3 gap-2 -m-[1px] hover:shadow-md",
        )}
      >
        <div className="rounded-full flex items-center gap-6 pr-3 pl-6 w-full">
          <Image
            className="h-10 w-auto"
            alt="Coupons Image"
            src={mainImage ?? CouponPrimary}
          />
          <span className="bg-gray-300 w-[1px] h-14"></span>
          <div className="flex-auto">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5 text-xs">
                <p className="text-xs font-semibold text-black">
                  {couponTitle}
                </p>
                {maxUnitsTotal && (
                  <p className="flex font-semibold items-center text-generic-alertGreen">
                    <Image
                      className="h-3.5 pr-2 w-auto"
                      alt="coupon-black"
                      src={ShoppingCartGreen}
                      color="white"
                    />
                    faltam {maxUnitsTotal} unidades
                  </p>
                )}
                {activationDate && (
                  <p className="flex font-semibold items-center text-generic-alertGreen">
                    <Image
                      className="h-auto pr-2 w-7"
                      alt="coupon-black"
                      src={CouponGreen}
                    />
                    utilizado em {activationDate}
                  </p>
                )}
                {expirationUseDate && (
                  <p className="flex font-semibold items-center text-generic-alertRed">
                    <Image
                      className="h-3.5 pr-2 w-auto"
                      alt="coupon-black"
                      src={ClockCircleRed}
                    />
                    termina em {getDateDiffInDays(expirationUseDate)} dias
                  </p>
                )}
              </div>
              <Image className="h-6 w-auto" alt="arrow right" src={icon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
