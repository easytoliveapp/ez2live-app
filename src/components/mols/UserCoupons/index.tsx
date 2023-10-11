"use client";

import React, { useState } from "react";
import { StaticImageData } from "next/image";
import CouponRed from "@/images/easytolive/icons/couponred.svg";
import CouponGreen from "@/images/easytolive/icons/coupongreen.svg";
import { Modal, CouponActived } from "@/components/mols";
import LogoImage from "@/images/easytolive/logo/logotipo-fundoazulroxo.svg";
import CouponCard from "../CouponCard";
import Arrow from "@/images/easytolive/icons/arrow-next-right-primary.svg";
import { ICouponCodesByUser } from "@/types/coupons";

interface UserCouponsProps {
  couponCodeData: ICouponCodesByUser;
  icon: string | StaticImageData;
}

type PropsByStatus = {
  [key: string]: {
    couponTitle: string;
    activationDate?: string;
    expirationUseDate?: string;
    discount?: string;
    maxUnitsTotal?: number;
    mainImage?: string | StaticImageData;
  };
};

const UserCoupons: React.FC<UserCouponsProps> = ({ couponCodeData }) => {
  const [showCouponModal, setShowCouponModal] = useState(false);

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
            supplierCategory={supplierCategory.title}
            supplierLogo={LogoImage}
            supplierName={supplierName}
          />
        </Modal>
      )}

      <CouponCard
        icon={Arrow}
        discount={discount}
        setShowCouponModal={setShowCouponModal}
        {...propsByStatus[status]}
      />
    </div>
  );
};

export default UserCoupons;
