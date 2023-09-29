"use client";

import React from "react";
import { CouponLoading } from "@/components/atoms/index";
const CouponLoadingPage = () => {
  return (
    <div>
      <CouponLoading
        backGround="secondary"
        couponColor="primary"
        couponAnimation={true}
        title="Gerando cupom de desconto..."
        subTitle="esse processo pode levar alguns segundos!"
      />
    </div>
  );
};

export default CouponLoadingPage;
