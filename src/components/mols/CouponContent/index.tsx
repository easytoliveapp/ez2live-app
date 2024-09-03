import React from "react";
import Image, { StaticImageData } from "next/image";
import CouponGreen from "@/images/easytolive/icons/coupongreen.svg";
import ClockCircleRed from "@/images/easytolive/icons/clock_circleRed.svg";
import { AccordionInfo } from "@/components";
import { getDateFormater } from "@/utils/getDateFormater";
import { getColorByDiscountValue } from "@/utils/getColorByDiscountValue";
import getExpirateTime from "@/utils/getExpirateTime";
import cx from "classnames";
import { getCouponsRemaining } from "@/utils/getCouponsRemaining";
import {
  InformationCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";

interface CouponProps {
  isOwnSupplier: boolean;
  id: string;
  couponTitle: string;
  remainingUnits?: number;
  expirateTime: string;
  supplierLogo: string | StaticImageData;
  supplierName: string;
  couponDiscount: string;
  supplierCategory: string;
  couponRules: string;
}

const CouponContent: React.FC<CouponProps> = ({
  isOwnSupplier,
  remainingUnits,
  couponDiscount,
  expirateTime,
  supplierLogo,
  supplierName,
  couponTitle,
  couponRules,
}) => {
  return (
    <div className="flex flex-col w-full text-black">
      <h1 className=" text-2xl font-bold text-black">{couponTitle}</h1>
      <div className="flex mb-4 gap-2 justify-between items-center">
        <div className="flex flex-col text-sm">
          <p className="flex text-lg items-center text-black">
            <ShoppingCartIcon className="w-5 mr-2" />
            {remainingUnits &&
              getCouponsRemaining(remainingUnits, isOwnSupplier)}
          </p>
          <p className="flex text-lg items-center text-[#a6a6a6]">
            <InformationCircleIcon className="w-5 mr-2" />
            {getExpirateTime(expirateTime)}
          </p>
        </div>
        <span
          className={
            "relative text-4xl font-semibold w-32 h-32 text-[#B0CB04] border-4 border-[#B0CB04] flex items-center justify-center px-6 rounded-xl"
          }
        >
          {couponDiscount}%
        </span>
      </div>
      <div className="flex flex-col m-1 h-auto">
        <div className="flex gap-3 item-center mb-3">
          <div className="my-auto font-semibold">
            <p className=" text-lg">
              A {supplierName} te convida com {couponDiscount}% off até o dia{" "}
              {getDateFormater(expirateTime)}.
            </p>
          </div>
        </div>
        {couponRules && (
          <AccordionInfo
            data={[
              {
                name: "Regras de uso",
                content: `${couponRules}`,
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default CouponContent;
