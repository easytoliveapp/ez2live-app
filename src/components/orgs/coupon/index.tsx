import React from 'react';
import Image, { StaticImageData } from 'next/image'
import CouponGreen from '@/images/easytolive/icons/coupongreen.svg'
import ClockCircleRed from '@/images/easytolive/icons/clock_circleRed.svg'
import { AccordionInfo } from '@/components/atoms';
import useDateDiffInDays from '@/hooks/useDateDifferenceInDays';
import useDateFormater from '@/hooks/useDateFormater';

interface CouponProps {
  id: string
  unintsAmount: number
  expirateTime: string
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
      <div className='flex mb-8 gap-4 justify-around'>
        <div className='flex flex-col gap-1.5 text-sm' >
          <p className='flex font-semibold items-center text-generic-alertGreen'>
            <Image
              className='h-4 pr-2 w-auto'
              alt='coupon-green'
              src={CouponGreen}
              color='white'
            />
            faltam {unintsAmount} unidades</p>
          <p className='flex font-semibold items-center text-generic-alertRed'>
            <Image
              className='h-3.5 pr-2 w-auto'
              alt='coupon-black'
              src={ClockCircleRed}
            />
            termina em {useDateDiffInDays(expirateTime)} dias
          </p>
        </div>
        <span className='relative text-3xl w-32 text-white bg-primary-main flex items-center justify-center px-6 py-3 rounded-full'>
          {couponDiscount}%
          <span className='absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-r from-secondary-dark to-secondary-lighter'></span>
        </span>
      </div>
      <hr className="border-slate-200 mb-6"></hr>
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
            <p>{useDateFormater(expirateTime)}</p>
          </div>
        </div>
        <AccordionInfo data={[{ name: "Regras de uso", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, dolorem. Quae debitis hic ipsum inventore assumenda laborum reprehenderit, asperiores nostrum, molestiae odio excepturi maiores possimus ad cum quia et doloremque?" }]}></AccordionInfo>
      </div>
    </div>
  )
}

export default CouponPage;
