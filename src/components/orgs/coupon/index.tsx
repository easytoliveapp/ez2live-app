import React from 'react';
import Image, { StaticImageData } from 'next/image'
import CouponGreen from '@/images/easytolive/icons/coupongreen.svg'
import ClockCircleRed from '@/images/easytolive/icons/clock_circleRed.svg'
import { AccordionInfo } from '@/components/atoms';

interface CouponProps {
  id: string
  unintsAmount: number
  expirateTime: number
  supplierLogo: string | StaticImageData
  supplierName: string
  couponDiscount: string
  supplierCategory: string
};

const CouponPage: React.FC<CouponProps> = ({
  unintsAmount,
  couponDiscount,
  expirateTime,
  supplierLogo,
  supplierName,
  supplierCategory
}) => {
  return (
    <div className='h-[85vh] flex flex-col text-black'>
      <h1 className=' text-3xl py-4 mb-2 font-bold text-black'>Creatina</h1>
      <div className='flex mb-8 justify-around'>
        <div className='flex flex-col gap-1.5 text-sm' >
          <p className='flex font-semibold items-center text-secondary-ez2livegreen'>
            <Image
              className='h-4 pr-2 w-auto'
              alt='coupon-green'
              src={CouponGreen}
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
        <span className='relative w-32 text-xl text-white bg-primary-ez2live flex items-center justify-center p-5 rounded-full'>
          {couponDiscount}%
          <span className='absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r '></span>
        </span>
      </div>
      <hr className="border-slate-200 dark:border-slate-700 mb-6"></hr>
      <div className='flex flex-col mt-5 h-auto'>
        <div className='flex item-center'>
          <Image className='w-20 h-20 rounded-full' src={supplierLogo} alt='supplier-logo' />
          <div className='m-4 px-1'>
            <p className=' font-semibold'>estabelecimento</p>
            <p className=' text-lg'>{supplierName}</p>
          </div>
        </div>
        <div className='flex flex-col gap-5 m-3'>
          <div className='flex flex-col gap-3'>
            <p className='font-semibold'>categoria</p>
            <p>{supplierCategory}</p>
            <p className='font-semibold'>validade</p>
            <p>{expirateTime}</p>
          </div>
        </div>
        <AccordionInfo data={[{ name: "Regras de uso", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, dolorem. Quae debitis hic ipsum inventore assumenda laborum reprehenderit, asperiores nostrum, molestiae odio excepturi maiores possimus ad cum quia et doloremque?" }]}></AccordionInfo>
      </div>
    </div>
  )
}

export default CouponPage;
