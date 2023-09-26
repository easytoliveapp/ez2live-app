import React from 'react';
import Image from 'next/image'
import CouponYellow from '@/images/easytolive/icons/couponyellow.svg'
import { motion } from "framer-motion"

interface CouponGeneratingProps {
  title: string;
  subTitle?: string;
}

const CouponGenerating: React.FC<CouponGeneratingProps> = ({ title, subTitle }) => {
  return (
    <div className='min-h-[75vh] bg-white flex flex-col justify-around'>
      <span></span>
      <div className='flex flex-col items-center '>
        <div className='relative rounded-full overflow-hidden w-40 h-40'>
          <motion.div
            className='w-40 h-40 rounded-full bg-gradient-to-r from-primary-main to-primary-white'
            animate={{
              rotate: 360,
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
          </motion.div>
          <motion.div
            className='absolute flex items-center -left-24 top-8 opacity-100'
            animate={{
              translateX: 240,
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Image className='w-24 opacity-100 h-auto' alt='coupon-yellow-image' src={CouponYellow}></Image>
          </motion.div>
        </div>
        <h1 className=' text-lg font-bold mt-10 mb-3'>{title}</h1>
        <p className='text-xs text-neutral-400'>{subTitle}</p>
      </div>
      <span>
      </span>
    </div>
  )
}

export default CouponGenerating;
