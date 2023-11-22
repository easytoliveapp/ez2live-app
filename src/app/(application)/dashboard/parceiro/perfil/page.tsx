"use client";

import CouponList from "@/components/orgs/Coupon/List";
import { useSession } from "next-auth/react";
import React from "react";

const SupplierProfilePage = () => {
  const { data: session } = useSession();

  return session?.user && <CouponList supplierId={session?.user?.id} />;
};

export default SupplierProfilePage;
