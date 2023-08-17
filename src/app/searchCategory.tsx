"use client"
import React, { FC } from 'react';
import { Input } from '@/components/atoms'
import Image from 'next/image'
import Search from '@/images/easytolive/icons/search.svg'

interface SearchCategoryProps  {
  onChange?: (e:any) => void;
  onClick?: (e:any) => void;
  onSubmit?: (e:any) => void;
  value?: string | number | readonly string[]
}

const SearchCategory: FC<SearchCategoryProps> = ({
  value,
  onChange,
  onClick,
  onSubmit
})=> {
  return (
    <div className='relative my-4 flex items-center max-w-md w-full'>
    <Input
    type='search'
    className='relative max-w-md w-full'
    onSubmit={onSubmit}
    onChange={onChange}
    value={value}
    placeholder='buscar por estabelecimento / categoria'/>
      <Image
      onClick={onClick}
      src={Search}
      alt='search-icon'
      className='absolute right-3 h-6 w-auto'>
      </Image>
    </div>
  )
}

export default SearchCategory;