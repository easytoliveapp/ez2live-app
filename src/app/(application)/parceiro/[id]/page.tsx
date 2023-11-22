import React from "react";
import CouponList from "@/components/orgs/Coupon/List";

export interface ITokenProps {
  params: {
    id: string;
  };
}

const SupplierDashBoard = ({ params: { id } }: ITokenProps) => (
  <CouponList supplierId={id} />
);

export default SupplierDashBoard;
