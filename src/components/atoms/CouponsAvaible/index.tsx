import React, { FC } from 'react';
import Image from 'next/image';
import CouponGreen from '@/images/easytolive/icons/coupongreen.svg'
import CouponRed from '@/images/easytolive/icons/couponred.svg'

interface CouponsProps {
  coupons?: number
}

const CouponsOn: FC<CouponsProps> = ({coupons}) => {
  return (
        <span className=' flex items-center gap-1'>
          <Image
          className='w-6 h-auto'
          src={coupons? CouponGreen : CouponRed}
          alt='Coupon'>
          </Image>
          <p
          className={`text-xs font-medium text
          ${coupons? `text-secondary-ez2livegreen` : `text-secondary-ez2livered`}`}>
            {coupons} reservas disponíveis
          </p>
        </span>
  )
}

export default CouponsOn;
