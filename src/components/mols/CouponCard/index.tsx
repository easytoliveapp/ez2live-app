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
import date from "@/utils/date";
import { getCouponsRemaining } from "@/utils/getCouponsRemaining";

interface ICouponCardProps {
  isOwnSupplier?: boolean;
  discount: string;
  couponTitle: string;
  remainingUnits?: number;
  activationDate?: string;
  expirationUseDate?: string;
  mainImage?: string | StaticImageData;
  icon: string | StaticImageData;
  setShowCouponModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CouponCard: React.FC<ICouponCardProps> = ({
  isOwnSupplier,
  discount,
  couponTitle,
  remainingUnits,
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
      <h2 className="text-white font-semibold text-md sm:text-xl drop-shadow-sm">
        {discount}%
      </h2>
      <div
        className={classNames(
          "rounded-full bg-white w-full py-2.5 gap-1 -m-[1px] bg-primary hover:shadow-md",
        )}
      >
        <div className="rounded-full flex items-center gap-3 pr-4 pl-3 w-full">
          <Image
            className="h-6 w-auto"
            alt="Coupons Image"
            src={mainImage ?? CouponPrimary}
          />
          <span className="bg-gray-300 w-[1px] h-14"></span>
          <div className="flex-auto">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col sm:gap-0.5 text-[10px] sm:text-xs">
                <p className="text-xs font-semibold text-black">
                  {couponTitle}
                </p>
                {remainingUnits !== undefined && !isNaN(remainingUnits) && (
                  <p className="flex font-semibold items-center text-generic-alertGreen">
                    <Image
                      className="h-3.5 pr-2 w-auto"
                      alt="coupon-black"
                      src={ShoppingCartGreen}
                      color="white"
                    />
                    {getCouponsRemaining(remainingUnits, isOwnSupplier)}
                  </p>
                )}
                {activationDate && (
                  <p className="flex font-semibold items-center text-generic-alertGreen">
                    <Image
                      className="h-auto pr-2 w-7"
                      alt="coupon-black"
                      src={CouponGreen}
                    />
                    utilizado em {date.getDateFormater(activationDate)}
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
