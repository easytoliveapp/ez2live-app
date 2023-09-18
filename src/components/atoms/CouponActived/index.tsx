import React from 'react';
import Image from 'next/image'
import CouponPrimary from '@/images/easytolive/icons/couponPrimary.svg'


const CouponActived = () => {
  return (
    <div className='min-h-[75vh] bg-white flex flex-col justify-around'>
      <span></span>
      <div className='flex flex-col items-center '>
        <div
          className='w-40 h-40 flex justify-center items-center rounded-full bg-gradient-to-r from-secondary-dark to-secondary-lighter'
        >
          <Image className='w-24 h-auto' alt='coupon-primary-image' src={CouponPrimary}></Image>
        </div>
        <h1 className=' text-lg font-bold mt-12 mb-3'>Cupom ativo!</h1>
        <p className='text-xs text-neutral-400'>aproveite esse desconto incrível!</p>
      </div>

      <span>
      </span>
    </div>
  )
}

export default CouponActived;