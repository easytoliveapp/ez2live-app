"use-client"

import { ButtonPrimary } from '@/components';
import ButtonThird from '@/components/atoms/Button/ButtonThird';
import couponsService from '@/service/coupons.service';
import { ICoupon } from '@/types/coupons';
import React , {useState , useEffect} from 'react';
import Image, { StaticImageData } from 'next/image'
import ShoppingCartGreen from '@/images/easytolive/icons/shopping_cart_green.svg'
import ClockCircleRed from '@/images/easytolive/icons/clock_circleRed.svg'

interface CouponProps {
  id: string
  unintsAmount: number
  expirateTime: number
  supplierLogo: string | StaticImageData
  supplierName: string
  supplierCategory: string
};

const CouponPage: React.FC<CouponProps> = ({
  id,
  unintsAmount,
  expirateTime,
  supplierLogo,
  supplierName,
  supplierCategory
})=> {
  const [coupon, setCoupon] = useState<ICoupon>()

  const getCoupon = async (id:string) => {
    const res: any = await couponsService.getCouponById(id)
    return res
  }

  useEffect(()=> {
    getCoupon(id)
    .then((res)=> setCoupon(res?.data))
    .catch((error)=> console.log(error))
    console.log(coupon)
  },[])

  return (
      <div className='h-[85vh]'>
        <h1>{coupon?.title}</h1>
        <div className='flex gap- 20'>
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
          <span className=' text-xl text-white bg-primary-ez2live flex items-center justify-center p-5 rounded-full'>
            {coupon?.discount}
          </span>
        </div>
        <hr className="border-slate-200 dark:border-slate-700 mb-6"></hr>
        <div className='flex w-20 h-auto'>
        <Image src={supplierLogo} alt='supplier-logo'/> 
        <div className='m-4 p-2'>
          <p className=' font-semibold'>estabelecimento</p>
          <p className=' text-lg'>{supplierName}</p>
        </div>
        <div className='flex flex-col gap-5 m-3'>
          <div className='flex flex-col gap-3'>
          <p className='font-semibold'>categoria</p>
          <p>{supplierCategory}</p>
          <p className='font-semibold'>validade</p>
          <p>{expirateTime}</p>
          </div>
      
        </div>
        </div>


        <ButtonPrimary>Eu quero!</ButtonPrimary>
        <ButtonThird>não quero mais</ButtonThird>
      </div>
  )
}

export default CouponPage;
