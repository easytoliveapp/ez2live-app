"use client"
import { FormItem, Input, ButtonPrimary } from '@/components/atoms';
import React from 'react';

const ProfilePage = ()=> {
  return (
    <div className='relative h-max flex flex-col mx-auto gap-4 w-full max-w-md'>
      <FormItem
        label='nome'>
          <Input defaultValue={'Mario da Silva'} />
        </FormItem>

        <FormItem
        label='email'>
          <Input disabled placeholder='mariodasilva@gmail.com'/>
        </FormItem>

        <ButtonPrimary
        className='mt-6 bg-secondary-ez2live font-bold !text-black !shadow-none'>
          Trocar senha
        </ButtonPrimary>

        <ButtonPrimary
        className='bg-primary-ez2livebg !text-black !font-bold !shadow-none'>
          deconectar
        </ButtonPrimary>
        <ButtonPrimary
        className='mt-[14vh] bg-primary-ez2livebg !text-red-500 !font-bold !shadow-none'>
          excluir conta
        </ButtonPrimary>
    </div>
  )
}

export default ProfilePage;
