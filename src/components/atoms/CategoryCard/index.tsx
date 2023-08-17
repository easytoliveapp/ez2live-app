import React, { FC } from 'react';
import Image, { StaticImageData } from 'next/image';

export interface categorieProps {
  active: boolean;
  title: string;
  id: string;
}

export interface CategoryProps  {
  image: string | StaticImageData
  name: string;
  onClick?: (e:any) => void
}

const Categorys: FC<CategoryProps> = ({
  image,
  name,
  onClick,
})=> {
  return (
    <div
    className='bg-white border-white border-2 hover:border-secondary-ez2live rounded-lg p-1 w-22 h-16 flex flex-col gap-1 items-center '
    onClick={onClick}>
      <Image
      className='w-8 h-auto text-xs'
      src={image} 
      alt='Category Image'/>
      <p className='text-xs font-medium'>{name}</p>
    </div>
  )
}

export default Categorys