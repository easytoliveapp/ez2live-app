import React from 'react';
import Image from 'next/image';
import CouponRed from '@/images/easytolive/icons/couponred.svg'
import CouponGreen from '@/images/easytolive/icons/coupongreen.svg'
import CouponsYellow from '@/images/easytolive/icons/couponyellow.svg'
import CouponBlack from '@/images/easytolive/icons/couponblack.svg'
import ShoppingCart from '@/images/easytolive/icons/shopping_cart.svg'
import ClockCircle from '@/images/easytolive/icons/clock_circle.svg'
import ArrowRight from '@/images/easytolive/icons/arrow-next-right.svg'


interface SupplierCouponsProps {
  discount: string;
  unintsAmount: number;
  expirateTime: number;
  products: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void

}

const SupplierCoupons : React.FC<SupplierCouponsProps> = ({
  discount,
  unintsAmount,
  expirateTime,
  products,
  onClick,
})=> {
  return (
    <div className='bg-white h-auto pl-4 rounded-full flex items-center gap-3'>
      <Image
      className='h-10 w-auto'
      alt='Coupons Image'
      src={parseInt(discount) >= 30 ? CouponGreen: (parseInt(discount) >= 20)? CouponsYellow: CouponRed}/>
      <div
    className={`rounded-full w-full py-2 px-2 gap-4 border-2
    ${parseInt(discount) >= 30 ? 'border-secondary-ez2livegreen':
    (parseInt(discount) >= 20)? 'border-secondary-ez2liveyellow' : 'border-secondary-ez2livered' }`}>
        <div className='Rounded-full flex items-center justify-evenly w-full'>
          <h2 className=' font-bold text-xl'>
          {discount}%
          </h2>
          <span className='bg-gray-300 w-0.5 h-12'></span>
        <div className='flex flex-col gap-1.5 text-xs' >
          <p className='flex items-center'>
            <Image
            className='h-3.5 pr-2 w-auto'
            alt='coupon-black'
            src={CouponBlack}
            />
            faltam {unintsAmount} unidades</p>
          <p className='flex items-center'>
          <Image
            className='h-3.5 pr-2 w-auto'
            alt='coupon-black'
            src={ClockCircle}
            />
            termina em {expirateTime} dias</p>
          <p className='flex items-center'>
          <Image
            className='h-3.5 pr-2 w-auto'
            alt='coupon-black'
            src={ShoppingCart}
            />
            {products}</p>
        </div>
       <div onClick={onClick}>
        <Image
        className='h-6 w-auto'
        alt='arrow right'
        src={ArrowRight}/>
       </div>
      </div>
    </div>
    </div>
    
  )
}

export default SupplierCoupons;
