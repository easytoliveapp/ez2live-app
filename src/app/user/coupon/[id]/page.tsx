import React from 'react';
import QRCode from "react-qr-code";
import { ButtonPrimary, AccordionInfo } from '@/components';

interface CouponId {
  params:{
    id: string;
  }
}

const UserCoupon = ({params}: CouponId) => {
  const qrCodeValue = params.id

  return(
    <div className='bg-primary-ez2livebg2 h-max p-5 w-full'>
      <div className='bg-white rounded-3xl p-5 h-max flex flex-col items-center'>
        <div>
          <div className='h-auto m-auto mt-8 w-32'>
            <QRCode
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
             value={qrCodeValue}/>
          </div>
          <span className='w-full my-8 flex flex-col items-center gap-2'>
            <h2 className='text-2xl font-semibold'>{qrCodeValue}</h2>
            <p 
            className='text-xs text-gray-400'
            >validate: 12/2023</p>
          </span>
        </div>
        <AccordionInfo/>
        <div className='w-full mt-10 flex flex-col items-center px-5 pb-6'>
        <ButtonPrimary className='w-full'>Ok, entendi!</ButtonPrimary>
        <ButtonPrimary className='mt-3 !text-primary-ez2live !font-semibold border-none bg-white'> ver meus cupons</ButtonPrimary>
        </div>

      </div>
    </div>
  )
};

export default UserCoupon;