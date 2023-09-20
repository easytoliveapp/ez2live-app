"use client"

import { motion } from 'framer-motion';
import Image from 'next/image'
import React from 'react';
import LogoBranca from '@/images/easytolive/logo/logobranca-fundoprimary.svg';

const LoadingComponent = () => {
  return (
    <div className='w-full min-h-[93vh] bg-primary-main flex flex-col items-center justify-around'>
      <span></span>
      <div className='relative'>
        <motion.div className='relative pb-primary-main w-40 h-40 rounded-full border-4 border-neutral-200 opacity-50 '
        animate={{
          rotate: 360,
        }}
        transition={{ duration: 2, repeat: Infinity }}>
          <span className='absolute -top-5 left-0 h-28 w-24 bg-primary-main rotate-90'></span>
        </motion.div>
        <Image className='w-24 rounded-full h-auto absolute left-8 top-8' src={LogoBranca} alt='logo-branca' />
      </div>
      <span></span>
    </div>
  )
}

export default LoadingComponent;
