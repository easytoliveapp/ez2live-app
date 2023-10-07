"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import CouponPrimary from "@/images/easytolive/icons/couponPrimary.svg";
import CouponRed from "@/images/easytolive/icons/couponred.svg";
import CouponGreen from "@/images/easytolive/icons/coupongreen.svg";
import ShoppingCartGreen from "@/images/easytolive/icons/shopping_cart_green.svg";
import ClockCircleRed from "@/images/easytolive/icons/clock_circleRed.svg";
import classNames from "@/utils/classNames";
import { ModalEdit, CouponActived } from "@/components/mols";
import LogoImage from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";
import { getDateDiffInDays } from "../../atoms/index";

interface UserCouponsProps {
  couponTitle: string;
  discount: string;
  unintsAmount: number;
  icon: string | StaticImageData;
  status?: "ACTIVE" | "USED" | "EXPIRED";
  expirationUseDate: string;
  couponActivateCode: string;
  supplierCategory: string;
  supplierName: string;
}

const UserCoupons: React.FC<UserCouponsProps> = ({
  couponTitle,
  discount,
  unintsAmount,
  icon,
  expirationUseDate,
  status = "ACTIVE",
  couponActivateCode,
  supplierCategory,
  supplierName,
}) => {
  const [showCouponModal, setShowCouponModal] = useState(false);
  const STATUS_COMPONENTS = {
    USED: (
      <div>
        <p className="text-xs pb-2 font-semibold text-black">{couponTitle}</p>
        <div className="flex flex-col gap-0.5 text-xs">
          <p className="flex font-semibold items-center text-generic-alertGreen">
            <Image
              className="h-auto pr-2 w-7"
              alt="coupon-black"
              src={CouponGreen}
            />
            utilizado em {expirationUseDate}
          </p>
        </div>
        <span></span>
      </div>
    ),
    EXPIRED: (
      <div>
        <p className="text-xs pb-2 font-semibold text-black">{couponTitle}</p>
        <div className="flex flex-col gap-1 text-xs">
          <p className="flex font-semibold items-center text-generic-alertRed">
            <Image
              className="h-auto pr-2 w-7"
              alt="coupon-black"
              src={CouponRed}
            />
            expirou em {expirationUseDate}
          </p>
        </div>
        <span></span>
      </div>
    ),
    ACTIVE: (
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5 text-xs">
          <p className="text-xs font-semibold text-black">{couponTitle}</p>
          <p className="flex font-semibold items-center text-generic-alertGreen">
            <Image
              className="h-3.5 pr-2 w-auto"
              alt="coupon-black"
              src={ShoppingCartGreen}
              color="white"
            />
            faltam {unintsAmount} unidades
          </p>
          <p className="flex font-semibold items-center text-generic-alertRed">
            <Image
              className="h-3.5 pr-2 w-auto"
              alt="coupon-black"
              src={ClockCircleRed}
            />
            termina em {getDateDiffInDays(expirationUseDate)} dias
          </p>
        </div>
        <Image className="h-6 w-auto" alt="arrow right" src={icon} />
      </div>
    ),
  };

  return (
    <div>
      {showCouponModal && status === "ACTIVE" && (
        <ModalEdit
          show={showCouponModal}
          closeOnBlur={true}
          onCloseModalEdit={() => setShowCouponModal(false)}
        >
          <CouponActived
            couponActivateCode={couponActivateCode}
            couponDiscount={discount}
            couponTitle={couponTitle}
            expirateTime={expirationUseDate}
            supplierCategory={supplierCategory}
            supplierLogo={LogoImage}
            supplierName={supplierName}
          />
        </ModalEdit>
      )}
      <div
        onClick={() => setShowCouponModal(true)}
        className={`${
          status === "USED"
            ? "bg-secondary-main"
            : status === "EXPIRED"
            ? "bg-generic-alertRed"
            : "bg-primary-main"
        } h-auto pl-5 rounded-full flex items-center gap-2 cursor-pointer`}
      >
        <h2
          className={`font-semibold text-xl ${
            status === "USED" ? "text-primary-main" : "text-white"
          }`}
        >
          {discount}%
        </h2>
        <div
          className={classNames(
            "rounded-full bg-white w-full py-3 gap-2 -m-[1px] hover:shadow-md",
          )}
        >
          <div className="Rounded-full flex items-center gap-6 pr-3 pl-6 w-full">
            <Image
              className="h-10 w-auto"
              alt="Coupons Image"
              src={status === "EXPIRED" ? CouponRed : CouponPrimary}
            />
            <span className="bg-gray-300 w-[1px] h-14"></span>
            <div className="flex-auto">
              {STATUS_COMPONENTS[status] && STATUS_COMPONENTS[status]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCoupons;
