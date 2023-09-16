import React from "react";

import CouponListPage from "@/components/orgs/CouponListPage";

export interface ITokenProps {
  params: {
    id: string;
  };
}

const SupplierDashBoard = ({ params: { id } }: ITokenProps) => (
  <CouponListPage supplierId={id} />
);

export default SupplierDashBoard;
