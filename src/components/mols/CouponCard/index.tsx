"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import classNames from "classnames";

import CouponPrimary from "@/images/easytolive/icons/couponPrimary.svg";
import CouponGreen from "@/images/easytolive/icons/coupongreen.svg";
import ShoppingCartGreen from "@/images/easytolive/icons/shopping_cart_green.svg";
import ClockCircleRed from "@/images/easytolive/icons/clock_circleRed.svg";
import getExpirateTime from "@/utils/getExpirateTime";
import { getColorByDiscountValue } from "@/utils/getColorByDiscountValue";

import cx from "classnames";
import { getDateFormater } from "@/utils/getDateFormater";

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
      className={cx(
        getColorByDiscountValue(discount),

        "h-auto pl-5 rounded-full flex items-center gap-2 cursor-pointer",
      )}
    >
      <h2 className={`text-white font-semibold text-xl drop-shadow-sm`}>
        {discount}%
      </h2>
      <div
        className={classNames(
          "rounded-full bg-white w-full py-2.5 gap-1 -m-[1px] bg-primary hover:shadow-md",
        )}
      >
        <div className="rounded-full flex items-center gap-3 pr-4 pl-3 w-full">
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
                    {maxUnitsTotal === -1
                      ? "quantidade ilimitada"
                      : `faltam ${
                          maxUnitsTotal > 20 ? "poucas" : maxUnitsTotal
                        } unidades`}
                  </p>
                )}
                {activationDate && (
                  <p className="flex font-semibold items-center text-generic-alertGreen">
                    <Image
                      className="h-auto pr-2 w-7"
                      alt="coupon-black"
                      src={CouponGreen}
                    />
                    utilizado em {getDateFormater(activationDate)}
                  </p>
                )}
                {expirationUseDate && (
                  <p className="flex font-semibold items-center text-generic-alertRed">
                    <Image
                      className="h-3.5 pr-2 w-auto"
                      alt="coupon-black"
                      src={ClockCircleRed}
                    />
                    {getExpirateTime(expirationUseDate)}
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
