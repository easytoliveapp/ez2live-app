import CouponListHoc from '@/hoc/CouponListHoc';
import React from 'react';

export interface ITokenProps {
  params: {
    id: string
  };
};

const SupplierDashBoard = ({ params }: ITokenProps) => {
  return (
    <CouponListHoc id={params.id} />
  )
};

export default SupplierDashBoard;
