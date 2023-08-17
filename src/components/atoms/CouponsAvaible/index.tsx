import React, { FC } from 'react';
import Image from 'next/image';
import Coupon from '@/images/easytolive/icons/coupon.svg'

interface CouponsProps {
  coupons?: string
}

const CouponsOn: FC<CouponsProps> = ({coupons}) => {
  return (
    <>
      {coupons && (
        <span className=' flex items-center gap-1'>
          <Image
          className='w-6 h-auto'
          src={Coupon}
          alt='Coupon'>
          </Image>
          <p className='text-xs font-medium text-[#6B9618]'>
            {coupons} reservas disponíveis
          </p>
        </span>
      )}
    </>
  )
}

export default CouponsOn;
