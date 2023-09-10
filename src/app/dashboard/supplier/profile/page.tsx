"use client"

import CouponListHoc from '@/hoc/CouponListHoc';
import { getItemByLocalStorage } from '@/utils/localStorageHelper';
import React, { useEffect, useState } from 'react';

const SupplierProfilePage = () => {
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const user = getItemByLocalStorage('user')
    setUserId(user.id)
  }
    , [])

  return (
    <div>
      {userId && <CouponListHoc id={userId} />}
    </div>

  )
};

export default SupplierProfilePage;
