"use client";

import CouponListPage from "@/components/orgs/CouponListPage";
import { useSession } from "next-auth/react";
import React from "react";

const SupplierProfilePage = () => {
  const { data: session } = useSession();

  return session?.user && <CouponListPage supplierId={session?.user?.id} />;
};

export default SupplierProfilePage;
