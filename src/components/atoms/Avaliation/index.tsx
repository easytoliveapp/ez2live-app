import React, { FC } from 'react';
import Image from 'next/image';
import Star from '@/images/easytolive/icons/Star.svg'
interface AvaliationProps {
  note?: string;
}

const Avaliation : FC<AvaliationProps> = ({
  note
})=> {
  return (
    <div className='flex flex-wrap justify-end gap-1 items-center'>
      <Image className='w-5 h-auto' src={Star} alt='Star'/>
      {note && (
        <span className='font-semibold text-xs'>{note}</span>
      )}
    </div>
  )
}

export default Avaliation;
