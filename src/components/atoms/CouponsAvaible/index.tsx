import React, { FC } from "react";
import Image from "next/image";
import CouponGreen from "@/images/easytolive/icons/coupongreen.svg";
import classNames from "@/utils/classNames";

interface CouponsProps {
  couponsAvailableCount?: number;
}

const CouponsAvaible: FC<CouponsProps> = ({ couponsAvailableCount }) => {
  return (
    <span className=" flex items-center gap-1">
      <Image
        className={classNames(
          "w-6 h-auto",
          couponsAvailableCount ? "d-block" : "hidden",
        )}
        src={CouponGreen}
        alt="Coupon"
      />
      <p
        className={classNames(
          "text-xs font-medium text text-generic-alertGreen",
          couponsAvailableCount
            ? "text-generic-alertGreen"
            : "text-generic-grayDarker",
        )}
      >
        {couponsAvailableCount ? (
          <>{couponsAvailableCount} reservas disponíveis</>
        ) : (
          <>Nenhuma reserva disponível</>
        )}
      </p>
    </span>
  );
};

export default CouponsAvaible;
