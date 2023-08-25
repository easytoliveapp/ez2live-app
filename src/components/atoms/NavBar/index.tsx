"use client"
import React, { FC } from 'react'
import Image from 'next/image';
import extendedLogoImage from '@/images/easytolive/logo/logocompleta-semfundoazulroxo.svg'
import Link from 'next/link';

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
  return (
    <div>
      <div className="relative w-full p-4 flex justify-center items-center">
        <Link href="/login">
          <Image className='w-auto h-8' src={extendedLogoImage} alt='EasyToLive' />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
