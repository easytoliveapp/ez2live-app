"use client"

import React, { useEffect, useState } from 'react';
import CouponListPage from '@/components/orgs/CouponListPage';
import SupplierService from '@/service/supplier.service';
import { ISupplier } from '@/types/supplier';
import { useToastify } from '@/hooks/useToastify';
import LogoImage from '@/images/easytolive/logo/logotipo-fundoazulroxo.svg'
import { getItemByLocalStorage } from '@/utils/localStorageHelper';
import Arrow from '@/images/easytolive/icons/arrow-next-right-primary.svg'
import Edit from '@/images/easytolive/icons/edit.svg'

const initialValue = {
  active: false,
  address: {
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    zipcode: '',
  },
  document: '',
  numberOfCoupons: 0,
  coupons: [],
  email: '',
  id: '',
  supplierCategory: {
    active: false,
    title: '',
    id: '',
  },
  isSupplier: false,
  isVerified: false,
  name: '',
  role: '',
};

interface tokenId {
  id: string
}

const CouponListHoc: React.FC<tokenId> = ( { id }) => {
  const [supplier, setSupplier] = useState<ISupplier>(initialValue);
  const [isSupplierUserAccount, setIsSupplierUserAccount] = useState(false);

  const getSupplierById = async (id: string) => {
    const res: any = await SupplierService.getSupplierById(id);
    return res;
  };

  useEffect(() => {
    const user = getItemByLocalStorage('user')

    if (user.id === id) setIsSupplierUserAccount(true)

    getSupplierById(id)
      .then((res) => { setSupplier(res?.data?.supplier) })
      .catch((error) => {
        if (error?.response?.data?.code === 400) {
          useToastify({ label: 'Oops! Parece que você acessou um endereço de estabelcimento errado', type: 'error' })
        }
      });
  }, []);

  return (
    <CouponListPage icon={isSupplierUserAccount ? Edit : Arrow} logo={LogoImage} supplier={supplier} />
  );
}

export default CouponListHoc;
