"use client";

import CouponListPage from "@/components/orgs/CouponListPage";
import { ISupplierLoginResponseProps } from "@/types/supplier";
import { getItemByLocalStorage } from "@/utils/localStorageHelper";
import React, { useEffect, useState } from "react";

const SupplierProfilePage = () => {
  const [supplier, setSupplier] = useState<ISupplierLoginResponseProps>();

  useEffect(() => {
    const supplier = getItemByLocalStorage("user");
    setSupplier(supplier);
  }, []);

  return supplier && <CouponListPage supplierId={supplier.id} />;
};

export default SupplierProfilePage;
