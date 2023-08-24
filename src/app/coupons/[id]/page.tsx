"use client"

import React,{useEffect, useState} from 'react';
import Image from 'next/image'
import Foodexample from '@/images/easytolive/coupons/food-example.jpg'
import { ButtonPrimary, AccordionInfo } from '@/components';
import { useRouter } from 'next/navigation';
import CloseIcon from '@/images/easytolive/icons/close.svg'
// import CouponsService from '@/service/coupons.service'
// import { ICoupon } from '@/types/coupons';

interface couponIdProps {
  params: {
    id: string
  }
}


const UserCouponPage= ({params}: couponIdProps)=> {
  // const [coupon , setCoupon] = useState<ICoupon>()
  const router = useRouter()

  function handleClickRedirect() {
    router.back()
  }



  // const getCounpon = async(id:string)=> {
  //   const res:any = CouponsService.getCouponById(id)
  //   console.log(res)
  //   return res
  // }

  // useEffect(()=> {
  //   getCounpon(params.id)
  //   .then((res)=> setCoupon(res?.data?.response))
  // },[])


  return (
    <div className='px-5 min-h-max'>
      <div className='flex justify-around m-auto rounded-3xl h-full flex-col items-center max-w-lg bg-white'>
      <div className='w-full rounded-3xl max-w-lg justify-center flex items-center relative'>
        <Image
        className='relative w-full mb-8 rounded-3xl h-auto'
        alt='background-coupon-image'
        src={Foodexample}/>
        <div 
        className='absolute rounded-full right-0 bottom-0 flex justify-end items-center p-5 bg-secondary-ez2livegreen w-[50%] h-auto text-4xl font-semibold text-white'>
          40%
      </div>
      <div
        className='absolute top-4 right-4'
        onClick={()=> handleClickRedirect()}>
          <Image
          alt='close-icon'
          src={CloseIcon}/>
        </div>
      <span className='absolute m-auto bottom-8 rounded-full w-16 h-16 bg-gradient-to-r from-secondary-ez2livegreen to-secondary-ez2live'></span>
      </div>
      <div className='w-full px-5 py-10'>
      <AccordionInfo/>
      </div>
      <div className='w-full flex flex-col items-center px-5 pb-6'>
      <ButtonPrimary className='w-full'>Eu quero!</ButtonPrimary>
      <ButtonPrimary className='mt-3 !text-secondary-ez2livered !font-semibold border-none bg-white'> não quero mais :/</ButtonPrimary>
      </div>
      
    </div>
    </div>
  )
}

export default UserCouponPage;