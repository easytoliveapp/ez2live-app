import React, { FC } from 'react';
import Image from 'next/image';
import CouponGreen from '@/images/easytolive/icons/coupongreen.svg'
import CouponRed from '@/images/easytolive/icons/couponred.svg'

interface CouponsProps {
  coupons?: number
}

const CouponsAvaible: FC<CouponsProps> = ({ coupons }) => {
  return (
    <span className=' flex items-center gap-1'>
      <Image
        className='w-6 h-auto'
        src={coupons ? CouponGreen : CouponRed}
        alt='Coupon'
      />
      <p className={`text-xs font-medium text ${coupons ? `text-alternative-alertGreen` : `text-alternative-alertRed`}`}>
        {coupons} reservas disponíveis
      </p>
    </span>
  )
}

export default CouponsAvaible;
