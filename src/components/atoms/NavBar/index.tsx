"use client"
import React, {FC} from 'react'
import Image from 'next/image';
import LogoExtendida from '@/images/easytolive/logo/logocompleta-semfundoazulroxo.svg'

interface NavBarProps {}

const NavBar: FC<NavBarProps> = ()=> {
  return (
    <div>
      <div className="relative w-full p-4 flex justify-center items-center">
      <Image className='w-auto h-8' src={LogoExtendida} alt='Logo Extentida' />
    </div>
    </div>
  )
}

export default NavBar