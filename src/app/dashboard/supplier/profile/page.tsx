"use client"

import CouponListPage from '@/components/orgs/CouponListPage';
import { getItemByLocalStorage } from '@/utils/localStorageHelper';
import React from 'react';

const SupplierProfilePage = () => {
  const supplier = getItemByLocalStorage('user');

  return <CouponListPage isSupplierAccount supplierId={supplier.id} />
};

export default SupplierProfilePage;
