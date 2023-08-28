"use client"
import React, { FC } from 'react'
import Image from 'next/image';
import extendedLogoImage from '@/images/easytolive/logo/logocompleta-semfundoazulroxo.svg'
import AvatarDropdown from "@/components/atoms/AvatarDropdown";
import MenuBar from '../MenuBar/MenuBar';
import Link from 'next/link';

interface NavBarLoggedProps { }

const NavBarLogged: FC<NavBarLoggedProps> = () => {
  return (
      <div className="relative w-full p-2 flex justify-between items-center">
      <MenuBar></MenuBar>
      <Link href='/'>
      <Image className='w-auto h-8' src={extendedLogoImage} alt='Logo Extentida' /> 
      </Link>
      <AvatarDropdown/>
    </div>
  );
};

export default NavBarLogged;
