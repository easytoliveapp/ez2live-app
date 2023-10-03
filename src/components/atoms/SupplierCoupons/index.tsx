import React from "react";
import Image, { StaticImageData } from "next/image";
import CouponPrimary from "@/images/easytolive/icons/couponPrimary.svg";
import CouponRed from "@/images/easytolive/icons/couponred.svg";
import CouponGreen from "@/images/easytolive/icons/coupongreen.svg";
import ShoppingCartGreen from "@/images/easytolive/icons/shopping_cart_green.svg";
import ClockCircleRed from "@/images/easytolive/icons/clock_circleRed.svg";
import classNames from "@/utils/classNames";

interface SupplierCouponsProps {
  title: string;
  discount: string;
  unintsAmount: number | string;
  expirateTime: number | string;
  icon: string | StaticImageData;
  status?: "active" | "used" | "expired" | string;
  usageDate?: string;
}

const SupplierCoupons: React.FC<SupplierCouponsProps> = ({
  title,
  discount,
  unintsAmount,
  expirateTime,
  icon,
  usageDate,
  status = "active",
}) => {
  return (
    <div
      className={`${
        status == "used"
          ? "bg-secondary-main"
          : status == "expired"
          ? "bg-generic-alertRed"
          : "bg-primary-main"
      } h-auto pl-5 rounded-full flex items-center gap-2 cursor-pointer`}
    >
      <h2
        className={`font-semibold text-xl ${
          status == "used" ? "text-primary-main" : "text-white"
        }`}
      >
        {discount}%
      </h2>

      <div
        className={classNames(
          "rounded-full bg-white w-full py-3 gap-2 -m-[1px] hover:shadow-md",
        )}
      >
        <div className="Rounded-full flex items-center justify-evenly w-full">
          <Image
            className="h-10 w-auto"
            alt="Coupons Image"
            src={status == "expired" ? CouponRed : CouponPrimary}
          />
          <span className="bg-gray-300 w-0.5 h-12"></span>
          <div>
            <p className="text-xs pb-2 font-semibold text-black">{title}</p>
            {status == "active" && (
              <div className="flex flex-col gap-1.5 text-xs">
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
                  termina em {expirateTime}
                </p>
              </div>
            )}
            {status == "used" && (
              <div className="flex flex-col gap-1.5 text-xs">
                <p className="flex font-semibold items-center text-generic-alertGreen">
                  <Image
                    className="h-auto pr-2 w-7"
                    alt="coupon-black"
                    src={CouponGreen}
                  />
                  utilizado em {usageDate}
                </p>
              </div>
            )}
            {status == "expired" && (
              <div className="flex flex-col gap-1.5 text-xs">
                <p className="flex font-semibold items-center text-generic-alertRed">
                  <Image
                    className="h-auto pr-2 w-7"
                    alt="coupon-black"
                    src={CouponRed}
                  />
                  expirou em {expirateTime}
                </p>
              </div>
            )}
          </div>
          {status == "active" ? (
            <div>
              <Image className="h-6 w-auto" alt="arrow right" src={icon} />
            </div>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierCoupons;
