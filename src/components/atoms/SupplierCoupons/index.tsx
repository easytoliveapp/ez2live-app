"use client"

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import CouponPrimary from '@/images/easytolive/icons/couponPrimary.svg'
import ShoppingCartGreen from '@/images/easytolive/icons/shopping_cart_green.svg'
import ClockCircleRed from '@/images/easytolive/icons/clock_circleRed.svg'
import ArrowRight from '@/images/easytolive/icons/arrow-next-right-primary.svg'
import classNames from '@/utils/classNames';
import { Coupon } from '@/components/orgs/index';
import { ModalEdit } from '@/components/mols/index';
import { ButtonPrimary, ButtonThird } from '@/components/atoms/index'

interface SupplierCouponsProps {
  discount: string;
  unintsAmount: number;
  expirateTime: number;
  id: string;
  supplierLogo: string | StaticImageData
  supplierCategory: string
  supplierName: string
}

const SupplierCoupons: React.FC<SupplierCouponsProps> = ({
  discount,
  unintsAmount,
  supplierLogo,
  expirateTime,
  supplierCategory,
  id,
  supplierName

}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='bg-primary-ez2live h-auto pl-4 max-h-14 rounded-full flex items-center gap-3'>
      <ModalEdit
        show={showModal}
        onCloseModalEdit={() => setShowModal(false)}
      >
        <div className='flex flex-col h-auto items-center'>
          <Coupon id={id} couponDiscount={discount} expirateTime={5} unintsAmount={10} supplierCategory={supplierCategory} supplierLogo={supplierLogo} supplierName={supplierName} />
          <ButtonPrimary className='w-full mx-4 max-w-md' >Eu quero!</ButtonPrimary>
          <ButtonThird
            className='w-full mx-4 max-w-md'
            onClick={() => setShowModal(false)}>não quero mais</ButtonThird>
        </div>
      </ModalEdit>

      <h2 className=' fon t-bold text-white text-xl'>
        {discount}%
      </h2>

      <div
        className={
          classNames(
            'rounded-full bg-white w-full py-3 gap-4 -m-[1px] hover:shadow-md cursor-pointer',
          )
        }
        onClick={() => setShowModal(true)}
      >
        <div className='Rounded-full flex items-center justify-evenly w-full'>
          <Image
            className='h-10 w-auto'
            alt='Coupons Image'
            src={CouponPrimary}
          />

          <span className='bg-gray-300 w-0.5 h-12'></span>
          <div className='flex flex-col gap-1.5 text-xs' >
            <p className='flex font-semibold items-center text-secondary-ez2livegreen'>
              <Image
                className='h-3.5 pr-2 w-auto'
                alt='coupon-black'
                src={ShoppingCartGreen}
                color='white'
              />
              faltam {unintsAmount} unidades</p>
            <p className='flex font-semibold items-center text-secondary-ez2livered'>
              <Image
                className='h-3.5 pr-2 w-auto'
                alt='coupon-black'
                src={ClockCircleRed}
              />
              termina em {expirateTime} dias
            </p>
          </div>
          <div onClick={() => setShowModal(true)}>
            <Image
              className='h-6 w-auto'
              alt='arrow right'
              src={ArrowRight}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierCoupons;
