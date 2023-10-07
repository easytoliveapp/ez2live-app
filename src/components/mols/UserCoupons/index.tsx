"use client";

import React, { useState } from "react";
import { StaticImageData } from "next/image";
import CouponRed from "@/images/easytolive/icons/couponred.svg";
import CouponGreen from "@/images/easytolive/icons/coupongreen.svg";
import { Modal, CouponActived } from "@/components/mols";
import LogoImage from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";
import CouponCard from "../CouponCard";
import Arrow from "@/images/easytolive/icons/arrow-next-right-primary.svg";

interface UserCouponsProps {
  couponCodeData: {
    code: string;
    status: string;
    activationDate?: string;
    coupon: {
      title: string;
      expirationUseDate: string;
      discount: string;
      maxTotal: string;
      supplier: {
        name: string;
        supplierInfo: {
          supplierCategory: string;
        };
      };
    };
  };
  icon: string | StaticImageData;
}

type PropsByStatus = {
  [key: string]: {
    couponTitle: string;
    activationDate?: string;
    expirationUseDate?: string;
    discount?: string;
    maxUnitsTotal?: string;
    mainImage?: string | StaticImageData;
  };
};

const UserCoupons: React.FC<UserCouponsProps> = ({ couponCodeData }) => {
  const [showCouponModal, setShowCouponModal] = useState(false);
  // const STATUS_COMPONENTS = {
  //   USED: (
  //     <div>
  //       <p className="text-xs pb-2 font-semibold text-black">{couponTitle}</p>
  //       <div className="flex flex-col gap-0.5 text-xs">
  //         <p className="flex font-semibold items-center text-generic-alertGreen">
  //           <Image
  //             className="h-auto pr-2 w-7"
  //             alt="coupon-black"
  //             src={CouponGreen}
  //           />
  //           utilizado em {expirationUseDate}
  //         </p>
  //       </div>
  //       <span></span>
  //     </div>
  //   ),
  //   EXPIRED: (
  //     <div>
  //       <p className="text-xs pb-2 font-semibold text-black">{couponTitle}</p>
  //       <div className="flex flex-col gap-1 text-xs">
  //         <p className="flex font-semibold items-center text-generic-alertRed">
  //           <Image
  //             className="h-auto pr-2 w-7"
  //             alt="coupon-black"
  //             src={CouponRed}
  //           />
  //           expirou em {expirationUseDate}
  //         </p>
  //       </div>
  //       <span></span>
  //     </div>
  //   ),
  //   ACTIVE: (
  //     <div className="flex items-center justify-between gap-4">
  //       <div className="flex flex-col gap-0.5 text-xs">
  //         <p className="text-xs font-semibold text-black">{couponTitle}</p>
  //         <p className="flex font-semibold items-center text-generic-alertGreen">
  //           <Image
  //             className="h-3.5 pr-2 w-auto"
  //             alt="coupon-black"
  //             src={ShoppingCartGreen}
  //             color="white"
  //           />
  //           faltam {maxUnitsTotal} unidades
  //         </p>
  //         <p className="flex font-semibold items-center text-generic-alertRed">
  //           <Image
  //             className="h-3.5 pr-2 w-auto"
  //             alt="coupon-black"
  //             src={ClockCircleRed}
  //           />
  //           termina em {getDateDiffInDays(expirationUseDate)} dias
  //         </p>
  //       </div>
  //       <Image className="h-6 w-auto" alt="arrow right" src={icon} />
  //     </div>
  //   ),
  // };

  const {
    activationDate,
    coupon,
    code: couponActivateCode,
    status,
  } = couponCodeData;

  const {
    title: couponTitle,
    expirationUseDate,
    discount,
    maxTotal: maxUnitsTotal,
    supplier,
  } = coupon;

  const {
    name: supplierName,
    supplierInfo: { supplierCategory },
  } = supplier;

  const propsByStatus: PropsByStatus = {
    USED: {
      couponTitle,
      activationDate,
      mainImage: CouponGreen,
    },
    EXPIRED: {
      couponTitle,
      expirationUseDate,
      mainImage: CouponRed,
    },
    ACTIVE: {
      couponTitle,
      maxUnitsTotal,
      expirationUseDate,
    },
  };

  return (
    <div>
      {showCouponModal && status === "ACTIVE" && (
        <Modal
          show={showCouponModal}
          closeOnBlur={true}
          onCloseModal={() => setShowCouponModal(false)}
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
        </Modal>
      )}

      <CouponCard icon={Arrow} discount={discount} {...propsByStatus[status]} />
    </div>
  );
};

export default UserCoupons;
