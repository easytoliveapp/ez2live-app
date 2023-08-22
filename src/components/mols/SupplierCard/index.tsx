"use client"

import React, { FC } from 'react';
import { Avaliation , CouponsAvaible } from '@/components/atoms';
import Image, { StaticImageData } from 'next/image'
import ArrowRight from '@/images/easytolive/icons/arrow-next-right.svg'

interface SupplierCardProps {
  couponsAvaible: number;
  supplierCategory: string
  supplierImage: string | StaticImageData
  name: string
  avaliation?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const SupplierCard: FC<SupplierCardProps> = ({
  couponsAvaible,
  supplierCategory,
  name,
  supplierImage,
  avaliation,
  onClick,

})=> {
  return (
    <div className='w-full h-auto rounded-lg p-3 grid grid-cols-5 gap-2 bg-primary-ez2livebg2'>
      <div className=' col-span-1 flex items-center justify-center w-14 h-auto'>
      <Image className='rounded-full h-auto w-auto' alt="Supplier-logo" src={supplierImage}/>
      </div>
      <div className='col-span-3 max-sm:pl-5 h-auto w-auto grid-rows-3 gap-3'>
        <p className='font-medium text-base'>{name}</p>
        <p className='text-xs pb-1 font-medium text-primary-ez2live'>
          {supplierCategory}
        </p>
        <CouponsAvaible coupons={couponsAvaible}/>
      </div>
      <div className=' col-span-1 relative'>
      <Avaliation note={avaliation} />
      <button className='w-auto h-6 absolute right-0 bottom-2' onClick={onClick}>
        <Image className='w-auto h-6' alt='Next Button' src={ArrowRight}/>
      </button>
      </div>
    </div>
  )
}

export default SupplierCard;
