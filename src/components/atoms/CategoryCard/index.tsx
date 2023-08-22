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
  onClick?: (e:React.MouseEvent<HTMLDivElement>) => void
}

const Categorys: FC<CategoryProps> = ({
  image,
  name,
  onClick,
})=> {
  return (
    <div
      className="bg-white border-white border-2 hover:border-secondary-ez2live active:shadow-sm rounded-lg p-1 w-24 h-16 flex flex-col gap-1 items-center"
      onClick={onClick}
    >
      <Image
        className="w-8 h-auto"
        src={image} 
        alt="Category Image"
      />
      <p className="text-[10px] font-semibold">{name}</p>
    </div>
  )
}

export default Categorys