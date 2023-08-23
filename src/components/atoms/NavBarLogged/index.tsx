"use client"
import React, {FC} from 'react'
import Image from 'next/image';
import LogoExtendida from '@/images/easytolive/logo/logocompleta-semfundoazulroxo.svg'
import AvatarDropdown from "@/components/atoms/AvatarDropdown";
import MenuBar from '../MenuBar/MenuBar';

interface NavBarLoggedProps {}

const NavBarLogged: FC<NavBarLoggedProps> = ()=> {
  return (
      <div className="relative w-full p-2 flex justify-between items-center">
      <MenuBar></MenuBar>
      <Image className='w-auto h-8' src={LogoExtendida} alt='Logo Extentida' />
      <AvatarDropdown/>
    </div>
  )
}

export default NavBarLogged